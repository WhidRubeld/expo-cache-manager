[expo-cache-manager](../README.md) / [Exports](../modules.md) / CacheEntry

# Class: CacheEntry

## Hierarchy

- `EventEmitter`<``"update"``\>

  ↳ **`CacheEntry`**

## Table of contents

### Constructors

- [constructor](CacheEntry.md#constructor)

### Properties

- [\_entryExpiresIn](CacheEntry.md#_entryexpiresin)
- [\_error](CacheEntry.md#_error)
- [\_expiresIn](CacheEntry.md#_expiresin)
- [\_path](CacheEntry.md#_path)
- [\_progress](CacheEntry.md#_progress)
- [\_status](CacheEntry.md#_status)
- [\_task](CacheEntry.md#_task)
- [\_tmpPath](CacheEntry.md#_tmppath)
- [uri](CacheEntry.md#uri)
- [prefixed](CacheEntry.md#prefixed)

### Accessors

- [entryExpiresIn](CacheEntry.md#entryexpiresin)
- [error](CacheEntry.md#error)
- [expiresIn](CacheEntry.md#expiresin)
- [path](CacheEntry.md#path)
- [progress](CacheEntry.md#progress)
- [status](CacheEntry.md#status)

### Methods

- [addListener](CacheEntry.md#addlistener)
- [cancelAsync](CacheEntry.md#cancelasync)
- [checkExpireStatus](CacheEntry.md#checkexpirestatus)
- [downloadAsync](CacheEntry.md#downloadasync)
- [emit](CacheEntry.md#emit)
- [eventNames](CacheEntry.md#eventnames)
- [listenerCount](CacheEntry.md#listenercount)
- [listeners](CacheEntry.md#listeners)
- [off](CacheEntry.md#off)
- [on](CacheEntry.md#on)
- [onCompleteAsync](CacheEntry.md#oncompleteasync)
- [onTaskErrorAsync](CacheEntry.md#ontaskerrorasync)
- [onUpdate](CacheEntry.md#onupdate)
- [onUpdateProgress](CacheEntry.md#onupdateprogress)
- [once](CacheEntry.md#once)
- [pauseAsync](CacheEntry.md#pauseasync)
- [removeAllListeners](CacheEntry.md#removealllisteners)
- [removeListener](CacheEntry.md#removelistener)
- [resetAsync](CacheEntry.md#resetasync)
- [resetTaskAsync](CacheEntry.md#resettaskasync)
- [resumeAsync](CacheEntry.md#resumeasync)

## Constructors

### constructor

• **new CacheEntry**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`CacheEntryOptions`](../modules.md#cacheentryoptions) |

#### Overrides

EventEmitter&lt;&#x27;update&#x27;\&gt;.constructor

#### Defined in

[src/CacheEntry.class.ts:58](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L58)

## Properties

### \_entryExpiresIn

• `Private` **\_entryExpiresIn**: `number`

#### Defined in

[src/CacheEntry.class.ts:51](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L51)

___

### \_error

• `Private` `Optional` **\_error**: `any`

#### Defined in

[src/CacheEntry.class.ts:56](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L56)

___

### \_expiresIn

• `Private` **\_expiresIn**: `undefined` \| `Date`

#### Defined in

[src/CacheEntry.class.ts:50](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L50)

___

### \_path

• `Private` **\_path**: `string`

#### Defined in

[src/CacheEntry.class.ts:53](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L53)

___

### \_progress

• `Private` **\_progress**: `number`

#### Defined in

[src/CacheEntry.class.ts:55](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L55)

___

### \_status

• `Private` **\_status**: [`CacheEntryStatus`](../enums/CacheEntryStatus.md)

#### Defined in

[src/CacheEntry.class.ts:47](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L47)

___

### \_task

• `Private` `Optional` **\_task**: `DownloadResumable`

#### Defined in

[src/CacheEntry.class.ts:48](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L48)

___

### \_tmpPath

• `Private` **\_tmpPath**: `string`

#### Defined in

[src/CacheEntry.class.ts:54](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L54)

___

### uri

• `Readonly` **uri**: `string`

#### Defined in

[src/CacheEntry.class.ts:45](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L45)

___

### prefixed

▪ `Static` **prefixed**: `string` \| `boolean`

#### Inherited from

EventEmitter.prefixed

#### Defined in

node_modules/eventemitter3/index.d.ts:9

## Accessors

### entryExpiresIn

• `get` **entryExpiresIn**(): `number`

#### Returns

`number`

#### Defined in

[src/CacheEntry.class.ts:320](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L320)

___

### error

• `get` **error**(): `any`

#### Returns

`any`

#### Defined in

[src/CacheEntry.class.ts:316](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L316)

___

### expiresIn

• `get` **expiresIn**(): `undefined` \| `Date`

#### Returns

`undefined` \| `Date`

#### Defined in

[src/CacheEntry.class.ts:324](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L324)

___

### path

• `get` **path**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Defined in

[src/CacheEntry.class.ts:304](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L304)

___

### progress

• `get` **progress**(): `number`

#### Returns

`number`

#### Defined in

[src/CacheEntry.class.ts:312](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L312)

___

### status

• `get` **status**(): [`CacheEntryStatus`](../enums/CacheEntryStatus.md)

#### Returns

[`CacheEntryStatus`](../enums/CacheEntryStatus.md)

#### Defined in

[src/CacheEntry.class.ts:308](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L308)

## Methods

### addListener

▸ **addListener**<`T`\>(`event`, `fn`, `context?`): [`CacheEntry`](CacheEntry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"update"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |

#### Returns

[`CacheEntry`](CacheEntry.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/eventemitter3/index.d.ts:45

___

### cancelAsync

▸ **cancelAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/CacheEntry.class.ts:248](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L248)

___

### checkExpireStatus

▸ **checkExpireStatus**(): `void`

#### Returns

`void`

#### Defined in

[src/CacheEntry.class.ts:293](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L293)

___

### downloadAsync

▸ **downloadAsync**(`options?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`CacheEntryDownloadOptions`](../modules.md#cacheentrydownloadoptions) |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/CacheEntry.class.ts:153](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L153)

___

### emit

▸ **emit**<`T`\>(`event`, `...args`): `boolean`

Calls each of the listeners registered for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"update"`` |

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

▸ **eventNames**(): ``"update"``[]

Return an array listing the events for which the emitter has registered
listeners.

#### Returns

``"update"``[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/eventemitter3/index.d.ts:15

___

### listenerCount

▸ **listenerCount**(`event`): `number`

Return the number of listeners listening to a given event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"update"`` |

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
| `T` | extends ``"update"`` |

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

▸ **off**<`T`\>(`event`, `fn?`, `context?`, `once?`): [`CacheEntry`](CacheEntry.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"update"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn?` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |
| `once?` | `boolean` |

#### Returns

[`CacheEntry`](CacheEntry.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/eventemitter3/index.d.ts:69

___

### on

▸ **on**<`T`\>(`event`, `fn`, `context?`): [`CacheEntry`](CacheEntry.md)

Add a listener for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"update"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |

#### Returns

[`CacheEntry`](CacheEntry.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/eventemitter3/index.d.ts:40

___

### onCompleteAsync

▸ `Private` **onCompleteAsync**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/CacheEntry.class.ts:92](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L92)

___

### onTaskErrorAsync

▸ `Private` **onTaskErrorAsync**(`e`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/CacheEntry.class.ts:136](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L136)

___

### onUpdate

▸ `Private` **onUpdate**(): `void`

#### Returns

`void`

#### Defined in

[src/CacheEntry.class.ts:328](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L328)

___

### onUpdateProgress

▸ `Private` **onUpdateProgress**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `DownloadProgressData` |

#### Returns

`void`

#### Defined in

[src/CacheEntry.class.ts:87](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L87)

___

### once

▸ **once**<`T`\>(`event`, `fn`, `context?`): [`CacheEntry`](CacheEntry.md)

Add a one-time listener for a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"update"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |

#### Returns

[`CacheEntry`](CacheEntry.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/eventemitter3/index.d.ts:54

___

### pauseAsync

▸ **pauseAsync**(): `Promise`<`DownloadPauseState`\>

#### Returns

`Promise`<`DownloadPauseState`\>

#### Defined in

[src/CacheEntry.class.ts:228](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L228)

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`CacheEntry`](CacheEntry.md)

Remove all listeners, or those of the specified event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | ``"update"`` |

#### Returns

[`CacheEntry`](CacheEntry.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/eventemitter3/index.d.ts:79

___

### removeListener

▸ **removeListener**<`T`\>(`event`, `fn?`, `context?`, `once?`): [`CacheEntry`](CacheEntry.md)

Remove the listeners of a given event.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"update"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `fn?` | (...`args`: `any`[]) => `void` |
| `context?` | `any` |
| `once?` | `boolean` |

#### Returns

[`CacheEntry`](CacheEntry.md)

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

[src/CacheEntry.class.ts:273](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L273)

___

### resetTaskAsync

▸ `Private` **resetTaskAsync**(`withTmpFile?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `withTmpFile` | `boolean` | `false` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/CacheEntry.class.ts:118](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L118)

___

### resumeAsync

▸ **resumeAsync**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/CacheEntry.class.ts:197](https://github.com/WhidRubeld/expo-file-system-manager/blob/9ff9731/src/CacheEntry.class.ts#L197)
