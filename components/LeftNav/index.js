/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './LeftNav.module.scss';
import { StaticI18nLink, Icon, Hamburger } from '../';
import Image from 'next/image'
import slug from 'slug'


export const LeftNav = (props) => {
  const { products } = props;
  const [list, setList] = useState(products);
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked)

    !isChecked 
      ? document.querySelector('html').classList.add('disable') 
      : document.querySelector('html').classList.remove('disable')
  }

  const onClick = (event, index, child) => {
    if (child !== undefined) {
      list[index].subcategories[child].isOpen = !list[index].subcategories[child].isOpen;
      list[index].subcategories.map((item, i) => {
        if (i !== child) list[index].subcategories[i].isOpen = false
      })
    } else {
      list[index].isOpen = !list[index].isOpen;
      list.map((item, i) => {
        if (i !== index) list[i].isOpen = false
      })
    }

    setList([...list])
  }


  const { i18n } = useTranslation('common')

  const catUrl = i18n.language === 'tr' ? '/urunler' : '/products';
  const brandsUrl = i18n.language === 'tr' ? '/marka' : '/brands';
  const productsUrl = i18n.language === 'tr' ? '/urun-detay' : '/product-detail';

  return (
    <>
      <div className={styles['mobile-nav']}>
        <div className='container'>
          <div className={styles['button']} onClick={handleClick}>{i18n.language === 'tr' ? 'Ürün Grupları' : 'Product Groups'} <Icon icon={'arrow'} /></div>
        </div>
      </div>
      
      <aside className={classNames(styles['left-nav'], {[styles['left-nav--open']] : isChecked })}>
        <div className={styles['head']}>
          <h5>{i18n.language === 'tr' ? 'Ürün Grupları' : 'Product Groups'}</h5>
          <Hamburger isCloseImportant={true} onClick={handleClick} />
        </div>
        <div className={styles['wrap']}>
          <h3>{i18n.language === 'tr' ? 'Ürün Grupları' : 'Product Groups'}</h3>
          <nav>
            <ul>
              {
                list?.map((item, index) => {
                  if (item?.subcategories) {
                    return (
                      <li 
                        className={classNames({[styles['parent--active']] : item?.isActive, [styles['parent--open']] : item?.isOpen })} 
                        key = {index}
                      >
                        <div className={styles['item']} onClick={(event) => onClick(event, index)}>
                          <Image src={item.category.thumb} width={32} height={32} layout={'fixed'} alt={item.category.title} /> 
                          <div>{item.category.title}</div>
                          <Icon icon={'arrow'} />
                        </div>
                        <ul>
                          <li className={classNames(styles['all-cat'])} ><StaticI18nLink href={`${catUrl}/${slug(item.category.title)}-${item.category.id}`}><a>{i18n.language === 'tr' ? 'Tümünü Gör' : 'View All'} <Icon icon={'arrow'} /></a></StaticI18nLink></li>
                          {
                            item.subcategories.map((children, child) => {
                              return (
                                <li key={child} className={classNames({[styles['child--active']] : children?.isActive, [styles['child--open']] : children?.isOpen })}  >
                                  <div onClick={(event) => onClick(event, index, child)}>{children.category.title}</div>
                                  <ul>
                                    <li className={classNames(styles['all'])} ><StaticI18nLink href={`${brandsUrl}/${slug(children.category.title)}-${children.category.id}-${item.category.id}`}>{i18n.language === 'tr' ? 'Tümünü Gör' : 'View All'}</StaticI18nLink></li>
                                    {
                                      children.products?.map((product, i) => {
                                        return <li key={i} ><StaticI18nLink href={`${productsUrl}/${slug(product.title)}-${product.id}-${children.category.id}-${item.category.id}`}><a>{product.title} <Icon icon={'circle'} /></a></StaticI18nLink></li>
                                      })
                                    }
                                  </ul>
                                </li>
                              )                              
                            })
                          }
                        </ul>
                      </li>
                    )
                  }

                })
              }
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

LeftNav.propTypes = {
	isShow: PropTypes.bool,
  products: PropTypes.array
};

LeftNav.defaultProps = {
	isShow: false,
}