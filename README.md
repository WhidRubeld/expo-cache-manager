# expo-cache-manager

<img src="https://github.com/WhidRubeld/expo-cache-manager/tree/master/example/result.gif" width="250px" alt="expo-cache-manager-example" border="0">

[Example source code](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)

Cache manager for React Native projects with [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/).

## Installation

Managed workflow
```sh
npx expo install expo-file-system expo-cache-manager react-native-svg
```

Bare workflow

1. Install dependencies
```sh
yarn add expo-file-system expo-cache-manager react-native-svg
```

2. Follow the instructions to install [expo-file-system](https://github.com/expo/expo/tree/sdk-47/packages/expo-file-system) package

3. Follow the instructions to install [react-native-svg](https://github.com/software-mansion/react-native-svg) package


## Usage - Quick start

```ts
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
        <CachingImage uri='your-image-url' manager='images' />
      )}
    </CacheManagerProvider>
  )
}
```
[Full example](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)


## Documentation



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License
MIT
