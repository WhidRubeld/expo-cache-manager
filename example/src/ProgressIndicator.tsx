import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Animated,
  ColorValue,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet
} from 'react-native'
import { Svg, Path } from 'react-native-svg'

export type ProgressIndicatorProps = {
  progress: number
  size: number
  width: number
  color: ColorValue
  style?: StyleProp<ViewStyle>
  delay?: number
  children?: ReactNode
}

export default function ProgressIndicator({
  progress,
  size,
  width,
  color,
  style,
  delay = 5e2,
  children
}: ProgressIndicatorProps) {
  const [animatedValue] = useState(new Animated.Value(0))
  const [value, setValue] = useState(0)
  const [animatedRotate] = useState(new Animated.Value(0))

  const handleAnimation = useCallback(() => {
    Animated.loop(
      Animated.timing(animatedRotate, {
        toValue: 1,
        duration: 2e3,
        easing: (v) => v,
        useNativeDriver: true
      }),
      { iterations: -1 }
    ).start()
  }, [])

  const interpolateRotating = animatedRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const polarToCartesian = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      angleInDegrees: number
    ) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      }
    },
    []
  )

  const path = useMemo(() => {
    const center = size / 2
    const radius = size / 2 - width / 2
    const endAngle = (360 / 100) * Math.min(100, Math.max(0, value)) * 0.9999

    const start = polarToCartesian(center, center, radius, endAngle)
    const end = polarToCartesian(center, center, radius, 0)

    const largeArcFlag = endAngle <= 180 ? '0' : '1'

    const d = [
      'M',
      start.x,
      start.y,
      'A',
      size / 2 - width / 2,
      size / 2 - width / 2,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ]
    return d.join(' ')
  }, [value, size, width])

  useEffect(() => {
    handleAnimation()
    const listener = animatedValue.addListener(({ value: v }) => setValue(v))

    return () => {
      animatedValue.removeListener(listener)
    }
  }, [])

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: delay,
      useNativeDriver: true
    }).start()
  }, [progress, delay])

  return (
    <View style={style}>
      <Animated.View
        style={{
          transform: [
            {
              rotate: interpolateRotating
            }
          ]
        }}
      >
        <Svg width={size} height={size}>
          <Path
            d={path}
            stroke={color}
            strokeWidth={width}
            strokeLinecap='square'
            strokeLinejoin='round'
            fill='transparent'
          />
        </Svg>
      </Animated.View>
      {!!children && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { justifyContent: 'center', alignItems: 'center' }
          ]}
        >
          {children}
        </View>
      )}
    </View>
  )
}
