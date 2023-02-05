import { BASE_DIR, TMP_DIR } from './constants'

export const str2hex = (uri: string) => {
  return uri
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
}

export const hex2str = (hex: string) => {
  return hex
    .split(/(\w\w)/g)
    .filter((p) => !!p)
    .map((c) => String.fromCharCode(parseInt(c, 16)))
    .join('')
}

export const getUriFilename = (uri: string) => {
  return uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?')
  )
}

export const getUriExtension = (uri: string) => {
  const filename = getUriFilename(uri)

  return filename.indexOf('.') !== -1
    ? filename.substring(filename.lastIndexOf('.') + 1)
    : null
}

export const getUriPath = (uri: string) => {
  const ext = getUriExtension(uri)
  return ext ? uri.substring(0, uri.lastIndexOf('.')) : uri
}

export const uri2cacheFile = (uri: string) => {
  const path = getUriPath(uri)
  const ext = getUriExtension(uri)
  const tmpHash = new Date().getTime()

  return {
    path: `${BASE_DIR}${ext ? `${str2hex(path)}.${ext}` : str2hex(path)}`,
    tmpPath: `${TMP_DIR}${
      ext ? `${str2hex(path)}-${tmpHash}.${ext}` : `${str2hex(path)}-${tmpHash}`
    }`
  }
}

export const cacheFile2uri = (file: string) => {
  const path = getUriPath(file)
  const ext = getUriExtension(file)

  return ext ? `${hex2str(path)}.${ext}` : hex2str(path)
}
