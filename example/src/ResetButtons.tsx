import { Button } from 'react-native'
import { useCache, useCacheManager } from 'expo-cache-manager'

export default function ResetButtons() {
  const { resetAsync } = useCache()
  const imageCache = useCacheManager('images')

  return (
    <>
      <Button
        onPress={() => imageCache?.resetAsync()}
        title='Reset image cache'
      />
      <Button onPress={() => resetAsync()} title='Reset all cache' />
    </>
  )
}
