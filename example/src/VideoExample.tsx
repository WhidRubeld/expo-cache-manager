import { ResizeMode, Video } from 'expo-av'
import { CacheEntryStatus, useCacheFile } from 'expo-cache-manager'
import { Button, StyleSheet } from 'react-native'

export default function VideoExample() {
  const {
    ready,
    path,
    status,
    progress,
    downloadAsync,
    pauseAsync,
    resumeAsync,
    resetAsync
  } = useCacheFile(
    'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    'videos'
  )

  return (
    <>
      {path && (
        <Video
          source={{ uri: path }}
          useNativeControls
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
      <Button
        title={
          status === CacheEntryStatus.Progress
            ? `Downloading - ${parseInt(progress, 10)}%`
            : 'Download'
        }
        disabled={!ready || status !== CacheEntryStatus.Pending}
        onPress={() => downloadAsync()}
      />
      <Button
        title='Pause'
        disabled={!ready || status !== CacheEntryStatus.Progress}
        onPress={pauseAsync}
      />
      <Button
        title='Resume'
        disabled={!ready || status !== CacheEntryStatus.Pause}
        onPress={resumeAsync}
      />
      <Button
        title='Reset'
        disabled={!ready || status !== CacheEntryStatus.Complete}
        onPress={resetAsync}
      />
    </>
  )
}

const styles = StyleSheet.create({
  video: { height: 200, marginBottom: 10 }
})
