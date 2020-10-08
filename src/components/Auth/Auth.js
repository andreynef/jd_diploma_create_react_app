// // import React from 'react';
// import Unsplash from 'unsplash-js';
// import {CardList} from "../CardsList/CardList";
//
// const unsplash = new Unsplash({// Создаем экземпляр объекта для доступа к API
//   accesskey: "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw",// accesskey из настроек вашего приложения
//   secret: "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA",// Application Secret из настроек вашего приложения
//   callbackUrl: "https://jsdiploma.nef-an.ru/auth"// Полный адрес страницы авторизации приложения (Redirect URI).
// });
//
// const code = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...
// console.log('code is: aiFVxQDGD3owdh0PVCDQDpLoKFJS13Bs02Ah2QO1y_Q', code)
// window.location.assign("https://jsdiploma.nef-an.ru/")// Отправляем пользователя обратно
// //   if (code) {// Если код передан,...
// //     unsplash.auth.userAuthentication(code)//отправляем запрос на получение токена
// //       .then(res =>
// //         res.json())
// //       .then(json =>
// //       {
// //         unsplash.auth.setBearerToken(json.access_token);// Сохраняем полученный токен
// //         console.log('access token is set:', json.access_token);
// // //Теперь можно сделать что-то от имени пользователя.
// // //       unsplash.photos.likePhoto("kBJEJqWNtNY");// Например, поставить лайк фотографии
// //       });
// //   }
//
// export function Auth() {
//   return
// }
