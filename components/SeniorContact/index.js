import classNames from 'classnames';
import PropTypes from 'prop-types';

import {LinkButton} from "../"
import styles from './SeniorContact.module.scss';

export const SeniorContact = (props) => { 
  const { onClick } = props;

  const handleOnClickModal = () => {
    onClick && onClick();
  }
  
  return (
    <div className={styles['senior-contact']}>
      <div className={classNames('container', styles['container'])}>
        <div className={styles['text']}>
          <h4>Uzmanına Sorun</h4>
          <p>Ürünlerimizle ilgili daha fazla bilgi için lütfen bizimle iletişime geçin.</p>
        </div>
        <div className={styles['button']}>
          <LinkButton button text='İletişim' onClick={handleOnClickModal} />
        </div>
      </div>
    </div>
  )
}

SeniorContact.propTypes = {
	onClick: PropTypes.func,
};