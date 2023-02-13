import {
  makeDirectoryAsync,
  readDirectoryAsync,
  deleteAsync,
  getInfoAsync,
  cacheDirectory
} from 'expo-file-system'
import { EventEmitter } from 'eventemitter3'
import { CacheEntry } from './CacheEntry.class'

import { Utils } from './Utils.class'

export type CacheManagerOptions = {
  folder: string
  // TODO - document
  entryExpiresIn?: number // in seconds
}

export const defaultCacheManagerOptions: CacheManagerOptions = {
  folder: 'manager-cache'
}

export class CacheManager extends EventEmitter<'ready' | 'reset'> {
  private _ready: boolean
  private _entries: { [uri: string]: CacheEntry }
  private _entryExpiresIn: number
  readonly folder: string
  private _folder: string
  private _tmpFolder: string

  constructor(opts?: Partial<CacheManagerOptions>) {
    super()
    const options = Object.assign(defaultCacheManagerOptions, opts)

    this._ready = false
    this._entries = {}

    this.folder = options.folder
    this._folder = `${cacheDirectory}${options.folder}/`
    this._tmpFolder = `${cacheDirectory}${options.folder}-tmp/`

    this._entryExpiresIn =
      options.entryExpiresIn !== undefined && options.entryExpiresIn >= 0
        ? options.entryExpiresIn
        : -1
  }

  public initAsync() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this._ready = false

        await makeDirectoryAsync(this._folder, { intermediates: true })
        await deleteAsync(this._tmpFolder, { idempotent: true })
        await makeDirectoryAsync(this._tmpFolder, { intermediates: true })
        this._entries = {}

        const files = await readDirectoryAsync(this._folder)

        // TODO - document
        for (let file of files) {
          const localFileUri = `${this._folder}${file}`

          const expiresIn = new Date(0)
          if (this._entryExpiresIn > -1) {
            const { modificationTime = new Date().getTime() / 1e3, size } =
              await getInfoAsync(localFileUri)

            expiresIn.setUTCSeconds(modificationTime + this._entryExpiresIn)

            const expired =
              !this._entryExpiresIn ||
              expiresIn.getTime() / 1e3 - modificationTime <= 0

            if (!size || expired) {
              await deleteAsync(localFileUri)
              break
            }
          }

          const uri = Utils.path2uri(file)
          this._entries[uri] = new CacheEntry({
            uri,
            folder: this._folder,
            tmpFolder: this._tmpFolder,
            entryExpiresIn: this._entryExpiresIn,
            completed: {
              status: true,
              expiresIn: this._entryExpiresIn > -1 ? expiresIn : undefined
            }
          })
        }

        this._ready = true

        this.emit('ready')
        resolve()
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }

  public resetAsync() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this._ready = false

        await deleteAsync(this._folder, { idempotent: true })
        await deleteAsync(this._tmpFolder, { idempotent: true })

        await makeDirectoryAsync(this._folder)
        await makeDirectoryAsync(this._tmpFolder)

        this._entries = {}
        this._ready = true

        this.emit('reset')
        resolve()
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }

  public getEntry(uri: string) {
    if (!this._ready) {
      console.warn('Cache is not ready')
      return null
    }

    if (!Object.keys(this._entries).includes(uri)) {
      this._entries[uri] = new CacheEntry({
        uri,
        folder: this._folder,
        tmpFolder: this._tmpFolder,
        entryExpiresIn: this._entryExpiresIn
      })
    } else {
      // TODO - document
      this._entries[uri]?.checkExpireStatus()
    }

    return this._entries[uri] ?? null
  }

  public getCacheSizeAsync(withTmp: boolean = false) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        let size = 0

        const baseDir = await getInfoAsync(this._folder)
        if (!baseDir.exists) {
          throw new Error(
            'Cache folder not found. Please run initAsync before use this function.'
          )
        }
        size += baseDir.size

        if (withTmp) {
          const tmpDir = await getInfoAsync(this._tmpFolder)
          if (tmpDir.exists) size += tmpDir.size
        }

        resolve(size)
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }

  get ready() {
    return this._ready
  }

  get entries() {
    return this._entries
  }

  get entryExpiresIn() {
    return this._entryExpiresIn
  }
}
