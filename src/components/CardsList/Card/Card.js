import React from 'react';
import styles from './Card.module.css';
import {Controls} from "./Controls/Controls";
import {Info} from "./TextContent/Info";
import {Preview} from "./Preview/Preview";
import {Link} from "react-router-dom";

export function Card({add,url, created, likes, handlePressHeart, profile, name, ava, description, open, id, setOpenedImageObj, pressed, setPressed, setLikedId, likePhoto, isLiked, isAuth}) {
  return (
    <div className={styles.card}>
      <Info created={created} profile={profile} name={name} ava={ava} description={description}/>
      <Link to={'/cardpage'} onClick={()=>setOpenedImageObj(id)} >
        <Preview url={url}/>
      </Link>
      <Controls likes={likes} handlePressHeart={handlePressHeart} isLiked={isLiked} pressed={pressed} setPressed={setPressed} setLikedId={setLikedId} likePhoto={likePhoto} id={id} isAuth={isAuth}/>
    </div>
  );
}
