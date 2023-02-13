import { CacheManagerProvider } from 'expo-cache-manager'
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import Page from './Page'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <StatusBar style='dark' />
      <SafeAreaProvider>
        <CacheManagerProvider
          managers={[
            {
              name: 'images',
              entryExpiresIn: 30 * 24 * 60 * 60 // 1 month (in seconds)
            },
            { name: 'videos' },
            'other'
          ]}
          onReady={() => setReady(true)}
        >
          {ready && <Page />}
        </CacheManagerProvider>
      </SafeAreaProvider>
    </>
  )
}
