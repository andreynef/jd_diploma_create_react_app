import React, {useEffect, useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "../CardsList/CardList";
import {Link} from "react-router-dom";

export function Auth({add,images, getImageObj, pressed, setPressed, setLikedId, setCode, code, setUserId, userId, setUserName, userName}) {
  // console.log(`code from url:`, codeFromUrl);
  // console.log(`bearerToken from unsplashState:`, unsplash.bearerToken);
  // console.log(`accessKey from unsplashState:`, unsplash.accessKey);
  // console.log(`secret from unsplashState:`, unsplash.secret);
  // useEffect(() => {
  //   }, []);
  // console.log(`setting code in state. CodeState is:`, code)

  // const likePhoto = (id) => {
  //   unsplash.auth.userAuthentication(code)//отправляем запрос на получение токена
  //     .then(toJson)
  //     .then(json => {
  //       unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
  //       console.log('setBearerToken is set to:', json.access_token);
  //       //Теперь можно сделать что-то от имени пользователя. Например, поставить лайк фотографии unsplash.photos.likePhoto("kBJEJqWNtNY");
  //       console.log(`Теперь можно сделать что-то от имени пользователя`)
  //       unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
  //         .then(toJson)
  //         .then(json => {//json это ответ в виде массива обьектов
  //           console.log(`${id} is liked`)
  //         })
  //     });
  //   }

    const getUserProfile =()=> {
      const unsplash = new Unsplash({
        accessKey: "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw",// accesskey из настроек вашего приложения
        secret: "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA",// Application Secret из настроек вашего приложения
        callbackUrl: "https://jsdiploma.nef-an.ru/auth",// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
      });
      const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
      // console.log('unsplash is:', unsplash)
      unsplash.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
        .then(toJson)
        .then(json => {
          unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
          console.log('setBearerToken is setting. It is:', json.access_token);
          //Теперь можно сделать что-то от имени пользователя. Например, поставить лайк фотографии unsplash.photos.likePhoto("kBJEJqWNtNY");
          console.log(`Теперь можно сделать что-то от имени пользователя`)
          // unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
          //   .then(toJson)
          //   .then(json => {//json это ответ в виде массива обьектов
          //     console.log(`${id} is liked`)
          //   })
          unsplash.currentUser.profile()
            .then(toJson)
            .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
              console.log('unsplash.currentUser.profile() -> json is:', json)
              setUserId(json.id);
              console.log('id state is:', userId)
              setUserName(json.name);
              console.log('name state is:', userName)
            });
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
      <button type={'button'} onClick={getUserProfile}>get user profile</button>
    </>
  )
}
