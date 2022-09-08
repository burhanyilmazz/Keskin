import classNames from 'classnames';
import PropTypes from 'prop-types';

import {FormInput, FormTextarea, LinkButton, FileInput} from "../"
import styles from './ContactForm.module.scss';

export const ContactForm = (props) => { 

  const { className, title, type } = props;

	const handleOnClose = () =>  onClose && onClose();
  
  return (
    <div className={classNames(styles['contact-form'], styles[className])}>
      <h3>{title}</h3>
      <form>
        <div className='form-group'>
          <FormInput field='Adınız Soyadınız'  />
          <FormInput field='E-posta'  />
        </div>
        <div className='form-group'>
          <FormInput field='Telefon' />
          {type === 'contact' && <FormInput field='Konu' /> }
          {type === 'hr' && <FileInput /> }
        </div>
        <div className='form-group'>
          <FormTextarea field='Mesaj' rows={5} />
        </div>
        <p>Gönder Butonuna bastığınızda Kişisel verilerin korunması kapsamında aydınlatma metnini kabul etmiş olursunuz.</p>
        <LinkButton button text='Gönder'/>
      </form>
		</div>
  )
}

ContactForm.propTypes = {
	title: PropTypes.string,
  type: PropTypes.string
};