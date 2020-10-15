import React from 'react';
import styles from './PlaceholderCardPage.module.css';
import cross2 from '../../assets/images/cross2.svg';

export function PlaceholderCardPage() {

  return (
        <div className={styles.cardPage}>
          <div className={styles.centralContainer}>
              <div className={styles.imageContainer}/>
              <div className={styles.infoContainer}>
                <div className={styles.metaContainer}>
                  <div className={styles.authorContainer}>
                    <div className={styles.avatarImg}/>
                  </div>
                </div>
                <div className={styles.likesContainer}>
                </div>
              </div>
            {/*<button onClick={()=>setIsCardOpened(false)} className={styles.exitButton}>*/}
            {/*  <img src={cross2} alt={'exit'} className={styles.exitImgWhite} />*/}
            {/*</button>*/}
          </div>
      </div>
  )
}
