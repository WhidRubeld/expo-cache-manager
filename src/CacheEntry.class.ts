import {
  createDownloadResumable,
  deleteAsync,
  DownloadResumable,
  moveAsync
} from 'expo-file-system'
import type {
  DownloadOptions,
  DownloadPauseState,
  DownloadProgressData
} from 'expo-file-system/build/FileSystem.types'
import { EventEmitter } from 'eventemitter3'
import { Utils } from './Utils.class'

export type CacheEntryOptions = {
  uri: string
  folder: string
  tmpFolder: string
  entryExpiresIn?: number
  completed?: {
    status: boolean
    expiresIn?: Date
  }
}

export type CacheEntryDownloadOptions = {
  onProgress?: (progress: number) => void // 0-100
} & DownloadOptions

export enum CacheEntryStatus {
  Pending = 'pending',
  Progress = 'progress',
  Pause = 'pause',
  Complete = 'complete'
}

export type CacheEntryUpdateEvent = {
  status: CacheEntryStatus
  path: string | null
  progress: number
  error?: any
}

export class CacheEntry extends EventEmitter<'update'> {
  readonly uri: string

  private _status: CacheEntryStatus
  private _task?: DownloadResumable

  private _expiresIn: Date | undefined
  private _entryExpiresIn: number

  private _path: string
  private _tmpPath: string
  private _progress: number
  private _error?: any

  constructor({
    uri,
    folder,
    tmpFolder,
    completed,
    entryExpiresIn
  }: CacheEntryOptions) {
    super()

    this.uri = uri
    this._path = Utils.uri2path(this.uri, folder)
    this._tmpPath = Utils.uri2path(this.uri, tmpFolder)
    this._progress = 0

    this._status = CacheEntryStatus.Pending
    this._entryExpiresIn =
      entryExpiresIn !== undefined && entryExpiresIn >= 0 ? entryExpiresIn : -1

    if (completed?.status) {
      if (completed.expiresIn && this._entryExpiresIn !== -1) {
        this._expiresIn = completed.expiresIn
      }
      this._status = CacheEntryStatus.Complete
      this._progress = 100
    }

    this.onUpdate()
  }

  private onUpdateProgress(data: DownloadProgressData) {
    this._progress = Utils.progress2value(data)
    this.onUpdate()
  }

  private onCompleteAsync() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await moveAsync({ from: this._tmpPath, to: this._path })
        await this.resetTaskAsync()

        this._status = CacheEntryStatus.Complete
        if (this._entryExpiresIn !== -1) {
          const expiresIn = Utils.getUTCDate()

          expiresIn.setUTCSeconds(
            expiresIn.getUTCSeconds() + this._entryExpiresIn
          )

          this._expiresIn = expiresIn
        }

        this.onUpdate()
        resolve()
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }

  private resetTaskAsync(withTmpFile: boolean = false) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        delete this._task
        delete this._error

        if (withTmpFile && this._tmpPath) {
          await deleteAsync(this._tmpPath, { idempotent: true })
        }

        this.onUpdate()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  private onTaskErrorAsync(e: any) {
    console.warn(e)
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.resetTaskAsync(true)
        this._status = CacheEntryStatus.Pending
        this._error = e
        this._progress = 0

        this.onUpdate()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  public downloadAsync(options?: CacheEntryDownloadOptions) {
    return new Promise<string>(async (resolve, reject) => {
      if (this._task) {
        return reject(new Error('Task is defined'))
      }

      if (this._status !== CacheEntryStatus.Pending) {
        return reject(new Error('Task could not be started'))
      }

      try {
        this._task = createDownloadResumable(
          this.uri,
          this._tmpPath,
          options,
          (data) => {
            if (options?.onProgress) {
              options.onProgress(Utils.progress2value(data))
            }
            this.onUpdateProgress(data)
          }
        )

        this._status = CacheEntryStatus.Progress
        this.onUpdate()

        const res = await this._task.downloadAsync()
        if (!res) {
          throw new Error('File upload not complete')
        }

        const { status } = res
        if (status < 200 || status >= 400) {
          throw new Error('File upload failed')
        }

        await this.onCompleteAsync()
        resolve(this._path)
      } catch (e) {
        this.onTaskErrorAsync(e)
        reject(e)
      }
    })
  }

  public resumeAsync() {
    return new Promise<string>(async (resolve, reject) => {
      if (!this._task) {
        return reject(new Error('Task is defined (resume)'))
      }

      if (this._status !== CacheEntryStatus.Pause) {
        return reject(new Error('Task is not paused'))
      }

      try {
        this._status = CacheEntryStatus.Progress
        this.onUpdate()

        const res = await this._task.resumeAsync()
        if (!res) {
          throw new Error('File upload not complete')
        }

        const { status } = res
        if (status < 200 || status >= 400) {
          throw new Error('File upload failed')
        }

        await this.onCompleteAsync()
        resolve(this._path)
      } catch (e) {
        this.onTaskErrorAsync(e)
        reject(e)
      }
    })
  }

  public pauseAsync() {
    return new Promise<DownloadPauseState>(async (resolve, reject) => {
      if (!this._task) {
        return reject(new Error('Task is not defined (pause)'))
      }
      if (this._status !== CacheEntryStatus.Progress) {
        return reject(new Error('Task is not processing'))
      }

      try {
        const res = await this._task.pauseAsync()

        this._status = CacheEntryStatus.Pause
        this.onUpdate()

        resolve(res)
      } catch (e) {
        reject(e)
      }
    })
  }

  public cancelAsync() {
    return new Promise<void>(async (resolve, reject) => {
      if (!this._task) {
        return reject(new Error('Task is not defined (cancel)'))
      }
      if (
        ![CacheEntryStatus.Progress, CacheEntryStatus.Pause].includes(
          this._status
        )
      ) {
        return reject(new Error('Task could not be canceled'))
      }

      try {
        await this._task.cancelAsync()
        await this.resetTaskAsync(true)

        this._status = CacheEntryStatus.Pending
        this.onUpdate()

        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  public resetAsync() {
    return new Promise<void>(async (resolve, reject) => {
      if (this._status !== CacheEntryStatus.Complete) {
        return reject(new Error('File not loaded'))
      }

      try {
        await deleteAsync(this._path)
        this._progress = 0
        this._status = CacheEntryStatus.Pending
        this._expiresIn = undefined

        this.onUpdate()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  public checkExpireStatus() {
    if (!this._expiresIn || this._entryExpiresIn === -1) return

    const expiresIn = this._expiresIn.getTime()
    const current = Utils.getUTCDate().getTime()

    if (expiresIn - current <= 0) {
      this.resetAsync()
    }
  }

  get path() {
    return this._status === CacheEntryStatus.Complete ? this._path : null
  }

  get status() {
    return this._status
  }

  get progress() {
    return this._progress
  }

  get error() {
    return this._error
  }

  get entryExpiresIn() {
    return this._entryExpiresIn
  }

  get expiresIn() {
    return this._expiresIn
  }

  private onUpdate() {
    this.emit('update', {
      status: this.status,
      path: this.path,
      progress: this.progress,
      error: this.error
    })
  }
}
