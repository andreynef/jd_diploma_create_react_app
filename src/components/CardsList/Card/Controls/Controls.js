import React from 'react';
import styles from './Controls.module.css';
import {LikesCounter} from "./LikesCounter/LikesCounter";


export function Controls({likes, pressed, setPressed, setLikedId, setChosenId, id}) {
  return (
    <div className={styles.controls}>
      <LikesCounter likes={likes} pressed={pressed} setPressed={setPressed} setLikedId={setLikedId} setChosenId={setChosenId} id={id}/>
    </div>
  );
}


