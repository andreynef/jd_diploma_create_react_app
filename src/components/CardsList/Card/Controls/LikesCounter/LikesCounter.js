import React from 'react';
import styles from './LikesCounter.module.css';
import HeartIconUnpressed from "../../../../../assets/images/HeartIconUnpressed.svg";

export function LikesCounter({likes, pressed, setLikedId, likePhoto, id}) {

const exterminate = ()=>{
  likePhoto(id);
}

  return (
    <div className={styles.likesCounter}>
      <span className={styles.likesValue}>{likes}</span>
      <button className={styles.button} onClick={exterminate}>
        <img src={HeartIconUnpressed} alt={'heart'}/>
      </button>
    </div>
  );
}
