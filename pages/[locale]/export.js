/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Export.module.scss'

import { products } from '../../utils/Products';
import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Export() {
  const { t, i18n } = useTranslation('common');

  const breadcrumbs = [
    {
      title: t('SIDEBAR.CORPARATE'),
      href: '/export'
    },
    {
      title: t('EXPORT.TITLE'),
      href: '/export'
    }
  ]

  return (
    <>
      <Head>
        <html lang={i18n.language} />
        <title>Keskin Yapı</title>
        <meta name="description" content={t('EXPORT.SUBTITLE')} />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/export/head.jpg"}
          title={t('EXPORT.TITLE')}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['export'])}>
          <h6>{t('EXPORT.TITLE')}</h6>
          <div className={styles['content']}>
            <h2>{t('EXPORT.SUBTITLE')}</h2>
            <div dangerouslySetInnerHTML={{__html: t('EXPORT.DESC')}} />
          </div>
          <div className={classNames(styles['image'], 'image')}>
            <Image src='/images/content/export/export.jpg' width={485} height={431} layout={'responsive'} />
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