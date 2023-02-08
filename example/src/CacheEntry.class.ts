import {
  createDownloadResumable,
  deleteAsync,
  DownloadResumable,
  moveAsync
} from 'expo-file-system'
import {
  DownloadPauseState,
  DownloadProgressData,
  FileSystemUploadOptions
} from 'expo-file-system/build/FileSystem.types'
import { EventEmitter } from 'events'
import { Utils } from './Utils.class'

export type CacheEntryOptions = {
  uri: string
  folder: string
  tmpFolder: string
  completed?: boolean
}

export type CacheEntryDownloadOptions = {
  onProgress?: (progress: number) => void // 0-100
} & FileSystemUploadOptions

export enum CacheEntryStatus {
  Pending = 'pending',
  Progress = 'progress',
  Pause = 'pause',
  Complete = 'complete'
}

export type CacheEntryUpdateEvent = {
  status: CacheEntryStatus
  path: string | null
  progress?: DownloadProgressData
  error?: any
}

export class CacheEntry extends EventEmitter {
  readonly uri: string

  private _status: CacheEntryStatus
  private _task?: DownloadResumable
  private _path: string
  private _tmpPath: string
  private _progress?: DownloadProgressData
  private _error?: any

  constructor({ uri, folder, tmpFolder, completed }: CacheEntryOptions) {
    super()

    this.uri = uri
    this._status = CacheEntryStatus.Pending

    this._path = Utils.uri2path(this.uri, folder)
    this._tmpPath = Utils.uri2path(this.uri, tmpFolder)

    if (completed) this._status = CacheEntryStatus.Complete

    this.onUpdate()
  }

  private onUpdateProgress(data: DownloadProgressData) {
    this._progress = data

    this.onUpdate()
  }

  private onCompleteAsync() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await moveAsync({ from: this._tmpPath, to: this._path })
        await this.resetTaskAsync()
        this._status = CacheEntryStatus.Complete
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
        delete this._progress
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

        this.onUpdate()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  public downloadAsync(options?: CacheEntryDownloadOptions) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        if (this._task) throw new Error('Task is defined')

        this._task = createDownloadResumable(
          this.uri,
          this._tmpPath,
          options,
          (data) => {
            if (options?.onProgress) {
              options.onProgress(
                Math.ceil(
                  (data.totalBytesWritten / data.totalBytesExpectedToWrite) *
                    100
                )
              )
            }
            this.onUpdateProgress(data)
          }
        )

        this._status = CacheEntryStatus.Progress
        this.onUpdate()

        const res = await this._task.downloadAsync()
        if (res) {
          const { status } = res
          if (status < 200 || status >= 400) {
            throw new Error('File upload failed')
          }
        }
        await this.onCompleteAsync()

        resolve(this._path)
      } catch (e) {
        await this.onTaskErrorAsync(e)
        reject(e)
      }
    })
  }

  public resumeAsync() {
    return new Promise<string>((resolve, reject) => {
      if (!this._task) return reject(new Error('Task not found'))

      this._status = CacheEntryStatus.Progress
      this.onUpdate()
      this._task
        .resumeAsync()
        .then(this.onCompleteAsync)
        .then(() => resolve(this._path))
        .catch((e) => {
          this.onTaskErrorAsync(e).finally(() => reject(e))
        })
    })
  }

  public pauseAsync() {
    return new Promise<DownloadPauseState>((resolve, reject) => {
      if (!this._task) return reject(new Error('Task not found'))

      this._task
        .pauseAsync()
        .then((v) => {
          this._status = CacheEntryStatus.Pause
          this.onUpdate()
          resolve(v)
        })
        .catch(reject)
    })
  }

  public cancelAsync() {
    return new Promise<void>((resolve, reject) => {
      if (!this._task) return reject(new Error('Task not found'))

      this._task
        .cancelAsync()
        .then(() => this.resetTaskAsync())
        .then(() => {
          this._status = CacheEntryStatus.Pending
          this.onUpdate()
          resolve()
        })
        .catch(reject)
    })
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

  private onUpdate() {
    this.emit('update', {
      status: this.status,
      path: this.path,
      progress: this.progress,
      error: this.error
    })
  }
}
