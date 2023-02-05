import { useFileSystemManagerFile } from './hooks'
import { UploadOptions } from './provider'

export type CachedImageProps = {
  uri: string
  cacheProps?: Partial<UploadOptions>
}

export function CachedImage({ uri, cacheProps }: CachedImageProps) {
  const { path, upload } = useFileSystemManagerFile(uri, cacheProps)
}
