# expo-cache-manager

<img src="https://github.com/WhidRubeld/expo-cache-manager/blob/master/example/result.gif" width="250px" alt="expo-cache-manager-example" border="0">

[Example source code](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)

Library for handling data caching for React Native with [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/).

## Installation

#### Managed workflow

```sh
npx expo install expo-file-system expo-cache-manager react-native-svg
```

### Bare workflow

1. Install dependencies
```sh
yarn add expo-file-system expo-cache-manager react-native-svg
# or
npm i expo-file-system expo-cache-manager react-native-svg
```
2. Follow the instructions to install [expo-file-system](https://github.com/expo/expo/tree/sdk-47/packages/expo-file-system) package
3. Follow the instructions to install [react-native-svg](https://github.com/software-mansion/react-native-svg) package

## Quick start

```tsx
import { useState } from 'react'
import { CacheManagerProvider, CachingImage } from 'expo-cache-manager'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <CacheManagerProvider
      managers={['images']}
      onReady={() => setReady(true)}
    >
      {ready && (
        <CachingImage uri={'remote-file-uri'} manager='images' />
      )}
    </CacheManagerProvider>
  )
}
```

[Full example](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)

## Documentation

### Provider
````ts
return (
  <CacheManagerProvider
    managers={['images', 'files']}
    onReady={() => console.log('Provider is ready')}
  >
    ...
  <CacheManagerProvider>
)

````

*Props*

`CacheManagerProviderProps`

*Default props*
```ts
{
  launch: true
  onReady: () => {}
}
```

### Hooks

#### `useCache`
Always returns the cache manager context value.

*Usage*
```ts
const { managers, ready, initAsync, resetAsync } = useCache()
```

*Return*
```ts
CacheManagerContextValue
```

#### `useCacheManager`
Returns the manager from the provider if it exists.

*Usage*
```ts
const manager = useCacheManager('images')
```

*Props*
| Prop | Type | Required | Description | Default |
| ------- | ------- | ------- | --------- | ------- |
| name | `string` | `true` | Manager name | - |


*Return*
```ts
CacheManagerContextValue | null
```

#### `useCacheFile`
Always returns a file state object with methods to work with that state.

*Usage*
```ts
const {
  ready,
  status,
  path,
  progress,
  downloadAsync,
  pauseAsync,
  resumeAsync,
  cancelAsync,
} = useCacheFile('remote-file-uri', 'images', { delay: 0 })
```

*Props*
| Prop | Type | Required | Description | Default |
| ------- | ------- | ------- | --------- | ------- |
| uri | `string` | `true` | Remote file uri | - |
| manager | `string` | `true` | Manager name | - |
| options | `{ delay: number }` | `false` | Progress delay in ms | `{ delay: 2e2 }` |


*Return*
```ts
{
  ready: boolean // is the file created in the manager
  status: CacheEntryStatus
  path: string | null
  progress: number
  downloadAsync: (options: CacheEntryDownloadOptions) => Promise<string>
  pauseAsync: () => Promise<DownloadPauseState>
  resumeAsync: () => Promise<void>
  cancelAsync: () => Promise<void>
}
```

### Components

#### `CachingImage`
Ready-made component for displaying the cached image.

*Usage*
```tsx
<CachingImage
  manager="images"
  uri="remote-file-uri"
  style={{ width: '100%', height: 300 }}
  backgroundColor="#eeeeee"
  progressDelay={5e2}
  autoLoad
  toggleButtons
  progressProps={{
    width: 3.5,
    size: 50,
    color: '#000000',
    style: {{ padding: 30 }}
  }}
/>
```

*Props*

`CachingImageProps`

*Default props*
```ts
{
  backgroundColor: '#cccccc',
  progressDelay: 2e2,
  autoLoad: true,
  toggleButtons: false,
  progressProps: {
    width: 3,
    size: 40,
    color: '#ffffff',
    style: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      padding: 20
    }
  }
}
```

#### `ProgressIndicator`
Ready-made progress indicator component.

*Usage*
```tsx
<ProgressIndiator
  progress={progress}
  width={3}
  size={40}
  color='#ffffff'
  style={{
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 20
  }}
  delay={2e2}
>
  ...
</ProgressIndiator>
```

*Props*

`ProgressIndicatorProps`

*Default props*
```ts
{
  delay: 2e2
}
```


### Classes

### Types

#### `CacheManagerProviderProps`
```ts
{
  managers: string[] // array of names for managers
  launch?: boolean // whether to run init automatically
  onReady?: () => void // init cb
  children: ReactNode
}
```

#### `CacheManagerContextValue`
```ts
{
  managers: CacheManager[]
  ready: boolean // ready status of all managers
  initAsync: () => Promise<void> // run init of all managers
  resetAsync: () => Promise<void> // run reset of all managers
}
```

#### `CachingImageProps`
```ts
{
  manager: string
  uri: string
  style?: StyleProp<ImageStyle>
  backgroundColor?: ColorValue
  progressDelay?: number
  autoLoad?: boolean // whether to start loading on init and on cache flush
  toggleButtons?: boolean // whether to display pause and resume buttons
  progressProps?: Omit<
    ProgressIndicatorProps,
    'progress' | 'children' | 'delay'
  >
}
```

#### `ProgressIndicatorProps`
```ts
{
  progress: number // progress value
  size: number
  width: number
  color: ColorValue
  style?: StyleProp<ViewStyle>
  delay?: number // animation delay
  children?: ReactNode
}
```

#### `CacheEntryOptions`
```ts
{
  uri: string // uri to remote file
  folder: string // full path to folder with cacheDirectory
  tmpFolder: string // full path to tmpFolder with cacheDirectory
  completed?: boolean // for setting complete status
}
```
See [cacheDirectory](https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemcachedirectory) constant in `expo-file-system`.

#### `CacheEntryDownloadOptions`
```ts
{
  onProgress?: (progress: number) => void // download cb from 0 to 100
} & DownloadOptions
```
See [DownloadOptions](https://docs.expo.dev/versions/latest/sdk/filesystem/#downloadoptions) in `expo-file-system`.

### `DownloadPauseState`
See [DownloadPauseState](https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemcachedirectory) in `expo-file-system`.

#### `CacheEntryUpdateEvent`
```ts
{
  status: CacheEntryStatus // file status enum
  path: string | null // path to file from cache storage
  progress: number // from 0 to 100
  error?: any
}
```
### Enums

#### `CacheEntryStatus`

| Name | Value | Description |
| -------- | -------- | ------------- |
| Pending | `pending` | Awaiting download |
| Progress | `progress` | Download in progress |
| Pause | `pause` | Download stopped |
| Complete | `complete` | File downloaded |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
