/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'

import {StaticI18nLink} from "../"
import styles from './Header.module.scss';

export const Header = (props) => { 
  const { transparent } = props;
  const [colorLogo, setColorLogo] = useState(transparent)
  
  return (
      <header className={classNames(styles['header'], {[styles['header--transparent']] : colorLogo })}>
        <div className='container-fluid'>
          <StaticI18nLink href='/'>
            <a>
              { !colorLogo && <Image src={'/images/content/logo/logo.svg'} width={'181'} height={'36'} layout={'fixed'} /> }
              { colorLogo && <Image src={'/images/content/logo/logo-white.svg'} width={'181'} height={'36'} layout={'fixed'} /> }
            </a>
          </StaticI18nLink>
        </div>
      </header>
  )
}

Header.propTypes = {
	transparent: PropTypes.bool
};

Header.defaultProps = {
	transparent: false
}