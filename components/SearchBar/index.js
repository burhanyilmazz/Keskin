import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './SearchBar.module.scss';
import { FormInput, Icon } from '../';


export const SearchBar = (props) => {
  const { isShow } = props;

  const { t } = useTranslation('common')

  return (
    <div className={classNames(styles['search'], {[styles['search--open']] : isShow })}>
      <div className={styles['wrap']}>
        <div className='container'>
          <h4>{t('SEARCH.BAR.TITLE')}</h4>
          <p>{t('SEARCH.BAR.DESC')}</p>

          <form>
            <div className={styles['input']}>
              <div className={styles['input-icon']}><Icon icon={'search'} /></div>
              <FormInput field={t('SEARCH.BAR.INPUT')} className={styles['search-input']} />
              <div className={styles['input-submit']}><Icon icon={'enter'} /></div>
            </div>
          </form>
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