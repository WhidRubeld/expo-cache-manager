import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
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
import { ProgressIcon } from './ProgressIcon'
import ProgressIndicator, { ProgressIndicatorProps } from './ProgressIndicator'

export type CachingImageProps = {
  manager: string
  uri: string
  style?: StyleProp<ImageStyle>
  backgroundColor?: ColorValue
  progressDelay?: number
  autoLoad?: boolean
  toggleButtons?: boolean
  progressProps?: Omit<
    ProgressIndicatorProps,
    'progress' | 'children' | 'delay'
  >
}

export const defaultCacheImageProgressProps: Omit<
  ProgressIndicatorProps,
  'progress' | 'children'
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

export type CachingImageRef = ReturnType<typeof useCacheFile>
export const CachingImage = forwardRef<
  CachingImageRef | undefined,
  CachingImageProps
>(
  (
    {
      manager,
      uri,
      style,
      backgroundColor = '#cccccc',
      progressDelay = 2e2,
      autoLoad = true,
      toggleButtons = false,
      progressProps
    },
    ref
  ) => {
    const progressMergedProps = {
      ...defaultCacheImageProgressProps,
      ...progressProps,
      style: StyleSheet.flatten([
        progressProps?.style,
        defaultCacheImageProgressProps.style
      ])
    }

    const file = useCacheFile(uri, manager, { delay: progressDelay })
    useImperativeHandle(ref, () => file, [file])

    const {
      ready,
      status,
      path,
      progress,
      downloadAsync,
      pauseAsync,
      resumeAsync
    } = file

    const processingHalder = useCallback(() => {
      switch (status) {
        case CacheEntryStatus.Pending: {
          downloadAsync()
          break
        }
        case CacheEntryStatus.Progress: {
          if (toggleButtons) pauseAsync()
          break
        }
        case CacheEntryStatus.Pause: {
          if (toggleButtons) resumeAsync()
          break
        }
      }
    }, [status, downloadAsync, pauseAsync, resumeAsync, toggleButtons])

    useEffect(() => {
      if (ready && autoLoad && status === CacheEntryStatus.Pending) {
        processingHalder()
      }
    }, [ready, autoLoad, status])

    return (
      <View style={[styles.inner, style, { backgroundColor }]}>
        {path && progress === 100 ? (
          <Image source={{ uri: path }} style={styles.container} />
        ) : (
          <View style={styles.container} />
        )}
        {progress < 100 && (
          <Pressable onPress={processingHalder} style={StyleSheet.absoluteFill}>
            <ProgressIndicator progress={progress} {...progressMergedProps}>
              <ProgressIcon
                status={status}
                toggleButtons={toggleButtons}
                color={progressMergedProps.color}
                size={progressMergedProps.size * 0.5}
              />
            </ProgressIndicator>
          </Pressable>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  inner: { overflow: 'hidden' },
  container: { width: '100%', height: '100%' }
})
