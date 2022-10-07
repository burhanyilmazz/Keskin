import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './FileInput.module.scss';
import { Icon } from '../';

export const FileInput = (props) => { 
  const { name, onChange, accept, maxFileSize, field, value, ...rest } = props;
  const [fileName, setFileName] = useState();

  const handleOnChange = (event) => {
    const uploadFileSize = (event.target.files[0].size / 1024);
    const file = event.target.files[0];

    setFileName(file.name)

    if (maxFileSize > uploadFileSize) onChange && onChange(event);
  }
  
  return (
    <div className={styles['file-input']}>
      <div className={styles['wrap']}>
        <Icon icon={'upload'} />
        <div className={styles['text']}>
          { !fileName && <>{field} <span>(Pdf, Docx, Jpeg, Max 8MB)</span></> } {fileName}
        </div>
        <input 
          type='file' 
          name={name} 
          onChange={(event) => handleOnChange(event)}
          accept={accept}
          defaultValue={value}
          {...rest}
        />
      </div>
    </div>
  )
}

FileInput.propTypes = {
	name: PropTypes.string,
  maxFileSize: PropTypes.number,
  accept: PropTypes.string,
  onChange: PropTypes.func,
};

FileInput.defaultProps = {
	maxFileSize: 9765625
};
