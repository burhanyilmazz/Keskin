/* eslint-disable jsx-a11y/alt-text */
import {useEffect, useRef} from 'react'

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
      address: "Kartaltepe Mh. Aksu Cd. No:5 Bakırköy / İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-1.jpg",
      coordinate: {lat: 40.9842221, lng: 28.882086}
    },
    {
      id: 2,
      title: "Construction Market / Çemberlitaş Branch",
      address: "Binbirdirek Mh. Peykane Sok No:16/A Çemberlitaş – Fatih / İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-2.jpg",
      coordinate: {lat: 41.0120348, lng: 28.9676527}
    },
    {
      id: 3,
      title: "Construction Materials / Arnavutköy Branch",
      address: "Deliklikaya Kayabaşı Cd. No:29  Arnavutköy / İstanbul",
      phone: "+90 (212) 542 40 61",
      fax: "+90 (212) 542 40 62",
      email: "info@keskinyapimarket.com.tr",
      image: "/images/content/contact/contact-3.jpg",
      coordinate: {lat: 41.1135206, lng: 28.6523425}
    },
    {
      id: 4,
      title: "Construction Materials / Zeytinburnu Branch",
      address: "Seyitnizam Mh. Demirciler Sitesi. 8 Cd. No:68 Zeytinburnu / İstanbul",
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
      <Layout products={products}>
        <div id="map" ref={googlemap} />
        <div className={classNames('content', styles['contact'])}>
          <div className='container'>
            <div className={styles['list']}>
              { contact.map((item, index) => <ContactCard key={index} data={item} /> )}
            </div>

            <div className={styles['form']}>
              <div className={styles['text']}>
                <div className='min-title'>Contact</div>
                <h3>You can reach our products from our showrooms located at 6 different points in Istanbul!</h3>
              </div>
              <div className={styles['box']}>
                <ContactForm type={'contact'} title="Contact Form" />
              </div>
            </div>
          </div>
        </div>

        <section className={styles['newsletter']}>
          <Newsletter title="E-Newsletter" text="Subscribe to the e-newsletter to be informed about campaigns and announcements." type='subscription'/>
        </section>
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