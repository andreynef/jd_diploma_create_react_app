import React from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "../CardsList/CardList";

export function Auth({add,images, getImageObj, pressed, setPressed, setLikedId}) {
  console.log(`Auth component is working...`);
  console.log('btw check unsplash.auth:', unsplash.auth);

  const unsplash = new Unsplash({// Создаем экземпляр объекта для доступа к API
    accesskey: "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw",// accesskey из настроек вашего приложения
    secret: "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA",// Application Secret из настроек вашего приложения
    callbackUrl: "https://jsdiploma.nef-an.ru/auth"// Полный адрес страницы авторизации приложения (Redirect URI).
  });
  console.log(`new unsplash is done`)

  const code = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
  console.log('got code from url:', code)
  if (code) {// Если код передан,...
    console.log(`if code is in process...`)
    unsplash.auth.userAuthentication(code)//отправляем запрос на получение токена
      .then(res =>{
        const response = res.json();
        console.log(`first "then":`, response)
        return response
      })
      .then(json => {
        console.log(`second "then" is in process`)
        unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
        console.log('access token is set:', json.access_token);
        console.log('btw unsplash.auth is:', unsplash.auth);
//Теперь можно сделать что-то от имени пользователя.
//       unsplash.photos.likePhoto("kBJEJqWNtNY");// Например, поставить лайк фотографии
        console.log(`Теперь можно сделать что-то от имени пользователя`)
        // unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
        //   .then(toJson)
        //   .then(json => {//json это ответ в виде массива обьектов
        //     console.log(`${id} is liked`)
        //   })
      });
  }

  const likePhoto = (id) => {
  console.log(`${id} liking is in process...`)
  unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
    .then(toJson)
    .then(json => {//json это ответ в виде массива обьектов
      console.log(`${id} is liked`)
    })
  };

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
