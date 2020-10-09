import React, {useEffect} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "../CardsList/CardList";
import {Link} from "react-router-dom";

export function Auth({add,images, getImageObj, pressed, setPressed, setLikedId, unsplash, setCode, code}) {
  const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
  console.log(`code from url:`, codeFromUrl);
  console.log(`bearerToken from unsplashState:`, unsplash.bearerToken);
  console.log(`accessKey from unsplashState:`, unsplash.accessKey);
  console.log(`secret from unsplashState:`, unsplash.secret);
  useEffect(() => {
    setCode(codeFromUrl);  }, []);
  console.log(`setting code in state. CodeState is:`, code)

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

    const getUserProfile =()=> {
      unsplash.currentUser.profile()
        .then(toJson)
        .then(json => {
          console.log('unsplash.currentUser.profile() -> json is:', json)
        });
    }

  return (
    <>
      {/*<CardList*/}
      {/*  add={add}*/}
      {/*  images={images}*/}
      {/*  getImageObj={getImageObj}*/}
      {/*  pressed={pressed}*/}
      {/*  setPressed={setPressed}*/}
      {/*  setLikedId={setLikedId}*/}
      {/*  likePhoto={likePhoto}*/}
      {/*/>*/}
<h1>now you are authorized</h1>
      <Link to={'/'}>
        click me to go back to home page
      </Link>
      <button type={'button'} onClick={()=>getUserProfile}>get user profile</button>
    </>
  )
}
