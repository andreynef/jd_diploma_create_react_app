import React from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "../CardsList/CardList";

export function Auth({add,images, getImageObj, pressed, setPressed, setLikedId, unsplash, setCode, code}) {
  const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
  setCode(codeFromUrl);
  console.log(`setting code in state:`, code)

  const likePhoto = (id) => {
    unsplash.auth.userAuthentication(code)//отправляем запрос на получение токена
      .then(toJson)
      .then(json => {
        unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
        console.log('setBearerToken is set to:', json.access_token);
        //Теперь можно сделать что-то от имени пользователя. Например, поставить лайк фотографии unsplash.photos.likePhoto("kBJEJqWNtNY");
        console.log(`Теперь можно сделать что-то от имени пользователя`)
        unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
          .then(toJson)
          .then(json => {//json это ответ в виде массива обьектов
            console.log(`${id} is liked`)
          })
      });
    }

  return (
    <>
      <CardList
        add={add}
        images={images}
        getImageObj={getImageObj}
        pressed={pressed}
        setPressed={setPressed}
        setLikedId={setLikedId}
        likePhoto={likePhoto}
      />

    </>
  )
}
