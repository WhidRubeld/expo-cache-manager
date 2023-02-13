[expo-cache-manager](README.md) / Exports

# expo-cache-manager

## Table of contents

### Enumerations

- [CacheEntryStatus](enums/CacheEntryStatus.md)

### Classes

- [CacheEntry](classes/CacheEntry.md)
- [CacheManager](classes/CacheManager.md)
- [Utils](classes/Utils.md)

### Type Aliases

- [CacheEntryDownloadOptions](modules.md#cacheentrydownloadoptions)
- [CacheEntryOptions](modules.md#cacheentryoptions)
- [CacheEntryUpdateEvent](modules.md#cacheentryupdateevent)
- [CacheManagerOptions](modules.md#cachemanageroptions)
- [CacheManagerProviderProps](modules.md#cachemanagerproviderprops)
- [CachingImageProps](modules.md#cachingimageprops)
- [CachingImageRef](modules.md#cachingimageref)
- [ProgressIconProps](modules.md#progressiconprops)
- [ProgressIndicatorProps](modules.md#progressindicatorprops)

### Variables

- [CacheManagerContext](modules.md#cachemanagercontext)
- [defaultCacheImageProgressProps](modules.md#defaultcacheimageprogressprops)
- [defaultCacheManagerOptions](modules.md#defaultcachemanageroptions)

### Functions

- [CacheManagerProvider](modules.md#cachemanagerprovider)
- [CachingImage](modules.md#cachingimage)
- [DownloadIcon](modules.md#downloadicon)
- [PauseIcon](modules.md#pauseicon)
- [PlayIcon](modules.md#playicon)
- [ProgressIcon](modules.md#progressicon)
- [useCache](modules.md#usecache)
- [useCacheFile](modules.md#usecachefile)
- [useCacheManager](modules.md#usecachemanager)

## Type Aliases

### CacheEntryDownloadOptions

Ƭ **CacheEntryDownloadOptions**: { `onProgress?`: (`progress`: `number`) => `void`  } & `DownloadOptions`

#### Defined in

[src/CacheEntry.class.ts:26](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L26)

___

### CacheEntryOptions

Ƭ **CacheEntryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `completed?` | { `expiresIn?`: `Date` ; `status`: `boolean`  } |
| `completed.expiresIn?` | `Date` |
| `completed.status` | `boolean` |
| `entryExpiresIn?` | `number` |
| `folder` | `string` |
| `tmpFolder` | `string` |
| `uri` | `string` |

#### Defined in

[src/CacheEntry.class.ts:15](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L15)

___

### CacheEntryUpdateEvent

Ƭ **CacheEntryUpdateEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `any` |
| `path` | `string` \| ``null`` |
| `progress` | `number` |
| `status` | [`CacheEntryStatus`](enums/CacheEntryStatus.md) |

#### Defined in

[src/CacheEntry.class.ts:37](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L37)

___

### CacheManagerOptions

Ƭ **CacheManagerOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entryExpiresIn?` | `number` |
| `folder` | `string` |

#### Defined in

[src/CacheManager.class.ts:13](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheManager.class.ts#L13)

___

### CacheManagerProviderProps

Ƭ **CacheManagerProviderProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children` | `ReactNode` |
| `launch?` | `boolean` |
| `managers` | (`string` \| { `entryExpiresIn?`: `number` ; `name`: `string`  })[] |
| `onReady?` | () => `void` |

#### Defined in

[src/provider.tsx:23](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/provider.tsx#L23)

___

### CachingImageProps

Ƭ **CachingImageProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `autoLoad?` | `boolean` |
| `backgroundColor?` | `ColorValue` |
| `manager` | `string` |
| `progressDelay?` | `number` |
| `progressProps?` | `Omit`<[`ProgressIndicatorProps`](modules.md#progressindicatorprops), ``"progress"`` \| ``"children"`` \| ``"delay"``\> |
| `style?` | `StyleProp`<`ImageStyle`\> |
| `toggleButtons?` | `boolean` |
| `uri` | `string` |

#### Defined in

[src/CachingImage.tsx:16](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CachingImage.tsx#L16)

___

### CachingImageRef

Ƭ **CachingImageRef**: `ReturnType`<typeof [`useCacheFile`](modules.md#usecachefile)\>

#### Defined in

[src/CachingImage.tsx:47](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CachingImage.tsx#L47)

___

### ProgressIconProps

Ƭ **ProgressIconProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `color?` | `ColorValue` |
| `size` | `number` |
| `status` | [`CacheEntryStatus`](enums/CacheEntryStatus.md) |
| `toggleButtons?` | `boolean` |

#### Defined in

[src/ProgressIcon.tsx:5](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/ProgressIcon.tsx#L5)

___

### ProgressIndicatorProps

Ƭ **ProgressIndicatorProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children?` | `ReactNode` |
| `color` | `ColorValue` |
| `delay?` | `number` |
| `progress` | `number` |
| `size` | `number` |
| `style?` | `StyleProp`<`ViewStyle`\> |
| `width` | `number` |

#### Defined in

[src/ProgressIndicator.tsx:12](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/ProgressIndicator.tsx#L12)

## Variables

### CacheManagerContext

• `Const` **CacheManagerContext**: `Context`<{ `initAsync`: () => `Promise`<`void`\> ; `managers`: [`CacheManager`](classes/CacheManager.md)[] ; `ready`: `boolean` ; `resetAsync`: () => `Promise`<`void`\>  }\>

#### Defined in

[src/provider.tsx:11](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/provider.tsx#L11)

___

### defaultCacheImageProgressProps

• `Const` **defaultCacheImageProgressProps**: `Omit`<[`ProgressIndicatorProps`](modules.md#progressindicatorprops), ``"progress"`` \| ``"children"``\>

#### Defined in

[src/CachingImage.tsx:30](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CachingImage.tsx#L30)

___

### defaultCacheManagerOptions

• `Const` **defaultCacheManagerOptions**: [`CacheManagerOptions`](modules.md#cachemanageroptions)

#### Defined in

[src/CacheManager.class.ts:18](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheManager.class.ts#L18)

## Functions

### CacheManagerProvider

▸ **CacheManagerProvider**(`«destructured»`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CacheManagerProviderProps`](modules.md#cachemanagerproviderprops) |

#### Returns

`Element`

#### Defined in

[src/provider.tsx:36](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/provider.tsx#L36)

___

### CachingImage

▸ **CachingImage**(`props`): ``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

**NOTE**: Exotic components are not callable.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`CachingImageProps`](modules.md#cachingimageprops) & `RefAttributes`<`undefined` \| { `cancelAsync`: () => `Promise`<`void`\> ; `downloadAsync`: (`props?`: [`CacheEntryDownloadOptions`](modules.md#cacheentrydownloadoptions)) => `Promise`<`string`\> ; `error`: `any` ; `path`: ``null`` \| `string` ; `pauseAsync`: () => `Promise`<`DownloadPauseState`\> ; `progress`: `number` = progressValue; `ready`: `boolean` = !!file; `resetAsync`: () => `Promise`<`void`\> ; `resumeAsync`: () => `Promise`<`string`\> ; `status`: [`CacheEntryStatus`](enums/CacheEntryStatus.md)  }\> |

#### Returns

``null`` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:353

___

### DownloadIcon

▸ **DownloadIcon**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SvgProps` |

#### Returns

`Element`

#### Defined in

[src/icons.tsx:3](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/icons.tsx#L3)

___

### PauseIcon

▸ **PauseIcon**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SvgProps` |

#### Returns

`Element`

#### Defined in

[src/icons.tsx:11](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/icons.tsx#L11)

___

### PlayIcon

▸ **PlayIcon**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `SvgProps` |

#### Returns

`Element`

#### Defined in

[src/icons.tsx:19](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/icons.tsx#L19)

___

### ProgressIcon

▸ **ProgressIcon**(`«destructured»`): ``null`` \| `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`ProgressIconProps`](modules.md#progressiconprops) |

#### Returns

``null`` \| `Element`

#### Defined in

[src/ProgressIcon.tsx:12](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/ProgressIcon.tsx#L12)

___

### useCache

▸ **useCache**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `initAsync` | () => `Promise`<`void`\> |
| `managers` | [`CacheManager`](classes/CacheManager.md)[] |
| `ready` | `boolean` |
| `resetAsync` | () => `Promise`<`void`\> |

#### Defined in

[src/hooks.ts:11](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/hooks.ts#L11)

___

### useCacheFile

▸ **useCacheFile**(`uri`, `manager`, `«destructured»?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | ``null`` \| `string` |
| `manager` | `string` |
| `«destructured»` | `Object` |
| › `delay` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `cancelAsync` | () => `Promise`<`void`\> |
| `downloadAsync` | (`props?`: [`CacheEntryDownloadOptions`](modules.md#cacheentrydownloadoptions)) => `Promise`<`string`\> |
| `error` | `any` |
| `path` | ``null`` \| `string` |
| `pauseAsync` | () => `Promise`<`DownloadPauseState`\> |
| `progress` | `number` |
| `ready` | `boolean` |
| `resetAsync` | () => `Promise`<`void`\> |
| `resumeAsync` | () => `Promise`<`string`\> |
| `status` | [`CacheEntryStatus`](enums/CacheEntryStatus.md) |

#### Defined in

[src/hooks.ts:20](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/hooks.ts#L20)

___

### useCacheManager

▸ **useCacheManager**(`manager`): ``null`` \| [`CacheManager`](classes/CacheManager.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `manager` | `string` |

#### Returns

``null`` \| [`CacheManager`](classes/CacheManager.md)

#### Defined in

[src/hooks.ts:15](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/hooks.ts#L15)
