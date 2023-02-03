import { fetcher } from '@services/fetcher.service'
import { createContext, useContext, useMemo, useState } from 'react'
import useSWR from 'swr'
import { arqustikConfig, endpoints } from 'arqustik.config'
import { SystemsResponseI } from '@models/System.model'

const { STRAPI_SERVER } = arqustikConfig
const { systems } = endpoints

interface PublicAppContextI {
  systems_pvc: SystemsResponseI
  error: Error
}

const PublicAppContext = createContext<PublicAppContextI | null>(null)

export const PublicAppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { data: systems_pvc } = useSWR<SystemsResponseI>(`${STRAPI_SERVER}${systems}`, fetcher)
  console.log(systems_pvc)
  const value = useMemo(() => ({ systems_pvc } as PublicAppContextI), [systems_pvc])
  return <PublicAppContext.Provider value={value}>{children}</PublicAppContext.Provider>
}

export const usePublicAppStore = () => {
  const context = useContext(PublicAppContext)
  if (!context) {
    throw new Error('You forgot to wrap GlobalStoreProvider')
  }
  return context
}

export default PublicAppContext
