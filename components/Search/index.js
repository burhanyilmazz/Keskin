import {useState} from 'react';
import {useRouter} from 'next/router'
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import * as Yup from 'yup'
import {useFormik} from 'formik'

import styles from './Search.module.scss';
import { FormInput, Icon } from '../';


export const Search = () => {
  const router = useRouter()
  const { i18n } = useTranslation('common');

  const searchSchema = Yup.object().shape({
    keyword: Yup.string().required(i18n.language === 'tr' ? 'Bu alan boş bırakılamaz.' : 'This field cannot be left blank.'),
  })

  const [search] = useState({
    keyword: '',
  })

  const formik = useFormik({
    initialValues: search,
    validationSchema: searchSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true);
      const pathname = `/${i18n.language}/search`
      router.push({
        pathname,
        query: {keyword: values.keyword},
      })
    },
  })

  return (
    <div className={styles['search']}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className={styles['input']}>
          <div className={styles['input-icon']}><Icon icon={'search'} /></div>
          <FormInput 
            field={i18n.language === 'tr' ? 'Arama' : 'Search'} 
            name={'keyword'} 
            type="text" 
            required={true}
            errorMessage={formik.errors.keyword}
            className={classNames(styles['search-input'], {'is-invalid': formik.touched.keyword && formik.errors.keyword})}
            {...formik.getFieldProps('keyword')}
          />
          <button type='submit' className={styles['input-submit']}><Icon icon={'enter'} /></button>
        </div>
      </form>
    </div>
  )
}