import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CachingImage from './src/CachingImage'
import { cacheManager } from './utils'

const IMAGE_URI = 'https://picsum.photos/3840/2160.jpg?random=test'

export default function Page() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // setProgress(50)

    setProgress(0)
    setTimeout(() => setProgress(30), 1e3)
    // setTimeout(() => setProgress(60), 2e3)
    // setTimeout(() => setProgress(90), 3e3)
  }, [])

  return (
    <View>
      <CachingImage
        uri={IMAGE_URI}
        manager={cacheManager}
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
