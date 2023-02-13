import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { CacheManager } from './CacheManager.class'

export const CacheManagerContext = createContext<{
  managers: CacheManager[]
  ready: boolean
  initAsync: () => Promise<void>
  resetAsync: () => Promise<void>
}>({
  managers: [],
  ready: false,
  initAsync: () => Promise.reject(),
  resetAsync: () => Promise.reject()
})

export type CacheManagerProviderProps = {
  managers: (
    | string
    | {
        name: string
        entryExpiresIn?: number
      }
  )[]
  launch?: boolean
  onReady?: () => void
  children: ReactNode
}

export const CacheManagerProvider = ({
  managers: alias,
  launch = true,
  onReady = () => {},
  children
}: CacheManagerProviderProps) => {
  const [ready, setReady] = useState(false)
  const managers = useRef(
    alias.map((v) => {
      const isString = typeof v === 'string'
      return new CacheManager({
        folder: !isString ? v.name : v,
        entryExpiresIn: !isString ? v.entryExpiresIn : undefined
      })
    })
  ).current

  const initAsync = useCallback(() => {
    return Promise.all(managers.map((v) => v.initAsync())).then(() => {
      setReady(true)
      onReady()
    })
  }, [managers])

  const resetAsync = useCallback(() => {
    return Promise.all(managers.map((v) => v.resetAsync())).then(() => {})
  }, [managers])

  useEffect(() => {
    if (launch) initAsync()
  }, [])

  return (
    <CacheManagerContext.Provider
      value={{ ready, managers, initAsync, resetAsync }}
    >
      {children}
    </CacheManagerContext.Provider>
  )
}
