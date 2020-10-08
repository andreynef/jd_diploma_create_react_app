import React from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "../CardsList/CardList";

export function Auth({add,images, getImageObj, pressed, setPressed, setLikedId}) {
  const likePhoto = (id) => {

    const unsplash = new Unsplash({// Создаем экземпляр объекта для доступа к API
      accesskey: "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw",// accesskey из настроек вашего приложения
      secret: "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA",// Application Secret из настроек вашего приложения
      callbackUrl: "https://jsdiploma.nef-an.ru/auth"// Полный адрес страницы авторизации приложения (Redirect URI).
    });

    const code = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
    console.log('code is:', code)
    if (code) {// Если код передан,...
      unsplash.auth.userAuthentication(code)//отправляем запрос на получение токена
        .then(res =>
          res.json())
        .then(json => {
          unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
          console.log('access token is set:', json.access_token);
//Теперь можно сделать что-то от имени пользователя.
//       unsplash.photos.likePhoto("kBJEJqWNtNY");// Например, поставить лайк фотографии
          console.log(`${id} liking is in process...`)
          unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
            .then(toJson)
            .then(json => {//json это ответ в виде массива обьектов
              console.log(`${id} is liked`)
            })

        });
    }
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
