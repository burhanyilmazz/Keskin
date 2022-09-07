/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useRouter } from "next/router";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './LeftNav.module.scss';
import { StaticI18nLink, Icon } from '../';
import Image from 'next/image'


export const LeftNav = (props) => {
  const { isShow, products } = props;
  const [list, setList] = useState(products)

  const onClick = (event, index, child) => {
    if (child !== undefined) {
      list[index].children[child].isOpen = !list[index].children[child].isOpen;
      list[index].children.map((item, i) => {
        if (i !== child) list[index].children[i].isOpen = false
      })
    } else {
      list[index].isOpen = !list[index].isOpen;
      list.map((item, i) => {
        if (i !== index) list[i].isOpen = false
      })
    }

    setList([...list])
  }

  const router = useRouter();
  const route = `/${router.asPath.split('/')[2]}`;

  const { t, i18n } = useTranslation('common')

  return (
    <aside className={classNames(styles['left-nav'], {[styles['sidebar--open']] : isShow })}>
      <h3>Ürün Grupları</h3>
      <nav>
        <ul>
          {
            list?.map((item, index) => {
              if (item?.children) {
                return (
                  <li 
                    className={classNames({[styles['parent--active']] : item.isActive, [styles['parent--open']] : item.isOpen })} 
                    key = {index}
                  >
                    <div className={styles['item']} onClick={(event) => onClick(event, index)}>
                      <Image src='/images/content/homepage/about.png' width={32} height={32} layout={'fixed'} /> 
                      <div>{item.title}</div>
                      <Icon icon={'arrow'} />
                    </div>
                    <ul>
                      <li className={classNames(styles['all-cat'])} ><StaticI18nLink href={'/'}><a>Tümünü Gör <Icon icon={'arrow'} /></a></StaticI18nLink></li>
                      {
                        item.children.map((children, child) => {
                          if (route == children.href) item.isActive = true;

                          if (children?.products) {
                            return (
                              <li key={child} className={classNames({[styles['child--active']] : children.isActive, [styles['child--open']] : children.isOpen })}  >
                                <div onClick={(event) => onClick(event, index, child)}>{children.title}</div>
                                <ul>
                                  <li className={classNames(styles['all'])} ><StaticI18nLink href={'/'}>Tümünü Gör</StaticI18nLink></li>
                                  {
                                    children.products.map((product, i) => {
                                      return <li key={i} ><StaticI18nLink href={product.href}><a>{product.title} <Icon icon={'circle'} /></a></StaticI18nLink></li>
                                    })
                                  }
                                </ul>
                              </li>
                            )
                          }
                          
                          return <li key={child} className={classNames({[styles['nav--active']] : children.isActive || route == children.href })} ><StaticI18nLink href={children.href}>{children.title}</StaticI18nLink></li>
                        })
                      }
                    </ul>
                  </li>
                )
              }

              return <li key={index} className={classNames({[styles['nav--active']] : item.isActive || route == item.href })} ><StaticI18nLink href={item.href}>{item.title}</StaticI18nLink></li>
            })
          }
        </ul>
      </nav>
    </aside>
  )
}

LeftNav.propTypes = {
	isShow: PropTypes.bool,
  products: PropTypes.array
};

LeftNav.defaultProps = {
	isShow: false,
}