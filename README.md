<p>
  <a href="https://www.npmjs.com/package/expo-cache-manager"><img alt="npm version" src="https://img.shields.io/npm/v/expo-cache-manager"></a>
</p>

<img src="https://github.com/WhidRubeld/expo-cache-manager/blob/master/example/result.gif" width="250px" alt="expo-cache-manager-example" border="0">

[Example source code](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)

Library for handling data caching for React Native with [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/).


## About
The logic of work is based on a bunch: Manager-Entry. Where manager is an abstraction over a directory within a filesystem, and entry is a file instance within that directory.

Distinctive features:
- Quick start and flexible setting;
- Support file expiration;
- Support download progress;
- Image component based on (expo-image)[https://docs.expo.dev/versions/unversioned/sdk/image] library
- Many [supported image formants](https://docs.expo.dev/versions/unversioned/sdk/image/#supported-image-formats)
- [BlurHash](https://blurha.sh) support
- A lot of action functions for manipulating the file and the cache in general;
- Ready-made basic components;
- Possibility of scaling.

This library contains the following:
- React provider to initialize cache managers;
- Ready-made React Native components for ease of development;
- React hooks for quick integration into functional components;
- Manager classes and entries for own cache system;
- Utility class with useful functions.

This library is suitable for both small projects and large ones that require their own implementation of the cache.

## Installation

### Managed workflow

#### Basic dependencies

```sh
npx expo install expo-file-system expo-cache-manager
```

#### Additional dependencies
If you plan to use image or progress indicator components, then you need to install additional dependencies

```sh
npx expo install expo-image react-native-svg
```

### Bare workflow

#### Basic dependencies
```sh
yarn add expo-file-system expo-cache-manager
# or
npm i expo-file-system expo-cache-manager
```
Follow the instructions to install [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/#installation) package.

#### Additional dependencies
If you plan to use image or progress indicator components, then you need to install additional dependencies

```sh
yarn add react-native-svg expo-image
# or
npm i react-native-svg expo-image
```
Follow the instructions to install [expo-image](https://docs.expo.dev/versions/latest/sdk/image/#installation) package.
Follow the instructions to install [react-native-svg](https://github.com/software-mansion/react-native-svg) package.

## Quick start

```tsx
import { CacheManagerProvider, CachingImage } from 'expo-cache-manager'

export default function App() {
  return (
    <CacheManagerProvider
      managers={[
        {
          name: 'images',
          entryExpiresIn: 30 * 24 * 60 * 60 // 1 month (in seconds)
        },
        { name: 'videos' }, // without expire prop (-1 default)
        'other' // short naming (-1 default)
      ]}
    >
      <CachingImage
        uri={'remote-file-uri'}
        manager='images'
        style={{ width: '100%', height: 300 }}
        // placeholder="LEHV6nWB2yk8pyo0adR*.7kCMdnj" // blurhash support
        // disabledActions=['pause', 'resume', 'download'] // default []
        // automatic // automatically start download. Default = true
        // indicator={false} // hide progress indicator
        // onProgress={(v) => console.log(`${v}%`)}
        // headers={{
        //   Authorization: `${token_type} ${access_token}`
        // }}

        // ...and many others options
      />
    </CacheManagerProvider>
  )
}
```

## Cache expiration rules for entries (`entryExpiresIn`)
* `-1` (default) - the cache is forever
* `0` - the cache is automatically reset on the next render
* `{seconds}` - reset the cache after a certain number of seconds, after loading the file (when updating the render)

## Links
*  [Documentation](https://whidrubeld.github.io/expo-cache-manager)
*  [Example source code (GIF)](https://github.com/WhidRubeld/expo-cache-manager/tree/master/example)

## Future list

- [ ] SQLite support with queries
- [ ] Advanced example
- [x] More detailed documentation
- [x] Add expire support
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
