import {
  UploadTask,
  makeDirectoryAsync,
  readDirectoryAsync,
  createUploadTask,
  FileSystemUploadOptions,
  deleteAsync,
  getInfoAsync
} from 'expo-file-system'
import { UploadProgressData } from 'expo-file-system/build/FileSystem.types'
import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState
} from 'react'

import { BASE_DIR, TMP_DIR } from './constants'
import { cacheFile2uri, uri2cacheFile } from './utils'

export type FileSystemManagerCacheValue = {
  uri: string
  path: string
  upload?: {
    task: UploadTask
    status?: UploadProgressData
  }
}

export type UploadOptions = {
  force?: boolean
} & FileSystemUploadOptions

export const defaultUploadOptions: UploadOptions = {
  force: false
}

export type FileSystemManagerContextValue = {
  cache: FileSystemManagerCacheValue[]
  cacheReady: boolean
  getCacheFile: (
    uri: string,
    opts?: Partial<UploadOptions>
  ) => FileSystemManagerCacheValue | null
  initAsync: () => Promise<void>
  resetAsync: () => Promise<void>
  getCacheSizeAsync: (withTmp: boolean) => Promise<number>
}

export const FileSystemManagerContext =
  createContext<FileSystemManagerContextValue>({
    cache: [],
    cacheReady: false,
    getCacheFile: () => null,
    initAsync: () => Promise.reject(),
    resetAsync: () => Promise.reject(),
    getCacheSizeAsync: () => Promise.reject()
  })

export type FileSystemManagerProviderProps = {
  autoInit?: boolean
  children: ReactNode
}

export const FileSystemManagerProvider = ({
  autoInit = false,
  children
}: FileSystemManagerProviderProps) => {
  const [cacheReady, setCacheReady] = useState(false)
  const [cache, setCache] = useState<FileSystemManagerCacheValue[]>([])

  const initAsync = useCallback(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await makeDirectoryAsync(BASE_DIR)
        await makeDirectoryAsync(TMP_DIR)

        const files = await readDirectoryAsync(BASE_DIR)
        const cacheFiles = files.map((v) => ({
          uri: v,
          path: cacheFile2uri(v)
        }))
        setCache(cacheFiles)
        setCacheReady(true)

        resolve()
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }, [])

  const resetAsync = useCallback(() => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await deleteAsync(BASE_DIR, { idempotent: true })
        await deleteAsync(TMP_DIR, { idempotent: true })

        await makeDirectoryAsync(BASE_DIR)
        await makeDirectoryAsync(TMP_DIR)
        setCache([])

        resolve()
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }, [])

  const getCacheSizeAsync = useCallback((withTmp: boolean = false) => {
    return new Promise<number>(async (resolve, reject) => {
      try {
        let size = 0
        const baseDir = await getInfoAsync(BASE_DIR)
        if (!baseDir.exists) {
          throw new Error(
            'Cache folder not found. Please run initAsync before use this function.'
          )
        }
        size += baseDir.size

        if (withTmp) {
          const tmpDir = await getInfoAsync(TMP_DIR)
          if (tmpDir.exists) size += tmpDir.size
        }

        resolve(size)
      } catch (e) {
        console.warn(e)
        reject(e)
      }
    })
  }, [])

  const onUpdateTaskProgress = useCallback(
    (uri: string, data: UploadProgressData) => {
      setCache((v) => {
        const index = v.findIndex((v) => v.uri === uri)
        if (!index) return v

        let buffer = [...v]
        if (data.totalByteSent === data.totalBytesExpectedToSend) {
          delete buffer[index].upload
          return buffer
        }

        buffer[index].upload = {
          ...buffer[index].upload,
          status: data
        }

        return buffer
      })
    },
    []
  )

  const getCacheFile = useCallback(
    (
      uri: string,
      opts?: Partial<UploadOptions>
    ): FileSystemManagerCacheValue | null => {
      const options: UploadOptions = Object.assign(defaultUploadOptions, opts)

      if (!cacheReady) {
        console.warn('Cache is not ready')
        return null
      }
      const cacheIndex = cache.findIndex((v) => v.uri === uri)
      if (cacheIndex !== -1 && !options.force) return cache[cacheIndex]

      const { path, tmpPath } = uri2cacheFile(uri)
      const task = createUploadTask(uri, tmpPath, options, (data) =>
        onUpdateTaskProgress(uri, data)
      )
      const entity: FileSystemManagerCacheValue = {
        uri,
        path,
        upload: { task }
      }

      setCache((v) => [...v, entity])
      task.uploadAsync()

      return entity
    },
    [cacheReady, cache, onUpdateTaskProgress]
  )

  useLayoutEffect(() => {
    if (autoInit) initAsync()
  }, [autoInit])

  return (
    <FileSystemManagerContext.Provider
      value={{
        cache,
        cacheReady,
        getCacheFile,
        initAsync,
        resetAsync,
        getCacheSizeAsync
      }}
    >
      {children}
    </FileSystemManagerContext.Provider>
  )
}
