import { DownloadProgressData } from 'expo-file-system'

export class Utils {
  static str2hex(uri: string) {
    return uri
      .split('')
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  }

  static hex2str(hex: string) {
    return hex
      .split(/(\w\w)/g)
      .filter((p) => !!p)
      .map((c) => String.fromCharCode(parseInt(c, 16)))
      .join('')
  }

  static getUriFilename(uri: string) {
    return uri.substring(
      uri.lastIndexOf('/'),
      uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?')
    )
  }

  static getUriExtension(uri: string) {
    const filename = this.getUriFilename(uri)

    return filename.indexOf('.') !== -1
      ? filename.substring(filename.lastIndexOf('.') + 1)
      : null
  }

  static getUriPath(uri: string) {
    const ext = this.getUriExtension(uri)
    return ext ? uri.substring(0, uri.lastIndexOf('.')) : uri
  }

  static uri2path(uri: string, folder: string) {
    const path = this.getUriPath(uri)
    const ext = this.getUriExtension(uri)
    const tmpHash = new Date().getTime()

    return `${folder}${
      ext ? `${this.str2hex(path)}.${ext}` : this.str2hex(path)
    }`
  }

  // static uri2tmpPath(uri: string, folder: string) {
  //   const path = this.getUriPath(uri)
  //   const ext = this.getUriExtension(uri)
  //   const tmpHash = new Date().getTime()

  //   return `${folder}${
  //     ext
  //       ? `${this.str2hex(path)}-${tmpHash}.${ext}`
  //       : `${this.str2hex(path)}-${tmpHash}`
  //   }`
  // }

  static path2uri(file: string) {
    const path = this.getUriPath(file)
    const ext = this.getUriExtension(file)

    return ext ? `${this.hex2str(path)}.${ext}` : this.hex2str(path)
  }

  static progress2value(progress: DownloadProgressData) {
    return Math.ceil(
      (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100
    )
  }
}
