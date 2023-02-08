import { createContext, ReactNode, useCallback, useState } from 'react'
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
  children
}: {
  managers: string[]
  children: ReactNode
}) => {
  const [ready, setReady] = useState(false)
  const [managers] = useState<CacheManager[]>(
    m.map((v) => new CacheManager({ folder: v }))
  )

  const initAsync = useCallback(() => {
    return Promise.all(managers.map((v) => v.initAsync)).then(() =>
      setReady(true)
    )
  }, [managers])

  return (
    <CacheManagerContext.Provider value={{ ready, managers, initAsync }}>
      {children}
    </CacheManagerContext.Provider>
  )
}
