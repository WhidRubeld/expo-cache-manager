import {
  Image,
  ImageContentFit,
  ImageContentPosition,
  ImageSource,
  ImageTransition
} from 'expo-image'
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  ImageStyle,
  ColorValue,
  ImageResizeMode
} from 'react-native'
import { CacheEntryDownloadOptions, CacheEntryStatus } from './CacheEntry.class'
import { useCacheFile } from './hooks'
import { DownloadIcon, PauseIcon, PlayIcon } from './icons'
import { ProgressIndicator, ProgressIndicatorProps } from './ProgressIndicator'

export enum CachingImageButtons {
  Download = 'download',
  Pause = 'pause',
  Resume = 'resume'
}

export type CachingImageProps = {
  // library props
  manager: string
  uri: string
  delay?: number // delay for progress feedback
  automatic?: boolean
  disabledActions?: CachingImageButtons[]
  indicator?: boolean
  progressProps?: Partial<
    Omit<ProgressIndicatorProps, 'progress' | 'children' | 'delay'>
  >
  downloadProps?: CacheEntryDownloadOptions
  // expo-image props
  style?: ImageStyle
  resizeMode?: ImageResizeMode
  contentFit?: ImageContentFit
  placehoder?: ImageSource | string | number | ImageSource[] | string[] | null
  placeholderContentFit?: ImageContentFit
  contentPosition?: ImageContentPosition
  transition?: ImageTransition | number | null
  blurRadius?: number
  tintColor?: string | null
  accessible?: boolean
  accessibilityLabel?: string
  focusable?: boolean
  enableLiveTextInteraction?: boolean
}

export const ProgressIcon = ({
  status,
  size,
  color = '#ffffff',
  disabledActions = []
}: {
  status: CacheEntryStatus
  size: number
  color?: ColorValue
  disabledActions?: CachingImageButtons[]
}) => {
  switch (status) {
    case CacheEntryStatus.Pending: {
      if (disabledActions.includes(CachingImageButtons.Download)) {
        return null
      }
      return <DownloadIcon width={size} height={size} fill={color} />
    }
    case CacheEntryStatus.Progress: {
      if (disabledActions.includes(CachingImageButtons.Pause)) {
        return null
      }
      return <PauseIcon width={size} height={size} fill={color} />
    }
    case CacheEntryStatus.Pause: {
      if (disabledActions.includes(CachingImageButtons.Resume)) {
        return null
      }
      return <PlayIcon width={size} height={size} fill={color} />
    }
    default:
      return null
  }
}

export const defaultCacheImageProgressProps: Omit<
  ProgressIndicatorProps,
  'progress' | 'children'
> = {
  width: 3,
  size: 40,
  delay: 0,
  color: '#000000',
  style: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'
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
      delay = 2e2,
      automatic = true,
      disabledActions = [],
      indicator = true,
      progressProps,
      downloadProps,
      ...props
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

    const entry = useCacheFile(uri, manager, { delay })
    useImperativeHandle(ref, () => entry, [entry])

    const {
      ready,
      status,
      path,
      progress,
      downloadAsync,
      pauseAsync,
      resumeAsync
    } = entry

    const processingHandler = useCallback(() => {
      switch (status) {
        case CacheEntryStatus.Pending: {
          if (!disabledActions.includes(CachingImageButtons.Download))
            downloadAsync(downloadProps)
          break
        }
        case CacheEntryStatus.Progress: {
          if (!disabledActions.includes(CachingImageButtons.Pause)) pauseAsync()
          break
        }
        case CacheEntryStatus.Pause: {
          if (!disabledActions.includes(CachingImageButtons.Resume))
            resumeAsync()
          break
        }
      }
    }, [
      status,
      downloadAsync,
      pauseAsync,
      resumeAsync,
      disabledActions,
      downloadProps
    ])

    useEffect(() => {
      if (ready && automatic && status === CacheEntryStatus.Pending) {
        processingHandler()
      }
    }, [ready, automatic, status])

    if (path && progress === 100) {
      return (
        <Image
          source={{ uri: path }}
          style={style}
          cachePolicy='none'
          priority='high'
          {...props}
        />
      )
    }

    return (
      <View style={style}>
        <Image
          source={null}
          style={StyleSheet.absoluteFillObject}
          cachePolicy='none'
          priority='low'
          {...props}
        />
        {progress < 100 && (
          <Pressable
            onPress={processingHandler}
            style={StyleSheet.absoluteFillObject}
          >
            {indicator ? (
              <ProgressIndicator progress={progress} {...progressMergedProps}>
                <ProgressIcon
                  status={status}
                  disabledActions={disabledActions}
                  color={progressMergedProps.color}
                  size={progressMergedProps.size * 0.5}
                />
              </ProgressIndicator>
            ) : (
              <ProgressIcon
                status={status}
                disabledActions={disabledActions}
                color={progressMergedProps.color}
                size={progressMergedProps.size * 0.5}
              />
            )}
          </Pressable>
        )}
      </View>
    )
  }
)
