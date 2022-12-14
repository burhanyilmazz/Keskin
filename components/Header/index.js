/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'
import Headroom from 'headroom.js';

import {StaticI18nLink} from '../'
import styles from './Header.module.scss';

export const Header = (props) => { 
  const { transparent, searchBox, isChange } = props;
  const [colorLogo, setColorLogo] = useState(transparent);
  const [search, setSearch] = useState(searchBox);

  useEffect(() => {
    const myElement = document.querySelector('header');
    const options = {
      prefix: 'sticky',
      tolerance: {
        down : 10,
        up : 20
      },
      offset : 64,
      classes : {
        initial : 'header',
        pinned : 'header--pinned',
        unpinned : 'header--unpinned',
        top : 'header--top',
        notTop : 'header--not-top',
        bottom : 'header--bottom',
        notBottom : 'header--not-bottom',
      },
      onPin: () => {
        if (transparent) setColorLogo(false)
      },
      onUnpin: () => {
        if (transparent) setColorLogo(true)
      },
      onTop: () => {
        if (transparent) setColorLogo(true)
      }
    }
    const headroom  = new Headroom(myElement, options);
    headroom.init();
  }, [])

  useEffect(() => {
    setColorLogo(transparent && isChange ? !isChange : transparent)
    setSearch(isChange)
  }, [transparent, searchBox, isChange])
  
  return (
      <header className={classNames(styles['header'], {[styles['header--transparent']] : transparent, [styles['header--search']] : search })}>
        <div className='container-fluid'>
          <StaticI18nLink href='/'>
            <a>
              { !colorLogo && <Image src={'/images/content/logo/logo.svg'} width={'181'} height={'36'} layout={'fixed'} alt={'Keskin Yapı'} /> }
              { colorLogo && <Image src={'/images/content/logo/logo-white.svg'} width={'181'} height={'36'} layout={'fixed'} alt={'Keskin Yapı'} /> }
            </a>
          </StaticI18nLink>
        </div>
      </header>
  )
}

Header.propTypes = {
	transparent: PropTypes.bool,
	searchBox: PropTypes.bool,
	isChange: PropTypes.bool,
};

Header.defaultProps = {
	transparent: false,
	searchBox: false,
	isChange: false,
}