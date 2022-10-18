import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/globals.scss';
import i18nextConfig from '../next-i18next.config'

import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp, i18nextConfig)
