import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Page from './Page'
import { CacheManagerProvider } from 'expo-cache-manager'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <StatusBar style='auto' />
      <CacheManagerProvider
        managers={['images']}
        onReady={() => setReady(true)}
      >
        {ready ? <Page /> : null}
      </CacheManagerProvider>
    </>
  )
}
