import {LinkButton, FormInput} from "../"
import styles from './Newsletter.module.scss';

export const Newsletter = (props) => { 
  
  return (
    <div className="container">
      <div className={styles['newsletter']}>
        <div className={styles['content']}>
          <h3>E-Bülten</h3>
          <p>Kampanya ve duyurulardan haberdar olmak için e-bültene abone olun.</p>
          <FormInput field='E-posta adresiniz'  />
          <span>Üye Olun Butonuna bastığınızda Kişisel verilerin korunması kapsamında aydınlatma metnini kabul etmiş olursunuz.</span>
          <LinkButton text={'Bültene Kaydol'} button transparent/>
        </div>
      </div>
    </div>
  )
}