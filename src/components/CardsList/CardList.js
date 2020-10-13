import React from 'react';
import styles from './CardList.module.css';
import {Card} from "./Card/Card";
import loader from '../../../src/assets/images/Gear.gif'

export function CardList({add,images, handlePreviewClick, pressed, setPressed, setLikedId, likePhoto, handleClickHeart, isAuth, setIsOpen}) {
  const loadMoreBtn = images.length ? <Card add={add} whoIs={'moreButton'}/> : null;
  let cardList;

  if (!images.length) {
    cardList=<img src={loader} alt={'loader'} className={styles.loader}/>
  } else {
    cardList = images.map((item, i) => {
      return (
          <Card
            key={item.id}
            id={item.id}
            created={item.created_at}
            name={item.user.first_name}
            profile={item.user.links.html}
            likes={item.likes}
            url={item.urls.thumb}
            ava={item.user.profile_image.small}
            handlePreviewClick={handlePreviewClick}
            handleClickHeart={handleClickHeart}
            isLiked={item.liked_by_user}
            isAuth={isAuth}
            setIsOpen={setIsOpen}
          />
      )
    })}

    return (
      <main className={styles.mainContainer}>
        <section className={styles.centralContainer}>
          <ul className={styles.cardList}>
            {cardList}
            {loadMoreBtn}
          </ul>
        </section>
        {/*<button*/}
        {/*  className={styles.button}*/}
        {/*  type="button"*/}
        {/*  onClick={add}*/}
        {/*>*/}
        {/*  Загрузить еще*/}
        {/*</button>*/}
      </main>
    )
}
