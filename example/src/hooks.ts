import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  CacheEntryDownloadOptions,
  CacheEntryStatus,
  CacheEntryUpdateEvent
} from './CacheEntry.class'
import { CacheManagerContext } from './provider'

export const useCache = () => {
  return useContext(CacheManagerContext)
}

export const useCacheManager = (manager: string) => {
  const cache = useCache()
  return cache.managers.find((v) => v.folder === manager) || null
}

export const useCacheFile = (uri: string | null, manager: string) => {
  const m = useCacheManager(manager)

  const file = useMemo(() => {
    if (!m || !uri) return null
    return m.getEntry(uri)
  }, [m, uri])

  const [status, setStatus] = useState<CacheEntryStatus>(
    CacheEntryStatus.Pending
  )
  const [path, setPath] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [error, setError] = useState<any>()

  const handleUpdate = useCallback((v: CacheEntryUpdateEvent) => {
    setStatus(v.status)
    setPath(v.path)
    setProgress(v.progress)
    setError(v.error)
  }, [])

  useEffect(() => {
    if (!file) return
    file.addListener('update', handleUpdate)

    return () => {
      file.removeListener('update', handleUpdate)
    }
  }, [file])

  return {
    status,
    path,
    progress,
    error,
    downloadAsync: (props?: CacheEntryDownloadOptions) => {
      if (file) return file.downloadAsync(props)
      return Promise.reject()
    },
    pauseAsync: () => {
      if (file) return file.pauseAsync()
      return Promise.reject()
    },
    resumeAsync: () => {
      if (file) return file.resumeAsync()
      return Promise.reject()
    },
    cancelAsync: () => {
      if (file) return file.cancelAsync()
      return Promise.reject()
    },
    resetAsync: () => {
      if (file) return file.resetAsync()
      return Promise.reject()
    }
  }
}
