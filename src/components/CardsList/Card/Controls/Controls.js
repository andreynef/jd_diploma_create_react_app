import React from 'react';
import styles from './Controls.module.css';
import HeartIconUnpressed from "../../../../assets/images/HeartIconUnpressed.svg";
import HeartIconPressed from "../../../../assets/images/HeartIconPressed.svg";


export function Controls({likes, pressed, setPressed, setLikedId, likePhoto, id, isLiked, handlePressHeart}) {

  return (
    <div className={styles.controls}>
      <div className={styles.likesCounter}>
        <span className={styles.likesValue}>{likes}</span>
        <button className={styles.button} onClick={()=>handlePressHeart(id)}>
          <img src={isLiked? HeartIconPressed : HeartIconUnpressed} alt={'heart'}/>
        </button>
      </div>
    </div>
  );
}


