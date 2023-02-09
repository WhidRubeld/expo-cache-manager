import { StyleSheet, View } from 'react-native'
import { CachingImage, CachingImageRef } from 'expo-cache-manager'
import { useRef } from 'react'

const IMAGE_1_URI = 'https://picsum.photos/3840/2160.jpg?random=first'
const IMAGE_2_URI = 'https://picsum.photos/3840/2160.jpg?random=second'

export default function ImageExamples() {
  const imageRef = useRef<CachingImageRef>()

  return (
    <View style={styles.container}>
      <CachingImage
        ref={imageRef}
        uri={IMAGE_1_URI}
        manager='images'
        style={styles.image}
      />
      <View style={styles.spacer} />
      <CachingImage uri={IMAGE_2_URI} manager='images' style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  spacer: { width: 20 },
  image: { flex: 1, height: 150 }
})
