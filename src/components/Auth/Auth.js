import React, {useEffect} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {Link} from "react-router-dom";

export function Auth({setUserId, userId, setUserName, userName, unsplashState, setUnsplashState, setAccessToken, setUserAva}) {

  const getUserProfile =()=> {
    const accessKey= "xCCc0l4N7uCUZqW8-2ul9aL-jZdSq5DU5CxoTlvYccU";
    const secret = "bPf1_xm6rpCWU_i3E1xJg26vgFYdbrChRJL93ICuH5k";
    const callbackUrl="https://jsdiploma.nef-an.ru/auth";

    const unsplash = new Unsplash({
      accessKey: accessKey,// accesskey из настроек вашего приложения
      secret: secret,// Application Secret из настроек вашего приложения
      callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
    });

    const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
    unsplash.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
      .then(toJson)
      .then(json => {
        console.log('setBearerToken is setting. It is:', json.access_token);
        unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
        setUnsplashState(
          new Unsplash({
          accessKey: accessKey,// accesskey из настроек вашего приложения
          secret: secret,// Application Secret из настроек вашего приложения
          callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
          bearerToken: json.access_token,
        }));
        //Теперь можно сделать что-то от имени пользователя. Например, поставить лайк фотографии unsplash.photos.likePhoto("kBJEJqWNtNY");
        unsplash.currentUser.profile()
          .then(toJson)
          .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
            console.log('unsplash.currentUser.profile() -> json is:', json)
            console.log('profile_image.small is:', json.profile_image.small)
            const ava = json.profile_image.small;
            console.log('ava:', ava)
            console.log('ava:', ava)
            setUserId(json.id);
            setUserName(json.name);
            setUserAva(ava);
          });
        // window.location.assign('https://jsdiploma.nef-an.ru/');
      });
    }
  // useEffect(() => {
  //   // getUserProfile()//componentDidMount
  // }, []);

  return (
    <>
      <Link to={'/'}>
          <h1 style={{margin:'0 auto'}}>Now you are authorized. Click here to get back to home page </h1>
      </Link>
        <button type={'button'} onClick={getUserProfile}>get token and profile info</button>
    </>
  )
}
