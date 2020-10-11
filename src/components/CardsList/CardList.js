import React from 'react';
import styles from './CardList.module.css';
import {Card} from "./Card/Card";
import loader from '../../../src/assets/images/Gear.gif'

export function CardList({add,images, setOpenedImageObj, pressed, setPressed, setLikedId, likePhoto, handlePressHeart, isAuth}) {
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
            setOpenedImageObj={setOpenedImageObj}
            pressed={pressed}
            setPressed={setPressed}
            setLikedId={setLikedId}
            handlePressHeart={handlePressHeart}
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
