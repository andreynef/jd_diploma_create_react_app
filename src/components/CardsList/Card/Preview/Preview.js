import React from 'react';
import styles from './Preview.module.css';


export function Preview({url}) {
  return (
    <div className={styles.previewContainer}>
      <img className={styles.previewImg}
           src={url}
           alt='previewPic'
      />
    </div>
  );
}
