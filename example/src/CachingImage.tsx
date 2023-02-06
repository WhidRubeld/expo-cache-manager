import { useEffect, useMemo, useState } from 'react'
import { CacheManager } from './CacheManager.class'

export default function CachingImage({
  manager,
  uri
}: {
  manager: CacheManager
  uri: string
}) {
  const [path, setPath] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const entry = manager.getEntry(uri)
    if (!entry) return

    if (entry.path) {
      setPath(entry.path)
      setProgress(100)
      return
    }

    entry
      .downloadAsync({
        onProgress: setProgress
      })
      .then(setPath)

    // console.log('Entry: ', entry)
  }, [uri])

  return null
}
