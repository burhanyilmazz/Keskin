/* eslint-disable jsx-a11y/alt-text */
import {useEffect, useRef} from 'react'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import classNames from 'classnames';
import fetch from 'isomorphic-unfetch'

import {Loader} from '@googlemaps/js-api-loader';

import { Layout } from '../../layout'
import { ContactCard, ContactForm, Newsletter } from '../../components/';

import styles from '../../assets/styles/Contact.module.scss'

import { mapOptions } from '../../utils/Map';

export default function Contact({products}) {
  const { t } = useTranslation('common');
  const googlemap = useRef(null);
  const contact = [
    {
      id: 1,
      title: "Showroom / Bakırkoy Main Branch",
      address: "Kartaltepe Mah. Aksu Cad. No:5/1 Bakırköy/İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-1.jpg",
      coordinate: {lat: 40.9842221, lng: 28.882086}
    },
    {
      id: 2,
      title: "Construction Market / Çemberlitaş Branch",
      address: "Binbirdirek Mah. Peykhane Sk. No:16/A Çemberlitaş / Eminönü / İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-2.jpg",
      coordinate: {lat: 41.0120348, lng: 28.9676527}
    },
    {
      id: 3,
      title: "Construction Materials / Bakırköy Branch",
      address: "Kartaltepe, Aksu Cd. No:9, Bakırköy / Istanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-3.jpg",
      coordinate: {lat: 40.983691, lng: 28.8820653}
    },
    {
      id: 4,
      title: "Construction Materials / Zeytinburnu Branch",
      address: "Seyitnizam Mah. Demirciler Sitesi 8.Yol /68 Zeytinburnu - Istanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-4.jpg",
      coordinate: {lat: 41.0057562, lng: 28.8953089}
    },
   /*  {
      id: 5,
      title: "Showroom / Bakırköy Merkez Şube",
      address: "Kartaltepe Mah. Aksu Cad. No:5/1 Bakırköy/İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-5.jpg",
      coordinate: {lat: 33.0243554, lng: 23.6873023}
    },
    {
      id: 6,
      title: "Showroom / Bakırköy Merkez Şube",
      address: "Kartaltepe Mah. Aksu Cad. No:5/1 Bakırköy/İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-6.jpg",
      coordinate: {lat: 34.0343554, lng: 26.6873023}
    } */
  ]

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyALsmBLvMeKOlK2M5SHs2_jgYeJM-6UdBU",
      sensor: false,
      language: 'tr'
    });
    let map;

    loader.load().then(() => {
      const google = window.google;
      const bounds = new google.maps.LatLngBounds();
      const image = "/images/content/contact/pin.png";

      map = new google.maps.Map(googlemap.current, mapOptions);

      contact.map((item, index) => {
        const marker = new google.maps.Marker({
          position: {lat: item.coordinate.lat, lng: item.coordinate.lng},
          map: map,
          icon: image
        });

        bounds.extend(marker.position);
      })

      map.fitBounds(bounds);
    });
  });

  return (
    <>
      <Head>
        <title>Keskin Yapı | Contact</title>
        <meta name="description" content={t('CONTACT.SUBTITLE')} />
      </Head>
      
      <Layout products={products}>
        <div id="map" ref={googlemap} />
        <div className={classNames('content', styles['contact'])}>
          <div className='container'>
            <div className={styles['list']}>
              { contact.map((item, index) => <ContactCard key={index} data={item} /> )}
            </div>

            <div className={styles['form']}>
              <div className={styles['text']}>
                <div className='min-title'>{t('SIDEBAR.CONTACT')}</div>
                <h3>{t('CONTACT_FORM.TEXT')}</h3>
              </div>
              <div className={styles['box']}>
                <ContactForm type={'contact'} title={t('CONTACT_FORM')} />
              </div>
            </div>
          </div>
        </div>

        <section className={styles['newsletter']}>
          <Newsletter title={t('NEWSLETTER.NEWS_TITLE')} text={t('NEWSLETTER.NEWS_DESC')} type='subscription'/>
        </section>
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