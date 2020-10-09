import React, {useEffect, useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "../CardsList/CardList";
import {Link} from "react-router-dom";

export function Auth({add,images, getImageObj, pressed, setPressed, setLikedId, likePhoto, code, setUserId, userId, setUserName, userName, setUnsplashState, setAccessToken}) {

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
        console.log('setBearerToken is setting. It is:', json.access_token);
        unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
        setAccessToken(json.access_token);
        //Теперь можно сделать что-то от имени пользователя. Например, поставить лайк фотографии unsplash.photos.likePhoto("kBJEJqWNtNY");
        console.log(`Теперь можно сделать что-то от имени пользователя`)
        unsplash.currentUser.profile()
          .then(toJson)
          .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
            console.log('unsplash.currentUser.profile() -> json is:', json)
            setUserId(json.id);
            setUserName(json.name);
          });
        // window.location.assign('https://jsdiploma.nef-an.ru/');
      });
    }
  useEffect(() => {
    getUserProfile()
  }, []);

  return (
    <>
      <Link to={'/'}>
          <h1 style={{margin:'0 auto'}}>Now you are authorized. Click me to go back to home page </h1>
      </Link>
    </>
  )
}
