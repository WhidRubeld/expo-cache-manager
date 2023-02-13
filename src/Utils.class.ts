import type { DownloadProgressData } from 'expo-file-system'

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
    const ext = this.getUriExtension(uri)
    return `${folder}${ext ? `${this.str2hex(uri)}.${ext}` : this.str2hex(uri)}`
  }

  static path2uri(file: string) {
    const path = this.getUriPath(file)

    return this.hex2str(path)
  }

  static progress2value(progress: DownloadProgressData) {
    return Math.ceil(
      (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100
    )
  }

  static getUTCDate() {
    const now = new Date()
    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )
    )
  }
}
