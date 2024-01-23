import { useMediaQuery } from 'react-responsive'

const useScreenSize = () => {
    const minTabletW = 768
    const minPCW = 1024
    const minLargePCW = 1280

    const isTablet = useMediaQuery({ query: `(min-width: ${minTabletW}px)` })
    const isPC = useMediaQuery({ query: `(min-width: ${minPCW}px)` })
    const isLargePC = useMediaQuery({ query: `(min-width: ${minLargePCW}px)` })

    return {
        isTablet,
        isPC,
        isLargePC,
    }
}

export default useScreenSize
