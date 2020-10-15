import React from 'react';
import styles from './Controls.module.css';
import HeartIconUnpressed from "../../../../assets/images/HeartIconUnpressed.svg";
import HeartIconPressed from "../../../../assets/images/HeartIconPressed.svg";


export function Controls({likes, clickedImageObj,id,isLiked, handleClickHeart, isHeartError}) {

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.likesContainer}>
        <span className={styles.likesValue}>{likes}</span>
        <button className={styles.button} onClick={()=>handleClickHeart(id)}>
          <img src={isLiked? HeartIconPressed : HeartIconUnpressed} alt={'heart'}/>
        </button>
      </div>
        {isHeartError && clickedImageObj.id===id && (
          <div className={styles.errorContainer}>
            <span className={styles.errorValue}>You are not authorized</span>
          </div>
        )}
    </div>
  );
}


