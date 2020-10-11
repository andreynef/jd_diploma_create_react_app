import React from 'react';
import styles from './CardList.module.css';
import {Card} from "./Card/Card";
import loader from '../../../src/assets/images/Gear.gif'

export function CardList({add,images, getClickedImageObj, pressed, setPressed, setLikedId, likePhoto, handleClickHeart, isAuth}) {
  let allCardsArr;
  if (images.length === 0) {
      allCardsArr=<img src={loader} alt={'loader'} className={styles.loader}/>
  } else {
    allCardsArr = images.map((item, i) => {
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
            description={item.alt_description}
            getClickedImageObj={getClickedImageObj}
            pressed={pressed}
            setPressed={setPressed}
            setLikedId={setLikedId}
            handleClickHeart={handleClickHeart}
            isLiked={item.liked_by_user}
            isAuth={isAuth}
          />
      )
    })}

    return (
      <main className={styles.mainContainer}>
        <section className={styles.centralContainer}>
          <ul className={styles.cardList}>
            {allCardsArr}
          </ul>
        </section>
        <button
          className={styles.button}
          type="button"
          onClick={add}
        >
          Загрузить еще
        </button>
      </main>
    )
}
