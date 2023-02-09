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

export const CacheManagerProvider = ({
  managers: m,
  launch = true,
  onReady = () => {},
  children
}: {
  managers: string[]
  launch?: boolean
  onReady?: () => void
  children: ReactNode
}) => {
  const [ready, setReady] = useState(false)
  const managers = useRef(m.map((v) => new CacheManager({ folder: v }))).current

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
