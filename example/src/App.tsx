import { StyleSheet, View, Text } from 'react-native'
import { CacheManagerProvider } from 'expo-cache-manager'
import { useState } from 'react'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <CacheManagerProvider managers={['images']} onReady={() => setReady(true)}>
      {!ready && (
        <View style={styles.container}>
          <Text>Result: test</Text>
        </View>
      )}
    </CacheManagerProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20
  }
})
