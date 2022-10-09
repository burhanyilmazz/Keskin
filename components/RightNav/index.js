/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image'
import classNames from 'classnames';
import slug from 'slug'
import {StaticI18nLink, Icon, Hamburger} from ".."

import { useTranslation } from 'next-i18next';

import styles from './RightNav.module.scss';

export const RightNav = (props) => { 
  const { categories, popular } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);

    !isChecked 
      ? document.querySelector('html').classList.add('disable') 
      : document.querySelector('html').classList.remove('disable')
  }

  const { t } = useTranslation('common');
  
  return (
    <>
      <div className={styles['mobile-nav']}>
        <div className='container'>
          <div className={styles['button']} onClick={handleClick}>{t('SIDEBAR.BLOG')} <Icon icon={'arrow'} /></div>
        </div>
      </div>

      <div className={classNames(styles['right-nav'], {[styles['right-nav--open']] : isChecked } )}>
        <div className={styles['head']}>
          <h5>{t('SIDEBAR.BLOG')}</h5>
          <Hamburger isCloseImportant={true} onClick={handleClick} />
        </div>
        <div className={styles['wrap']}>
          <h6>{t('CATEGORIES')}</h6>
          <div className={styles['categories']}>
            <ul>
              { categories.map((item, index) => <li key={index}><StaticI18nLink href={`/blog/${slug(item.category.title)}-${item.category.id}`}><a><span>{item.category.title}</span> <div>{item.blogs.length}</div></a></StaticI18nLink></li>) }
            </ul>
          </div>

          { popular && 
            <>
              <h6>{t('POPULAR')}</h6>
              <div className={styles['menu']}>
                <ul>
                  {
                    popular.map((item, index) => {
                      const date = new Date(item.created_at);
                      const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`
                      const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`

                      return (
                        <li key={index}>
                          <StaticI18nLink href="#">
                            <a>
                              <div className={styles['list']}>
                                <Image src="/images/dummy/card.jpg" width={'64px'} height={'48px'} layout={'fixed'} alt={item.title} />
                                <div className={styles['desc']}>
                                  <h6>{item.title}</h6>
                                  <p>{day}.{month}.{date.getFullYear()}</p>
                                </div>
                              </div>
                              <Icon icon='arrow' />
                            </a>
                          </StaticI18nLink>
                        </li>
                      )
                    }
                    )
                  }
                </ul>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

RightNav.propTypes = {
	categories: PropTypes.array,
  popular: PropTypes.array
};