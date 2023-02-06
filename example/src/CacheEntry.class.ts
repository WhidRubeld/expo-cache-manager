import { createUploadTask, moveAsync, UploadTask } from 'expo-file-system'
import {
  FileSystemUploadOptions,
  UploadProgressData
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
  private _task?: UploadTask
  private _path: string | null
  private _progress?: UploadProgressData
  private _error?: any

  constructor({ uri, folder, tmpFolder, completed }: CacheEntryOptions) {
    this.uri = uri

    this._folder = folder
    this._tmpFolder = tmpFolder

    this._path = null

    if (completed) this._path = Utils.uri2path(uri, this._folder)
  }

  private onUpdateTaskProgress(data: UploadProgressData) {
    this._progress = data
  }

  private onCompleteTaskAsync(tmpPath: string) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const path = Utils.uri2path(this.uri, this._folder)
        await moveAsync({ from: tmpPath, to: path })

        this._path = path
        this._task = undefined
        this._progress = undefined
        this._error = undefined

        resolve(path)
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }

  private onTaskError(e: any) {
    console.warn(e)

    this._task = undefined
    this._progress = undefined
    this._error = e

    Utils.uri2path(this.uri, this._folder)
  }

  public downloadAsync(options: CacheEntryDownloadOptions) {
    return new Promise<string>((resolve, reject) => {
      if (this._task) return

      const tmpPath = Utils.uri2tmpPath(this.uri, this._tmpFolder)
      console.log('tmp path', tmpPath)
      this._error = undefined

      this._task = createUploadTask(this.uri, tmpPath, options, (data) => {
        console.log('progress', data)
        if (options.onProgress) {
          options.onProgress(
            Math.ceil(
              (data.totalByteSent / data.totalBytesExpectedToSend) * 100
            )
          )
        }
        this.onUpdateTaskProgress(data)
      })

      this._task
        .uploadAsync()
        .then(() => this.onCompleteTaskAsync(tmpPath))
        .then((v) => resolve(v))
        .catch((e) => {
          console.log('teeest', e)
          this.onTaskError(e)
          reject()
        })
    })
  }

  get path() {
    return this._path
  }

  get task() {
    return this._task
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
