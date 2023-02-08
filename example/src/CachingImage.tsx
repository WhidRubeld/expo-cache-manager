import { useCallback, useEffect } from 'react'
import {
  StyleProp,
  View,
  StyleSheet,
  Pressable,
  ImageStyle,
  Image,
  ColorValue
} from 'react-native'
import { CacheEntryStatus } from './CacheEntry.class'
import { useCacheFile } from './hooks'
import { DownloadIcon, PauseIcon } from './icons'
import ProgressIndicator, { ProgressIndicatorProps } from './ProgressIndicator'

export type CachingImageProps = {
  manager: string
  uri: string
  style?: StyleProp<ImageStyle>
  backgroundColor?: ColorValue
  progressProps?: Omit<ProgressIndicatorProps, 'progress'>
}

export const defaultCacheImageProgressProps: Omit<
  ProgressIndicatorProps,
  'progress'
> = {
  width: 3,
  size: 36,
  delay: 0,
  color: '#ffffff',
  style: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 20
  }
}

export default function CachingImage({
  manager,
  uri,
  style,
  backgroundColor = '#cccccc',
  progressProps
}: CachingImageProps) {
  const progressMergedProps = {
    ...defaultCacheImageProgressProps,
    ...progressProps,
    style: StyleSheet.flatten([
      progressProps?.style,
      defaultCacheImageProgressProps.style
    ])
  }

  const { status, path, progress, downloadAsync, pauseAsync, resumeAsync } =
    useCacheFile(uri, manager)

  const processingHalder = useCallback(() => {
    switch (status) {
      case CacheEntryStatus.Pending: {
        downloadAsync()
        break
      }
      case CacheEntryStatus.Progress: {
        pauseAsync()
        break
      }
      case CacheEntryStatus.Pause: {
        resumeAsync()
        break
      }
    }
  }, [status, downloadAsync, pauseAsync, resumeAsync])

  useEffect(() => {
    processingHalder()
  }, [])

  const renderIcon = () => {
    if (status === CacheEntryStatus.Progress) {
      return (
        <PauseIcon width={16} height={16} fill={progressMergedProps.color} />
      )
    }

    if ([CacheEntryStatus.Pause, CacheEntryStatus.Pending].includes(status)) {
      return (
        <DownloadIcon width={24} height={24} fill={progressMergedProps.color} />
      )
    }

    return null
  }

  return (
    <View style={{ position: 'relative', backgroundColor }}>
      {path && progress === 100 ? (
        <Image source={{ uri: path }} style={style} />
      ) : (
        <View style={style} />
      )}
      {progress < 100 && (
        <Pressable onPress={processingHalder} style={StyleSheet.absoluteFill}>
          <ProgressIndicator progress={progress} {...progressMergedProps}>
            {renderIcon()}
          </ProgressIndicator>
        </Pressable>
      )}
    </View>
  )
}
