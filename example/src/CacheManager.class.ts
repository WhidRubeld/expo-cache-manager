import {
  makeDirectoryAsync,
  readDirectoryAsync,
  deleteAsync,
  getInfoAsync,
  cacheDirectory
} from 'expo-file-system'
import { EventEmitter } from 'events'
import { CacheEntry } from './CacheEntry.class'

import { Utils } from './Utils.class'

export type CacheManagerOptions = {
  folder: string
}

export const defaultCacheManagerOptions: CacheManagerOptions = {
  folder: 'manager-cache'
}

export class CacheManager extends EventEmitter {
  private _ready: boolean
  private _entries: { [uri: string]: CacheEntry }
  private _folder: string
  private _tmpFolder: string

  constructor(opts?: Partial<CacheManagerOptions>) {
    super()
    const options = Object.assign(defaultCacheManagerOptions, opts)

    this._ready = false
    this._entries = {}
    this._folder = `${cacheDirectory}${options.folder}/`
    this._tmpFolder = `${cacheDirectory}${options.folder}-tmp/`
  }

  public initAsync() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this._ready = false

        await deleteAsync(this._folder, { idempotent: true }) // TODO - delete
        await makeDirectoryAsync(this._folder, { intermediates: true })
        await deleteAsync(this._tmpFolder, { idempotent: true })
        await makeDirectoryAsync(this._tmpFolder, { intermediates: true })
        this._entries = {}

        const files = await readDirectoryAsync(this._folder)

        files.forEach((v) => {
          const uri = Utils.path2uri(v)
          this._entries[uri] = new CacheEntry({
            uri,
            folder: this._folder,
            tmpFolder: this._tmpFolder
          })
        })

        this._ready = true

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

    const status = Object.keys(this._entries).includes(uri)
    if (!status) {
      this._entries[uri] = new CacheEntry({
        uri,
        folder: this._folder,
        tmpFolder: this._tmpFolder
      })
    }

    return this._entries[uri]
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

  get folder() {
    return this._folder
  }
}
