import PropTypes from 'prop-types';

import styles from './FileInput.module.scss';
import { Icon } from '../';

export const FileInput = (props) => { 
  const { name, onChange, accept, maxFileSize } = props;

  const handleOnChange = (event, index) => {
    const uploadFileSize = (event.target.files[0].size / 1024);
    let file = event.target.files[0];

    if (maxFileSize > uploadFileSize) {
      getBase64(file).then(data =>  onChange && onChange(data, index));
    }
  }
  
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  return (
    <div className={styles['file-input']}>
      <Icon icon={'upload'} />
      <div className={styles['text']}>
        Dosya Seçin <span>(Pdf, Docx, Jpeg, Max 8MB)</span>
      </div>
      <input 
        type='file' 
        name={name} 
        onChange={(event) => handleOnChange(event, index, item)}
        accept={accept}
      />
    </div>
  )
}

FileInput.propTypes = {
	name: PropTypes.string,
  maxFileSize: PropTypes.number,
  accept: PropTypes.string,
  onChange: PropTypes.func,
};
