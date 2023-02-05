import { StatusBar } from 'expo-status-bar'
import { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { FileSystemManagerProvider } from 'expo-file-system-manager'

const Page = () => {
  return (
    <View>
      <Text>Hello</Text>
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

export default function App() {
  console.log(FileSystemManagerProvider)
  return (
    <>
      <StatusBar style='auto' />
      <FileSystemManagerProvider>
        <Page />
      </FileSystemManagerProvider>
    </>
  )
}
