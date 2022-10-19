import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './SearchBar.module.scss';
import { Search } from '../';


export const SearchBar = (props) => {
  const { isShow } = props;

  const { i18n } = useTranslation('common')

  return (
    <div className={classNames(styles['search'], {[styles['search--open']] : isShow })}>
      <div className={styles['wrap']}>
        <div className='container'>
          <h4>{i18n.language === 'tr' ? 'Ne Aramıştınız?' : 'What are you looking for?'}</h4>
          <p>{i18n.language === 'tr' ? 'Ürün hizmet ve daha fazlası' : 'Products, services and more'}</p>

          <Search />
        </div>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
	isShow: PropTypes.bool,
};

SearchBar.defaultProps = {
	isShow: false,
}