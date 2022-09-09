/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Career.module.scss'

import { products } from '../../utils/Products';
import { TopBar, ContactForm } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Career() {
  const { t } = useTranslation('common');

  const breadcrumbs = [
    {
      title: t('CAREER.TITLE'),
      href: '/career'
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/career/head.jpg"}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['career'])}>
          <h6>{t('CAREER.TITLE')}</h6>
          <div className={styles['content']}>
            <h2>{t('CAREER.SUBTITLE')}</h2>
            <div dangerouslySetInnerHTML={{__html: t('CAREER.DESC')}} />
          </div>

            <div className={styles['image']}>
                <Image src='/images/content/career/career.png' width={485} height={431} layout={'responsive'} />
            </div>
          </div>
          <div className={classNames('contact', styles['contact'])}>
            <ContactForm title={t('CAREER_FORM')} type = 'hr'/>
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