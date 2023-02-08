import { useCallback, useContext, useEffect, useState } from 'react'
import { Animated } from 'react-native'
import {
  CacheEntry,
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
  { delay }: { delay: number } = { delay: 2e2 }
) => {
  const m = useCacheManager(manager)
  const [file, setFile] = useState<CacheEntry | null>(null)

  const [status, setStatus] = useState<CacheEntryStatus>(
    CacheEntryStatus.Pending
  )
  const [path, setPath] = useState<string | null>(null)
  const [error, setError] = useState<any>()

  const [progress, setProgress] = useState<number>(0)
  const [animatedProgress, setAnimatedProgress] = useState(
    new Animated.Value(0)
  )
  const [progressValue, setProgressValue] = useState<number>(0)

  const initHandler = useCallback(() => {
    if (!m || !uri) return
    const entry = m.getEntry(uri)
    // console.log('TEST', entry)
    setFile(entry)
    setStatus(CacheEntryStatus.Pending)
    setPath(null)
    setProgress(0)
    setAnimatedProgress(new Animated.Value(0))
    setProgressValue(0)
  }, [m, uri])

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
      console.log(file.listenerCount('update'))
    }
  }, [file])

  useEffect(() => {
    if (!m) return
    m.addListener('reset', initHandler)

    return () => {
      m.removeListener('reset', initHandler)
    }
  }, [m])

  useEffect(() => {
    initHandler()
  }, [uri])

  useEffect(() => {
    const listener = animatedProgress.addListener(({ value: v }) =>
      setProgressValue(v)
    )

    return () => {
      animatedProgress.removeListener(listener)
    }
  }, [animatedProgress])

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: delay,
      useNativeDriver: true
    }).start()
  }, [progress, delay])

  return {
    ready: !!file,
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
