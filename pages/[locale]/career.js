/* eslint-disable jsx-a11y/alt-text */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { Layout } from '../../layout'
import { getI18nPaths } from '../../getI18nPaths'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Career.module.scss'

import { TopBar, ContactForm } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Career({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/kariyer' : '/career';

  const breadcrumbs = [
    {
      title: 'Career',
      href: pageUrl
    }
  ]

  return (
    <>
      <Layout products={products}>
        <TopBar 
          img={"/images/content/career/head.jpg"}
          title='Career'
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['career'])}>
            <div className='min-title'>Career</div>
            <div className={styles['content']}>
              <h2>All of our candidates are very valuable to us in our recruitment processes!</h2>
              <div>
                <p>It is aimed to select and place the most suitable candidates for the job, who will carry our company to the future, who have our corporate values. In this way, we believe that a long-term, efficient and effective working life will be created.</p>
                <p>In our recruitment process, it is regularly planned every year in line with company development and organizational needs. Our recruitment process starts with the evaluation of the applications submitted to our company. After the pre-selection on the CV, candidates who meet the determined criteria are invited to job interviews.</p>
                <p>Candidates invited for an interview are evaluated based on their competencies and, if necessary, their experience for the relevant position. The related process is also supported by different measurement and evaluation tools in line with the needs. The process is completed with the appropriate candidate.</p>
                <p>At Keskin Yapı, where every employee is accepted as a value, all of our candidates are equally valuable to us.</p>
              </div>
            </div>

            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/career/career.jpg' width={442} height={480} layout={'responsive'} />
            </div>
          </div>
          <div className={classNames('container', 'contact', styles['contact'])}>
            <ContactForm title='Creer Form' type = 'hr'/>
          </div>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths = () => ({
  fallback: "blocking",
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
    },
    revalidate: 10,
  }
}