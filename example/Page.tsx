import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CachingImage from './src/CachingImage'

const IMAGE_URI = 'https://picsum.photos/3840/2160.jpg?random=test'

export default function Page() {
  return (
    <View>
      <CachingImage
        uri={IMAGE_URI}
        manager='images'
        style={{
          height: 300,
          backgroundColor: '#ccc',
          marginTop: 50,
          marginHorizontal: 20
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
