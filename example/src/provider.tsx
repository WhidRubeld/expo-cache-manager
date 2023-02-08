import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { CacheManager } from './CacheManager.class'

export const CacheManagerContext = createContext<{
  managers: CacheManager[]
  ready: boolean
  initAsync: () => Promise<void>
}>({
  managers: [],
  ready: false,
  initAsync: () => Promise.reject()
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
  const [managers] = useState<CacheManager[]>(
    m.map((v) => new CacheManager({ folder: v }))
  )

  const initAsync = useCallback(() => {
    return Promise.all(managers.map((v) => v.initAsync())).then(() => {
      setReady(true)
      onReady()
    })
  }, [managers])

  useEffect(() => {
    if (launch) initAsync()
  }, [])

  return (
    <CacheManagerContext.Provider value={{ ready, managers, initAsync }}>
      {children}
    </CacheManagerContext.Provider>
  )
}
