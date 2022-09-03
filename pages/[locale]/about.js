import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';

import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'

import styles from '../../assets/styles/Home.module.scss'
import { StaticI18nLink } from '../../components';

export default function About() {
  const { t } = useTranslation('common')

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{t('language-name-tr')}</h1>
        <StaticI18nLink href='/product'>HMF</StaticI18nLink>
      </main>
    </div>
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