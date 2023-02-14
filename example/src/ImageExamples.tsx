import { StyleSheet, View } from 'react-native'
import { CachingImage, CachingImageRef } from 'expo-cache-manager'
import { useRef } from 'react'

export default function ImageExamples() {
  const imageRef = useRef<CachingImageRef>()

  return (
    <View style={styles.container}>
      <CachingImage
        ref={imageRef}
        uri='https://picsum.photos/3840/2160.jpg?random=first'
        manager='images'
        // headers={{
        //   Authorization: `${token_type} ${access_token}`
        // }}
        toggleButtons
        autoLoad={false}
        style={styles.image}
      />
      <View style={styles.spacer} />
      <CachingImage
        uri='https://picsum.photos/3840/2160.jpg?random=second'
        manager='images'
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  spacer: { width: 20 },
  image: { flex: 1, height: 150 }
})
