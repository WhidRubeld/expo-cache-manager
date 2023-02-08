import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Page from './Page'

import { cacheManager } from './utils'

export default function App() {
  const [ready, setReady] = useState(false)

  const init = async () => {
    try {
      // await cacheManager.initAsync()
      await cacheManager.resetAsync()
      setReady(true)
    } catch (e) {
      console.warn('init error', e)
    }
  }

  useEffect(() => {
    init()
  }, [])

  if (!ready) return null

  return (
    <>
      <StatusBar style='auto' />
      <SafeAreaProvider>
        <Page />
      </SafeAreaProvider>
    </>
  )
}
