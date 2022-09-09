/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Dealership.module.scss'

import { products } from '../../utils/Products';
import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Dealership() {
  const { t } = useTranslation('common');

  const breadcrumbs = [
    {
      title: t('DEALER.TITLE'),
      href: '/dealership'
    }
  ]

  const dealer = [
    {
        image: '/images/content/dealership/vko.png'
    },
    {
        image: '/images/content/dealership/vitra.png'
    },
    {
        image: '/images/content/dealership/yaparlar.png'
    },
    {
        image: '/images/content/dealership/tekno.png'
    },
    {
        image: '/images/content/dealership/ytong.png'
    },
    {
        image: '/images/content/dealership/vesfa.png'
    },
    {
        image: '/images/content/dealership/ticm.png'
    },
    {
        image: '/images/content/dealership/yaylaoglu.png'
    },
    {
        image: '/images/content/dealership/ve-ge.png'
    },
    {
        image: '/images/content/dealership/system.png'
    },
    {
        image: '/images/content/dealership/tangit.png'
    },
    {
        image: '/images/content/dealership/spinteks.png'
    },
    {
        image: '/images/content/dealership/siemens.png'
    },
    {
        image: '/images/content/dealership/philips.png'
    },
    {
        image: '/images/content/dealership/marshall.png'
    },
    {
        image: '/images/content/dealership/axor.png'
    },
    {
        image: '/images/content/dealership/atermit.png'
    },
    {
        image: '/images/content/dealership/makita.png'
    },
    {
        image: '/images/content/dealership/vko.png'
    },
    {
        image: '/images/content/dealership/vitra.png'
    },
    {
        image: '/images/content/dealership/yaparlar.png'
    },
    {
        image: '/images/content/dealership/tekno.png'
    },
    {
        image: '/images/content/dealership/ytong.png'
    },
    {
        image: '/images/content/dealership/vesfa.png'
    },
    {
        image: '/images/content/dealership/ticm.png'
    },
    {
        image: '/images/content/dealership/yaylaoglu.png'
    },
    {
        image: '/images/content/dealership/ve-ge.png'
    },
    {
        image: '/images/content/dealership/system.png'
    },
    {
        image: '/images/content/dealership/tangit.png'
    },
    {
        image: '/images/content/dealership/spinteks.png'
    },
    {
        image: '/images/content/dealership/siemens.png'
    },
    {
        image: '/images/content/dealership/philips.png'
    },
    {
        image: '/images/content/dealership/marshall.png'
    },
    {
        image: '/images/content/dealership/axor.png'
    },
    {
        image: '/images/content/dealership/atermit.png'
    },
    {
        image: '/images/content/dealership/makita.png'
    },
    {
        image: '/images/content/dealership/vko.png'
    },
    {
        image: '/images/content/dealership/vitra.png'
    },
    {
        image: '/images/content/dealership/yaparlar.png'
    },
    {
        image: '/images/content/dealership/tekno.png'
    },
    {
        image: '/images/content/dealership/ytong.png'
    },
    {
        image: '/images/content/dealership/vesfa.png'
    },
    {
        image: '/images/content/dealership/ticm.png'
    },
    {
        image: '/images/content/dealership/yaylaoglu.png'
    },
    {
        image: '/images/content/dealership/ve-ge.png'
    },
    {
        image: '/images/content/dealership/system.png'
    },
    {
        image: '/images/content/dealership/tangit.png'
    },
    {
        image: '/images/content/dealership/spinteks.png'
    },
    {
        image: '/images/content/dealership/siemens.png'
    },
    {
        image: '/images/content/dealership/philips.png'
    },
    {
        image: '/images/content/dealership/marshall.png'
    },
    {
        image: '/images/content/dealership/axor.png'
    },
    {
        image: '/images/content/dealership/atermit.png'
    },
    {
        image: '/images/content/dealership/makita.png'
    },
    
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/dealership/head.jpg"}
          title={t('DEALER.TITLE')}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['dealership'])}>
            <h6>{t('DEALER.TITLE')}</h6>
            <div className={styles['content']}>
							<h2>{t('DEALER.SUBTITLE')}</h2>
							<ul className={styles['list']}>
									{
										dealer.map((item, index) => <li key={index}><Image src={item.image} width={76} height={30} layout={'responsive'} /></li> )
									}
							</ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
})

export const getStaticProps = async (ctx) => ({
  props: {
    ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
  },
})