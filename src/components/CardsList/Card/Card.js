import React from 'react';
import styles from './Card.module.css';
import {Controls} from "./Controls/Controls";
import {Info} from "./TextContent/Info";
import {Preview} from "./Preview/Preview";
import {Link} from "react-router-dom";

export function Card({add,url, created, likes, handleClickHeart, profile, name, ava, description, open, id, getClickedImageObj, pressed, setPressed, setLikedId, likePhoto, isLiked, isAuth, whoIs}) {
  return (
    <div className={styles.card}>
      {whoIs === 'moreButton'
        ?
        <div className={styles.loadMoreContainer}>
          <span onClick={add} className={styles.loadMoreText}>Load more</span>
        </div>
        :
        <>
          <Info created={created} profile={profile} name={name} ava={ava} description={description}/>
          <Link to={'/cardpage'} onClick={()=>getClickedImageObj(id)} >
            <Preview url={url}/>
          </Link>
          <Controls likes={likes} handleClickHeart={handleClickHeart} isLiked={isLiked} pressed={pressed} setPressed={setPressed} setLikedId={setLikedId} likePhoto={likePhoto} id={id} isAuth={isAuth}/>
        </>
        }
    </div>
  )
}
