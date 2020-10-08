import React from 'react';
import styles from './Card.module.css';
import {Controls} from "./Controls/Controls";
import {Info} from "./TextContent/Info";
import {Preview} from "./Preview/Preview";
import {Link} from "react-router-dom";

export function Card({add,url, created, likes, profile, name, ava, description, open, id, getImageObj, pressed, setPressed, setLikedId}) {
  return (
    <div className={styles.card}>
      <Info created={created} profile={profile} name={name} ava={ava} description={description}/>
      <Link to={'/cardpage'} onClick={()=> getImageObj(id)} >
        <Preview url={url} />
      </Link>
      <Controls likes={likes} pressed={pressed} setPressed={setPressed} setLikedId={setLikedId}/>
    </div>
  );
}
