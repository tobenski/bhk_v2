import { createContext, useContext, useEffect, useState } from 'react'

const SiteContext = createContext()

export const SiteProvider = ({ children }) => {
    const [navIsOpen, setNavIsOpen] = useState(false)
    const [navi, setNavi] = useState([])
    const [error, setError] = useState(false)

    const toggleNav = () => {
        setNavIsOpen(!navIsOpen)
    }

    const openNav = () => {
        setNavIsOpen(true)
    }

    const closeNav = () => {
        setNavIsOpen(false)
    }

    const getNavi = async () => {
        try {
            const resp = await fetch(
                `${process.env.NEXT_PUBLIC_API_NAVIGATION}3`
            )
            const data = await resp.json()
            setNavi(data.items)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        getNavi()
    }, [])

    return (
        <SiteContext.Provider
            value={{
                navIsOpen,
                setNavIsOpen,
                toggleNav,
                openNav,
                closeNav,
                navi,
                error,
            }}>
            {children}
        </SiteContext.Provider>
    )
}

export const useSiteContext = () => {
    return useContext(SiteContext)
}