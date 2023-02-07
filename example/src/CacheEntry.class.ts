import {
  createDownloadResumable,
  DownloadResumable,
  moveAsync
} from 'expo-file-system'
import {
  DownloadPauseState,
  DownloadProgressData,
  FileSystemUploadOptions
} from 'expo-file-system/build/FileSystem.types'
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

export class CacheEntry {
  readonly uri: string

  private _folder: string
  private _tmpFolder: string
  private _task?: DownloadResumable
  private _path: string | null
  private _tmpPath?: string
  private _progress?: DownloadProgressData
  private _error?: any

  constructor({ uri, folder, tmpFolder, completed }: CacheEntryOptions) {
    this.uri = uri

    this._folder = folder
    this._tmpFolder = tmpFolder

    this._path = null

    if (completed) this._path = Utils.uri2path(uri, this._folder)
  }

  private onUpdateProgress(data: DownloadProgressData) {
    this._progress = data
  }

  private onCompleteAsync() {
    return new Promise<string>(async (resolve, reject) => {
      if (!this._tmpPath) return reject(new Error('Tmp path not found'))
      try {
        const path = Utils.uri2path(this.uri, this._folder)
        await moveAsync({ from: this._tmpPath, to: path })

        this._path = path
        this.resetTask()
        resolve(path)
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }

  private resetTask() {
    delete this._tmpPath
    delete this._task
    delete this._progress
    delete this._error
  }

  private onTaskError(e: any) {
    console.warn(e)

    this.resetTask()
    this._error = e

    Utils.uri2path(this.uri, this._folder)
  }

  public downloadAsync(options: CacheEntryDownloadOptions) {
    return new Promise<string>((resolve, reject) => {
      if (this._task) return reject(new Error('Task not found'))

      this._tmpPath = Utils.uri2tmpPath(this.uri, this._tmpFolder)
      this._task = createDownloadResumable(
        this.uri,
        this._tmpPath,
        options,
        (data) => {
          if (options.onProgress) {
            options.onProgress(
              Math.ceil(
                (data.totalBytesWritten / data.totalBytesExpectedToWrite) * 100
              )
            )
          }
          this.onUpdateProgress(data)
        }
      )

      this._task
        .downloadAsync()
        .then(this.onCompleteAsync)
        .then((v) => resolve(v))
        .catch((e) => {
          this.onTaskError(e)
          reject(e)
        })
    })
  }

  public resumeAsync() {
    return new Promise<string>((resolve, reject) => {
      if (!this._task) return reject(new Error('Task not found'))

      this._task
        .resumeAsync()
        .then(this.onCompleteAsync)
        .then((v) => resolve(v))
        .catch((e) => {
          this.onTaskError(e)
          reject(e)
        })
    })
  }

  public pauseAsync() {
    return new Promise<DownloadPauseState>((resolve, reject) => {
      if (!this._task) return reject(new Error('Task not found'))

      this._task.pauseAsync().then(resolve).catch(reject)
    })
  }

  public cancelAsync() {
    return new Promise<void>((resolve, reject) => {
      if (!this._task) return reject(new Error('Task not found'))

      this._task
        .cancelAsync()
        .then(() => {
          this.resetTask()
          resolve()
        })
        .catch(reject)
    })
  }

  get path() {
    return this._path
  }

  get folder() {
    return this._folder
  }

  get progress() {
    return this._progress
  }

  get error() {
    return this._error
  }
}
