import React from 'react';
import styles from './Card.module.css';
import {Controls} from "./Controls/Controls";
import {Info} from "./TextContent/Info";
import {Preview} from "./Preview/Preview";

export function Card({add,url, created, likes, handleClickHeart, profile, name, ava, description, open, id, handlePreviewClick, pressed, setPressed, setLikedId, likePhoto, isLiked, isAuth, whoIs}) {
  return (
    <div className={styles.card}>
      {whoIs === 'moreButton'
        ?
        <div className={styles.loadMoreContainer} onClick={add}>
          <span className={styles.loadMoreText}>Load more</span>
        </div>
        :
        <>
          <Info created={created} profile={profile} name={name} ava={ava} description={description}/>
          <Preview url={url} handlePreviewClick={handlePreviewClick} id={id}/>
          <Controls likes={likes} handleClickHeart={handleClickHeart} isLiked={isLiked} pressed={pressed} setPressed={setPressed} setLikedId={setLikedId} likePhoto={likePhoto} id={id} isAuth={isAuth}/>
        </>
        }
    </div>
  )
}
