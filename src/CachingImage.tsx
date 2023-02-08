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
import { CacheEntry, CacheEntryStatus } from './CacheEntry.class'
import { useCacheFile } from './hooks'
import { DownloadIcon, PauseIcon, PlayIcon } from './icons'
import ProgressIndicator, { ProgressIndicatorProps } from './ProgressIndicator'

export type CachingImageProps = {
  manager: string
  uri: string
  style?: StyleProp<ImageStyle>
  backgroundColor?: ColorValue
  progressDelay?: number
  progressProps?: Omit<ProgressIndicatorProps, 'progress'>
}

export const defaultCacheImageProgressProps: Omit<
  ProgressIndicatorProps,
  'progress'
> = {
  width: 3,
  size: 40,
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
  progressDelay = 2e2,
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

  const {
    ready,
    status,
    path,
    progress,
    downloadAsync,
    pauseAsync,
    resumeAsync
  } = useCacheFile(uri, manager, { delay: progressDelay })

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
    if (ready) processingHalder()
  }, [ready])

  const renderIcon = () => {
    const iconSize = progressMergedProps.size * 0.5
    if (status === CacheEntryStatus.Progress) {
      return (
        <PauseIcon
          width={iconSize}
          height={iconSize}
          fill={progressMergedProps.color}
        />
      )
    }

    if (status === CacheEntryStatus.Pause) {
      return (
        <PlayIcon
          width={iconSize}
          height={iconSize}
          fill={progressMergedProps.color}
        />
      )
    }

    if (status === CacheEntryStatus.Pending) {
      return (
        <DownloadIcon
          width={iconSize}
          height={iconSize}
          fill={progressMergedProps.color}
        />
      )
    }

    return null
  }

  return (
    <View style={[style, { backgroundColor }]}>
      {path && progress === 100 ? (
        <Image
          source={{ uri: path }}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <View style={{ width: '100%', height: '100%' }} />
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
