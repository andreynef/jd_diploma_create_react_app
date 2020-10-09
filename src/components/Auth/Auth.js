import React, {useEffect} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {Link} from "react-router-dom";

export function Auth({setUserId, userId, setUserName, userName, unsplashState, setUnsplashState, setAccessToken, setUserAva}) {

  const getUserProfile =()=> {
    const accessKey= "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw";
    const secret = "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA";
    const callbackUrl="https://jsdiploma.nef-an.ru/auth";

    let unsplash = new Unsplash({
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
        setAccessToken(json.access_token);
        //Теперь можно сделать что-то от имени пользователя. Например, поставить лайк фотографии unsplash.photos.likePhoto("kBJEJqWNtNY");
        unsplash.currentUser.profile()
          .then(toJson)
          .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
            console.log('unsplash.currentUser.profile() -> json is:', json)
            setUserId(json.id);
            setUserName(json.name);
            setUserAva(json.profile_image.small)
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
        <button type={'button'} onClick={getUserProfile}>get token and profile info</button>
      </Link>
    </>
  )
}
