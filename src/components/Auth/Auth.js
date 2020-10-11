import React from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {Link} from "react-router-dom";
import styles from './Auth.module.css';

const accessKey= "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw";
const secret = "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA";
const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "xCCc0l4N7uCUZqW8-2ul9aL-jZdSq5DU5CxoTlvYccU";
// const secret = "bPf1_xm6rpCWU_i3E1xJg26vgFYdbrChRJL93ICuH5k";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "S1Nhql7F6MIMl3zRV2tEmyn_523yixt2QW_nfuz751c";
// const secret = "gRkmQ9LdQDXHw6LnTQPlk67suNqrE_ASY2Vy8JD7nrg";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";


export function Auth({unsplashState, setUnsplashState, setIsAuth}) {

  const getAccessToken =()=> {
    const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
    unsplashState.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
      .then(toJson)
      .then(json => {
        console.log('setBearerToken is:', json.access_token);
        setUnsplashState(new Unsplash({//создать новый стейт Unsplash но уже с кодом юзера
          accessKey: accessKey,// accesskey из настроек вашего приложения
          secret: secret,// Application Secret из настроек вашего приложения
          callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
          bearerToken: json.access_token,//приватный токен юзера
        }));
        console.log('setUnsplashState with token is done');
        setIsAuth(true);
        console.log('setAuth is done');
        // window.location.assign('https://jsdiploma.nef-an.ru/');//перенаправить обратно
      });
    };

  // useEffect(() => {
  //   setTimeout(getAccessToken(), 10000);//componentDidMount
  // }, []);

  return (
      <Link to={'/'}>
          <button className={styles.button} onClick={getAccessToken}>Now you are authorized. Click here to get back to home page </button>
      </Link>
  )
}
