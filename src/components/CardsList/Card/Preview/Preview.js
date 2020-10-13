import React from 'react';
import styles from './Preview.module.css';


export function Preview({url, handlePreviewClick, id}) {
  return (
    <button className={styles.previewContainerButton} onClick={()=>handlePreviewClick(id)}>
      <img className={styles.previewImg}
           src={url}
           alt='previewPic'
      />
    </button>
  );
}
