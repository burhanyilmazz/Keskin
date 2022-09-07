import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../"
import styles from './Modal.module.scss';

export const Modal = (props) => { 

  const { className, onClose } = props;

	const handleOnClose = () =>  onClose && onClose();
  
  return (
    <div className={classNames(styles['modal'], styles[className])}>
      <div className={styles['close']} onClick={handleOnClose}><Icon icon='close' /></div>
			<div className={styles['container']}>
				<div className={styles['body']}>
					{ props.children }
				</div>
			</div>
		</div>
  )
}

Modal.propTypes = {
	onClose: PropTypes.func,
};