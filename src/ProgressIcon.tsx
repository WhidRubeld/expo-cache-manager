import type { ColorValue } from 'react-native'
import { CacheEntryStatus } from './CacheEntry.class'
import { DownloadIcon, PauseIcon, PlayIcon } from './icons'

export type ProgressIconProps = {
  status: CacheEntryStatus
  size: number
  color?: ColorValue
  toggleButtons?: boolean
}

export const ProgressIcon = ({
  status,
  size,
  color = '#ffffff',
  toggleButtons = false
}: ProgressIconProps) => {
  switch (status) {
    case CacheEntryStatus.Pending: {
      return <DownloadIcon width={size} height={size} fill={color} />
    }
    case CacheEntryStatus.Progress: {
      if (!toggleButtons) return null
      return <PauseIcon width={size} height={size} fill={color} />
    }
    case CacheEntryStatus.Pause: {
      if (!toggleButtons) return null
      return <PlayIcon width={size} height={size} fill={color} />
    }
    default:
      return null
  }
}
