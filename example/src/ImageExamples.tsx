import { StyleSheet, View } from 'react-native'
import { CachingImage, CachingImageRef } from 'expo-cache-manager'
import { useRef } from 'react'

export default function ImageExamples() {
  const imageRef = useRef<CachingImageRef>()

  return (
    <View style={styles.container}>
      <CachingImage
        ref={imageRef}
        uri='https://fastly.picsum.photos/id/1082/3840/2160.jpg?hmac=hTBlkXuQRidScs600ierfaeLTfpPzGX74sRpXgF5jes'
        placeholder='L4E3C*M{%M9F00xu4n-;00Rj~qRj'
        manager='images'
        transition={2e2}
        contentFit='cover'
        contentPosition='center'
        progressProps={{ color: '#ffffff' }}
        // headers={{
        //   Authorization: `${token_type} ${access_token}`
        // }}
        automatic={false}
        style={styles.image}
      />
      <View style={styles.spacer} />
      <CachingImage
        uri='https://fastly.picsum.photos/id/699/3840/2160.jpg?hmac=Ae7vOqy41F8jTnz636NvCTD7CWDBDwwoNwRbGeyHrns'
        placeholder='LPF5{5M{o3afOunhoeay~Uobxsoe'
        manager='images'
        transition={2e2}
        style={styles.image}
        progressProps={{ color: '#ffffff' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  spacer: { width: 20 },
  image: { flex: 1, height: 150 }
})
