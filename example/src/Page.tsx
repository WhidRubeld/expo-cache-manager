import { StyleSheet, ScrollView, Text } from 'react-native'
import ImageExamples from './ImageExamples'
import { useSafeAreaInsets, EdgeInsets } from 'react-native-safe-area-context'
import ResetButtons from './ResetButtons'
import VideoExample from './VideoExample'

export default function Page() {
  const insets = useSafeAreaInsets()
  const styles = useStyles(insets)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>expo-cache-manager</Text>
      <Text style={styles.subtitle}>
        Library for handling data caching for React Native with expo-file-system
      </Text>
      <Text style={styles.label}>Image cache examples</Text>
      <ImageExamples />
      <Text style={styles.label}>Video cache example</Text>
      <VideoExample />
      <Text style={styles.label}>Managment</Text>
      <ResetButtons />
    </ScrollView>
  )
}

const useStyles = (insets: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      paddingTop: insets.top > 20 ? insets.top : 20,
      paddingBottom: insets.bottom > 20 ? insets.bottom : 20,
      paddingHorizontal: 20,
      flexGrow: 1
    },
    title: {
      textAlign: 'center',
      fontSize: 21,
      fontWeight: '800'
    },
    subtitle: {
      textAlign: 'center',
      marginTop: 5
    },
    label: {
      marginTop: 20,
      marginBottom: 10,
      fontSize: 16
    }
  })
}
