import React from 'react';
import styles from './CardPage.module.css';
import {Link} from "react-router-dom";
import cross1 from '../../assets/images/cross1.svg';
import cross2 from '../../assets/images/cross2.svg';
import HeartIconPressed from "../../assets/images/HeartIconPressed.svg";
import HeartIconUnpressed from "../../assets/images/HeartIconUnpressed.svg";

export function CardPage({handleClickHeart, clickedImageObj, isOpen}) {

  const date = clickedImageObj.created_at.slice(0,10);//срезать лишние цифры из даты
  console.log('inside CardPage. Gonna return jsx...clickedImageObj is', clickedImageObj);


  return (
    <div className={styles.cardPage}>
      {isOpen && (
        <div className={styles.centralContainer}>
          <div className={styles.imageContainer}>
            <img
              src={clickedImageObj.urls.regular}
              alt={clickedImageObj.alt_description}
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.metaContainer}>
              <div className={styles.authorContainer}>
                <img
                  className={styles.avatarImg}
                  src={clickedImageObj.user.profile_image.small}
                  alt="avatar"
                />
                <a className={styles.avatarText} href={clickedImageObj.user.links.html}>{clickedImageObj.user.first_name}</a>
              </div>
              <span className={styles.createdAt}>{date}</span>
            </div>
            <div className={styles.likesContainer}>
              <span className={styles.likesValue}>{clickedImageObj.likes}</span>
              <button className={styles.button} onClick={handleClickHeart(clickedImageObj.id)}>
                <img src={clickedImageObj.liked_by_user? HeartIconPressed: HeartIconUnpressed} alt={'heart'}/>
              </button>
            </div>
          </div>
          <Link className={styles.exitButton} to={'/'} >
            <img src={cross1} alt={'exit'} className={styles.exitImgBlack}/>
            <img src={cross2} alt={'exit'} className={styles.exitImgWhite}/>
          </Link>
        </div>
      )}

    </div>
  )
}
