import React from 'react';
import styles from './CardPage.module.css';
import {Link} from "react-router-dom";
import cross1 from '../../assets/images/cross1.svg';
import cross2 from '../../assets/images/cross2.svg';
import HeartIconPressed from "../../assets/images/HeartIconPressed.svg";
import HeartIconUnpressed from "../../assets/images/HeartIconUnpressed.svg";

export function CardPage({openedImage, open, pressed, likePhoto, setLikedId, likedId, handlePressHeart}) {
  const date = openedImage.created_at.slice(0,9);

  return (
    <div className={styles.cardPage}>
      <div className={styles.centralContainer}>
        <div className={styles.imageContainer}>
          <img
            src={openedImage.urls.regular}
            alt={openedImage.alt_description}
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.metaContainer}>
            <div className={styles.authorContainer}>
              <img
                className={styles.avatarImg}
                src={openedImage.user.profile_image.small}
                alt="avatar"
              />
              <a className={styles.avatarText} href={openedImage.user.links.html}>{openedImage.user.first_name}</a>
            </div>
            <span className={styles.createdAt}>{date}</span>
          </div>
          <div className={styles.likesContainer}>
            <span className={styles.likesValue}>{openedImage.likes}</span>
            <button className={styles.button} onClick={()=>handlePressHeart(openedImage.id)}>
              <img src={pressed? HeartIconPressed: HeartIconUnpressed} alt={'heart'}/>
            </button>
          </div>
        </div>
        <Link className={styles.exitButton} to={'/'} >
          <img src={cross1} alt={'exit'} className={styles.exitImgBlack}/>
          <img src={cross2} alt={'exit'} className={styles.exitImgWhite}/>
        </Link>
      </div>
    </div>
  )
}
