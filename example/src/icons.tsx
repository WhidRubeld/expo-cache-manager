import { Svg, Path, SvgProps } from 'react-native-svg'

export const DownloadIcon = (props: SvgProps) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path d='M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7z' />
    </Svg>
  )
}

export const PauseIcon = (props: SvgProps) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <Path d='M14 19h4V5h-4M6 19h4V5H6v14z' />
    </Svg>
  )
}
