import { useTranslation } from 'react-i18next'
import useScreenSize from './hooks/useScreenSize'

const App = () => {
    const { t } = useTranslation()
    const { isTablet } = useScreenSize()

    return (
        <>
            <h1 className="text-3xl">{t('hello')}</h1>
            <div className="text-red-500">Web Project Template</div>
            {isTablet ? 'it is tablet size' : 'it is phone size'}
        </>
    )
}

export default App
