import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from './Auth.module.css';
import Unsplash, {toJson} from "unsplash-js";

export function Auth({unsplashState, setUnsplashState}) {

  const getAccessTokenFromUrlCode =()=> {
    if (unsplashState._bearerToken===null) {//если в стейте нет ключа
      console.log('check bearer token in state:', unsplashState._bearerToken);
      const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
    unsplashState.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
      .then(toJson)
      .then(json => {
        console.log('json answer from url is:', json);
        setUnsplashState(new Unsplash({//создать новый стейт Unsplash но уже с кодом юзера. Сработает только при завершении ф контейнера.
          accessKey: unsplashState.users._accessKey,// accesskey из настроек вашего приложения
          secret: unsplashState._secret,// Application Secret из настроек вашего приложения
          callbackUrl: unsplashState.users._callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
          bearerToken: json.access_token,//приватный токен юзера
        }));
        console.log('setUnsplashState with accessToken from getAccessTokenFromUrlCode is done');
        localStorage.setItem('accessTokenForUnsplash', JSON.stringify(json.access_token));//соханить код в локал
        console.log('set to local from getAccessTokenFromUrl is done');
      });
    }
  };

  const goToRoot =()=>{
    if (unsplashState._bearerToken) {//если в стейте есть ключ
      window.location.assign('https://jsdiploma.nef-an.ru/');//перенаправить обратно
    } else {//иначе с вещами на вылет.
        console.log('go to rood is skipped = no token yet');
      }
    }

  useEffect(() => {
    goToRoot();//выполнился вхолостую ибо нет ключа в стейте. Но далее, когда выполнится след ф = обновится unsplashState = выполнится заново и сработает.
    setTimeout(getAccessTokenFromUrlCode,10000);//выполнится при первом монтаже и изменит unsplashState.
  }, [unsplashState]);//= componentDidMount, componentWillUpdate. Выполняется 1 раз при монтаже и кажд раз при изменении []. Если в [] пусто то просто 1 раз при монтаже.

  return (
    <>
      <Link to={'/'}>
          <button className={styles.button} onClick={getAccessTokenFromUrlCode}>Now you are authorized. Click here to get back to home page </button>
      </Link>
    </>
  )
}
