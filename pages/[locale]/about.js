/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { Layout } from '../../layout'
import { getI18nPaths } from '../../getI18nPaths'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/About.module.scss'

import { TopBar, Newsletter } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function About({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/hakkimizda' : '/about';

  const breadcrumbs = [
    {
      title: t('SIDEBAR.CORPARATE'),
      href: pageUrl
    },
    {
      title: t('ABOUT.TITLE'),
      href: pageUrl
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı | About</title>
        <meta name="description" content={t('ABOUT.SUBTITLE')} />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/about/head.jpg"}
          title={t('ABOUT.TITLE')}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['about'])}>
            <div className='min-title'>{t('ABOUT.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('ABOUT.SUBTITLE')}</h2>
              <div dangerouslySetInnerHTML={{__html: t('ABOUT.DESC')}} />
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/about/about.jpg' width={442} height={480} layout={'responsive'} />
            </div>
          </div>
          
          <div className={classNames('container', styles['quality'])}>
            <div className='min-title'>{t('HOME.QUALITY.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('HOME.QUALITY.SUBTITLE')}</h2>
                
              <div className={styles['policy']}>
                <div className={classNames(styles['image'], 'image')}>
                  <Image src='/images/content/about/quality.jpg' width={572} height={480} layout={'responsive'} />
                </div>
                <p>{t('HOME.QUALITY.DESC')}</p>            
              </div>
            </div>
          </div>

          <section className={classNames(styles['newsletter'], 'white-bg')}>
            <Newsletter type='joinUs' title={t('NEWSLETTER.HR_TITLE')} text={t('NEWSLETTER.HR_DESC')} />
          </section>
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