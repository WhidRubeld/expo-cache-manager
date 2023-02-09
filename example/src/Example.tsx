/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ScrollView, StyleSheet, View, Text } from 'react-native'
import { useCache, useCacheManager, CachingImage } from 'expo-cache-manager'

const IMAGE_1_URI = 'https://picsum.photos/3840/2160.jpg?random=first'
const IMAGE_2_URI = 'https://picsum.photos/3840/2160.jpg?random=second'

export default function Page() {
  const { resetAsync } = useCache()
  const imageCache = useCacheManager('images')

  return (
    <ScrollView>
      <Text
        style={{
          marginTop: 50,
          marginBottom: 20,
          fontSize: 16,
          fontWeight: 'bold'
        }}
      >
        Images cache manager
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <CachingImage
          uri={IMAGE_1_URI}
          manager='images'
          style={{
            flex: 1,
            height: 150,
            marginHorizontal: 10
          }}
        />
        <CachingImage
          uri={IMAGE_2_URI}
          manager='images'
          style={{
            flex: 1,
            height: 150,
            marginHorizontal: 10
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => imageCache?.resetAsync()}
          title='Reset image cache'
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button onPress={() => resetAsync()} title='Reset all cache' />
      </View>
    </ScrollView>
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
