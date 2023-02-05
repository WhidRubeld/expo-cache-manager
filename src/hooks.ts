import { useContext } from 'react'
import { FileSystemManagerContext, UploadOptions } from './provider'

export const useFileSystemManager = () => {
  return useContext(FileSystemManagerContext)
}

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

export const useFileSystemManagerFile = (
  uri: string,
  opts: Partial<UploadOptions>
) => {
  const { getCacheFile } = useFileSystemManager()
  return getCacheFile(uri, opts)
}
