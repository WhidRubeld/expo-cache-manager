import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Animated } from 'react-native'
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

export const useCacheFile = (
  uri: string | null,
  manager: string,
  { delay }: { delay: number } = { delay: 5e2 }
) => {
  const m = useCacheManager(manager)

  const file = useMemo(() => {
    if (!m || !uri) return null
    return m.getEntry(uri)
  }, [m, uri])

  const [status, setStatus] = useState<CacheEntryStatus>(
    CacheEntryStatus.Pending
  )
  const [path, setPath] = useState<string | null>(null)
  const [error, setError] = useState<any>()

  const [progress, setProgress] = useState<number>(0)
  const [animatedProgress] = useState(new Animated.Value(0))
  const [progressValue, setProgressValue] = useState<number>(0)

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

  useEffect(() => {
    const listener = animatedProgress.addListener(({ value: v }) =>
      setProgressValue(v)
    )

    return () => {
      animatedProgress.removeListener(listener)
    }
  }, [])

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: delay,
      useNativeDriver: true
    }).start()
  }, [progress, delay])

  return {
    status,
    path,
    progress: progressValue,
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
