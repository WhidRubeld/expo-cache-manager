[expo-cache-manager](../README.md) / [Exports](../modules.md) / CacheManager

# Class: CacheManager

## Hierarchy

- `EventEmitter`<``"ready"`` \| ``"reset"``\>

  ↳ **`CacheManager`**

## Table of contents

### Constructors

- [constructor](CacheManager.md#constructor)

### Properties

- [\_entries](CacheManager.md#_entries)
- [\_entryExpiresIn](CacheManager.md#_entryexpiresin)
- [\_folder](CacheManager.md#_folder)
- [\_ready](CacheManager.md#_ready)
- [\_tmpFolder](CacheManager.md#_tmpfolder)
- [folder](CacheManager.md#folder)
- [prefixed](CacheManager.md#prefixed)

### Accessors

- [entries](CacheManager.md#entries)
- [entryExpiresIn](CacheManager.md#entryexpiresin)
- [ready](CacheManager.md#ready)

### Methods

- [addListener](CacheManager.md#addlistener)
- [emit](CacheManager.md#emit)
- [eventNames](CacheManager.md#eventnames)
- [getCacheSizeAsync](CacheManager.md#getcachesizeasync)
- [getEntry](CacheManager.md#getentry)
- [initAsync](CacheManager.md#initasync)
- [listenerCount](CacheManager.md#listenercount)
- [listeners](CacheManager.md#listeners)
- [off](CacheManager.md#off)
- [on](CacheManager.md#on)
- [once](CacheManager.md#once)
- [removeAllListeners](CacheManager.md#removealllisteners)
- [removeListener](CacheManager.md#removelistener)
- [resetAsync](CacheManager.md#resetasync)

## Constructors

### constructor

• **new CacheManager**(`opts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Partial`<[`CacheManagerOptions`](../modules.md#cachemanageroptions)\> |

#### Overrides

EventEmitter&lt;&#x27;ready&#x27; \| &#x27;reset&#x27;\&gt;.constructor

#### Defined in

[src/CacheManager.class.ts:30](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L30)

## Properties

### \_entries

• `Private` **\_entries**: `Object`

#### Index signature

▪ [uri: `string`]: [`CacheEntry`](CacheEntry.md)

#### Defined in

[src/CacheManager.class.ts:24](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L24)

___

### \_entryExpiresIn

• `Private` **\_entryExpiresIn**: `number`

#### Defined in

[src/CacheManager.class.ts:25](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L25)

___

### \_folder

• `Private` **\_folder**: `string`

#### Defined in

[src/CacheManager.class.ts:27](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L27)

___

### \_ready

• `Private` **\_ready**: `boolean`

#### Defined in

[src/CacheManager.class.ts:23](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L23)

___

### \_tmpFolder

• `Private` **\_tmpFolder**: `string`

#### Defined in

[src/CacheManager.class.ts:28](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L28)

___

### folder

• `Readonly` **folder**: `string`

#### Defined in

[src/CacheManager.class.ts:26](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L26)

___

### prefixed

▪ `Static` **prefixed**: `string` \| `boolean`

#### Inherited from

EventEmitter.prefixed

#### Defined in

node_modules/eventemitter3/index.d.ts:9

## Accessors

### entries

• `get` **entries**(): `Object`

#### Returns

`Object`

#### Defined in

[src/CacheManager.class.ts:176](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L176)

___

### entryExpiresIn

• `get` **entryExpiresIn**(): `number`

#### Returns

`number`

#### Defined in

[src/CacheManager.class.ts:180](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L180)

___

### ready

• `get` **ready**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/CacheManager.class.ts:172](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L172)

## Methods

### addListener

▸ **addListener**<`T`\>(`event`, `fn`, `context?`): [`CacheManager`](CacheManager.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |

#### Returns

[`CacheManager`](CacheManager.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/eventemitter3/index.d.ts:45

___

### emit

▸ **emit**<`T`\>(`event`, `...args`): `boolean`

Calls each of the listeners registered for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/eventemitter3/index.d.ts:32

___

### eventNames

▸ **eventNames**(): (``"ready"`` \| ``"reset"``)[]

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

(``"ready"`` \| ``"reset"``)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/eventemitter3/index.d.ts:15

___

### getCacheSizeAsync

▸ **getCacheSizeAsync**(`withTmp?`): `Promise`<`number`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `withTmp` | `boolean` | `false` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/CacheManager.class.ts:146](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L146)

___

### getEntry

▸ **getEntry**(`uri`): ``null`` \| [`CacheEntry`](CacheEntry.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

``null`` \| [`CacheEntry`](CacheEntry.md)

#### Defined in

[src/CacheManager.class.ts:126](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L126)

___

### initAsync

▸ **initAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/CacheManager.class.ts:47](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L47)

___

### listenerCount

▸ **listenerCount**(`event`): `number`

Return the number of listeners listening to a given event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ready"`` \| ``"reset"`` |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/eventemitter3/index.d.ts:27

___

### listeners

▸ **listeners**<`T`\>(`event`): (...`args`: `any`[]) => `void`[]

Return the listeners registered for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |

#### Returns

(...`args`: `any`[]) => `void`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/eventemitter3/index.d.ts:20

___

### off

▸ **off**<`T`\>(`event`, `fn?`, `context?`, `once?`): [`CacheManager`](CacheManager.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn?` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |
| `once?` | `boolean` |

#### Returns

[`CacheManager`](CacheManager.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/eventemitter3/index.d.ts:69

___

### on

▸ **on**<`T`\>(`event`, `fn`, `context?`): [`CacheManager`](CacheManager.md)

Add a listener for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |

#### Returns

[`CacheManager`](CacheManager.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/eventemitter3/index.d.ts:40

___

### once

▸ **once**<`T`\>(`event`, `fn`, `context?`): [`CacheManager`](CacheManager.md)

Add a one-time listener for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |

#### Returns

[`CacheManager`](CacheManager.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/eventemitter3/index.d.ts:54

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`CacheManager`](CacheManager.md)

Remove all listeners, or those of the specified event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | ``"ready"`` \| ``"reset"`` |

#### Returns

[`CacheManager`](CacheManager.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/eventemitter3/index.d.ts:79

___

### removeListener

▸ **removeListener**<`T`\>(`event`, `fn?`, `context?`, `once?`): [`CacheManager`](CacheManager.md)

Remove the listeners of a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"ready"`` \| ``"reset"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn?` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |
| `once?` | `boolean` |

#### Returns

[`CacheManager`](CacheManager.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/eventemitter3/index.d.ts:63

___

### resetAsync

▸ **resetAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/CacheManager.class.ts:103](https://github.com/WhidRubeld/expo-file-system-manager/blob/985dd7f/src/CacheManager.class.ts#L103)
