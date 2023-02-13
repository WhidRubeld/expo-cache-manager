expo-cache-manager / [Exports](modules.md)

# expo-cache-manager

<p>
  <a href="https://www.npmjs.com/package/expo-cache-manager"><img alt="npm version" src="https://img.shields.io/npm/v/expo-cache-manager"></a>
</p>

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
      managers={[
        {
          name: 'images',
          // 1 month (in seconds)
          entryExpiresIn: 30 * 24 * 60 * 60
        },
        // without expire prop (-1 default)
        { name: 'videos' },
        // short naming (-1 default)
        'other'
      ]}
      onReady={() => setReady(true)}
    >
      {ready && (
        <CachingImage uri={'remote-file-uri'} manager='images' />
      )}
    </CacheManagerProvider>
  )
}
```

## Caching entry rules
* `-1` (default) - the cache is forever
* `0` - the cache is automatically reset on the next render
* `{seconds}` - reset the cache after a certain number of seconds, after loading the file (when updating the render)

## Links
*  [Example source code](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)
*  [Documentation](https://github.com/WhidRubeld/expo-cache-manager/tree/master/docs/modules.md)

## Future list

- [ ] SQLite support with queries
- [ ] More detailed documentation
- [ ] Advanced example
- [x] Add expire support
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
