import { StyleSheet, Text, View } from 'react-native'
import CachingImage from './src/CachingImage'
import { cacheManager } from './utils'

const IMAGE_URI = 'https://picsum.photos/200/300.jpg?random=test'

export default function Page() {
  return (
    <View>
      <CachingImage uri={IMAGE_URI} manager={cacheManager} />
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
