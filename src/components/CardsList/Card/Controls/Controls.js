import React from 'react';
import styles from './Controls.module.css';
import {LikesCounter} from "./LikesCounter/LikesCounter";


export function Controls({likes, pressed, setPressed, setLikedId, likePhoto, id}) {
  return (
    <div className={styles.controls}>
      <LikesCounter likes={likes} pressed={pressed} setPressed={setPressed} setLikedId={setLikedId} likePhoto={likePhoto} id={id}/>
    </div>
  );
}


