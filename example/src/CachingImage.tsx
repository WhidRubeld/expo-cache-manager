import { useCallback, useEffect, useRef, useState } from 'react'
import {
  StyleProp,
  View,
  StyleSheet,
  Pressable,
  ImageStyle,
  Image
} from 'react-native'
import { CacheEntryStatus, CacheEntryUpdateEvent } from './CacheEntry.class'
import { CacheManager } from './CacheManager.class'
import { DownloadIcon, PauseIcon } from './icons'
import ProgressIndicator from './ProgressIndicator'

export type CachingImageProps = {
  manager: CacheManager
  uri: string
  style?: StyleProp<ImageStyle>
}
export default function CachingImage({
  manager,
  uri,
  style
}: CachingImageProps) {
  const [status, setStatus] = useState<CacheEntryStatus>(
    CacheEntryStatus.Pending
  )
  const [path, setPath] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)

  const file = useRef(manager.getEntry(uri)).current

  const setState = useCallback((v: CacheEntryUpdateEvent) => {
    setStatus(v.status)
    setPath(v.path ?? null)
    setProgress(v.progress)
  }, [])

  useEffect(() => {
    if (!file) return

    setState(file)
    file.addListener('update', setState)

    return () => {
      file.removeListener('update', setState)
    }
  }, [uri])

  const processingHalder = useCallback(() => {
    console.log(!!status, !!file)
    if (!file || !status) return
    switch (status) {
      case CacheEntryStatus.Pending: {
        file.downloadAsync()
        break
      }
      case CacheEntryStatus.Progress: {
        file.pauseAsync()
        break
      }
      case CacheEntryStatus.Pause: {
        file.resumeAsync()
        break
      }
    }
  }, [file, status])

  useEffect(() => {
    processingHalder()
  }, [])

  return (
    <View style={{ position: 'relative', backgroundColor: '#ccc' }}>
      {path ? (
        <Image source={{ uri: path }} style={style} />
      ) : (
        <View style={style} />
      )}
      <Pressable onPress={processingHalder} style={StyleSheet.absoluteFill}>
        <ProgressIndicator
          progress={progress}
          width={3}
          size={36}
          color='#ffffff'
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 'auto',
            marginBottom: 'auto',
            padding: 15,
            backgroundColor: '#000'
          }}
        >
          {CacheEntryStatus.Progress === status ? (
            <PauseIcon width={16} height={16} fill='#ffffff' />
          ) : (
            <DownloadIcon width={24} height={24} fill='#ffffff' />
          )}
        </ProgressIndicator>
      </Pressable>
    </View>
  )
}
