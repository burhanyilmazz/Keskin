/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Contact.module.scss'

import { products } from '../../utils/Products';
import Image from 'next/image'
import classNames from 'classnames';
import { ContactCard } from '../../components/';

export default function Contact() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content={t('CONTACT.SUBTITLE')} />
      </Head>
      
      <Layout products={products}>
        <div className='content'>
          <div className={classNames('container', styles['contact'])}>
            <div className={styles['list']}>
              <ContactCard />
              <ContactCard />
              <ContactCard />
              <ContactCard />
              <ContactCard />
              <ContactCard />
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