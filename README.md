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
```
2. Follow the instructions to install [expo-file-system](https://github.com/expo/expo/tree/sdk-47/packages/expo-file-system) package
3. Follow the instructions to install [react-native-svg](https://github.com/software-mansion/react-native-svg) package

## Usage - Quick start

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
const options: CacheManagerProviderOptions =  { ... }

return (
  <CacheManagerProvider {...options}>
    ...
  <CacheManagerProvider>
)

````

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
  ready: boolean // Is the file created in the manager
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

### Classes

### Types

#### `CacheManagerProviderProps`
```ts
{
  managers: string[] // array of names for managers
  launch?: boolean // startup status at initialization
  onReady?: () => void // callback after completion of initialization
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
#### `CacheEntryOptions`
```ts
{
  uri: string // uri to remote file
  folder: string // full path to folder with cacheDirectory
  tmpFolder: string // full path to tmpFolder with cacheDirectory
  completed?: boolean // for setting complete status
}
```
See [cacheDirectory](https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemcachedirectory) constant.

#### `CacheEntryDownloadOptions`
```ts
{
  onProgress?: (progress: number) => void // download cb from 0 to 100
} & FileSystemUploadOptions
```

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
