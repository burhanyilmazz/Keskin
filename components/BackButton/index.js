import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'

import {Icon} from "../"
import styles from './BackButton.module.scss';

export const BackButton = () => { 
  const { i18n } = useTranslation('common')
  const router = useRouter()
  
  return (
    <div className={styles['back-button']} onClick={() => router.back()}>
      <Icon icon={'back'} />
      <span>{i18n.language === 'tr' ? 'Geri' : 'Back'}</span>
    </div>
  )
}