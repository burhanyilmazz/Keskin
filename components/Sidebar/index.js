import styles from './Sidebar.module.scss';
import { StaticI18nLink } from '../';

export const Sidebar = () => {
  return (
    <aside className={styles['sidebar']}>
      <div className={styles['main']}>
        <div className={styles['main__head']}>
          <h6>Ürün Grupları</h6>
          <p>11 farklı kategoride Ulusal ve Uluslararası binlerce ürüne kolay ulaşma imkanı!</p>
        </div>
        <div className={styles['main__body']}>
          
        </div>
        <div className={styles['main__foot']}>
          <h3>E-Katalog</h3>
          <p>Güncel ürün kataloğumuz için lütfen aşağıdaki butona tıklayınız.</p>
          <button>İndir</button>
        </div>
      </div>
      <div className={styles['nav']}>
        <nav>
          <ul>
            <li>
              <span>Kurumsal</span>
              <ul>
                <li><StaticI18nLink href='/product'>Hakkımızda</StaticI18nLink></li>
                <li><StaticI18nLink href='/product'>İhracat</StaticI18nLink></li>
              </ul>
            </li>
            <li>
              <span>Bayilikler</span>
              <ul>
                <li><StaticI18nLink href='/product'>Hakkımızda</StaticI18nLink></li>
                <li><StaticI18nLink href='/product'>İhracat</StaticI18nLink></li>
              </ul>
            </li>
            <li><StaticI18nLink href='/product'>Blog</StaticI18nLink></li>
            <li><StaticI18nLink href='/product'>Kariyer</StaticI18nLink></li>
            <li><StaticI18nLink href='/product'>İletişim</StaticI18nLink></li>
          </ul>
        </nav>
        <div className={styles['social-media']}>

        </div>
      </div>
    </aside>
  )
}