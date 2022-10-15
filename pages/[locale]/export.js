/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Export.module.scss'

import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Export({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/ihracat' : '/export';

  const breadcrumbs = [
    {
      title: t('SIDEBAR.CORPARATE'),
      href: pageUrl
    },
    {
      title: t('EXPORT.TITLE'),
      href: pageUrl
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı |  Export</title>
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
            <div className='min-title'>{t('EXPORT.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('EXPORT.SUBTITLE')}</h2>
              <div dangerouslySetInnerHTML={{__html: t('EXPORT.DESC')}} />
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image alt={t('EXPORT.TITLE')} src='/images/content/export/export.jpg' width={485} height={431} layout={'responsive'} />
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

export async function getStaticProps(ctx) {
  const language = ctx.params.locale;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language })
  }

  const products = await fetch(`${process.env.API_URL}/products/aio`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      products,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    }
  }
}