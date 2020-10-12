import React, {useEffect, useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "./components/CardsList/CardList";
import {Route, Switch} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {CardPage} from "./components/CardPage/CardPage";
import {Auth} from "./components/Auth/Auth";
// import { clone } from "ramda";
// const fastClone = require('rfdc')(); // Returns the deep copy function

// 'xGHYVNYkr6A' id foto to like

// const accessKey= "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw";
// const secret = "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";

const accessKey= "xCCc0l4N7uCUZqW8-2ul9aL-jZdSq5DU5CxoTlvYccU";
const secret = "bPf1_xm6rpCWU_i3E1xJg26vgFYdbrChRJL93ICuH5k";
const callbackUrl="https://jsdiploma.nef-an.ru/auth";
// const accessToken = JSON.parse(localStorage.getItem('accessTokenForUnsplash'));//если есть в локале то берем оттуда иначе undefined

// const accessKey= "S1Nhql7F6MIMl3zRV2tEmyn_523yixt2QW_nfuz751c";
// const secret = "gRkmQ9LdQDXHw6LnTQPlk67suNqrE_ASY2Vy8JD7nrg";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "Awhepytu0JPZujZW7f97BMriVV8gKVO9_i2cM82Z1YU";
// const secret = "6LfA1BzLZz3Z2_Co9uWJJB4_fkpZvXZAUCxdQEAHP5o";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";


const App = () => {
  // const [bearerToken, setBearerToken] = useState(JSON.parse(localStorage.getItem('accessTokenForUnsplash')));//берем из локала. Если нет то устанавливается null.
  const [unsplashState, setUnsplashState]= useState(new Unsplash({
    accessKey: accessKey,// accesskey из настроек вашего приложения
    secret: secret,// Application Secret из настроек вашего приложения
    callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
    bearerToken: JSON.parse(localStorage.getItem('accessTokenForUnsplash')),//берем из локала. Если нет то устанавливается null.
  }));
  const [images, setImages] = useState([]);//стейт списка фоток
  const [clickedImageObj, setClickedImageObj] = useState({});
  const [page, setPage] = useState(1);
  const amountOnPage = 5;
  const [isAuth, setIsAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  const getAccessTokenFromUrlCode =()=> {
    console.log('getting code from url...');
    const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...

    if (codeFromUrl) {//если код в строке есть.
      console.log('check codeFromUrl:', codeFromUrl);
      unsplashState.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
        .then(toJson)
        .then(json => {
          console.log('json answer from url is:', json);
          // setAccessTokenToLocalStorage();
          // console.log('set to local from getAccessTokenFromUrl is done');
          setUnsplashState(new Unsplash({//создать новый стейт Unsplash но уже с кодом юзера. Сработает только при завершении ф контейнера.
            accessKey: unsplashState.users._accessKey,// accesskey из настроек вашего приложения
            secret: unsplashState._secret,// Application Secret из настроек вашего приложения
            callbackUrl: unsplashState.users._callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
            bearerToken: json.access_token,//приватный токен юзера
          }));
          console.log('setUnsplashState with bearerToken from getAccessTokenFromUrlCode is done');
        })
      }else{
        console.log('getting Code is skipped. codeFromUrl is:',codeFromUrl);//return false
      }
  }

  const checkLogs =()=> {
     console.log('unsplashState is:', unsplashState);
     console.log('images State is:', images);
     console.log('isAuth is:', isAuth);
     console.log('userProfile is:', userProfile);
     console.log('localStorage.accessTokenForUnsplash is:', localStorage.accessTokenForUnsplash);
     console.log('unsplashState._bearerToken is:', unsplashState._bearerToken);
  };

  const getUserProfile =()=> {
    console.log('getting UserProfile...');
    console.log('getting UserProfile...btw unsplashState is:', unsplashState);
    if (unsplashState._bearerToken) {//если в стейте есть ключ
      console.log('your app already has tokenAccess key! Sending request...');
      unsplashState.currentUser.profile()
        .then(toJson)
        .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
          console.log('json profile answer is:', json);
          setUserProfile(json);
          console.log('setting UserProfile to state is done');
          setIsAuth(true);
          console.log('setIsAuth from getUserProfile is done');
        });
    }
    else {//иначе с вещами на вылет.
      console.log('getting UserProfile from server is skipped = no key in state');
    }
  };

  const setAccessTokenToLocalStorage= (accessToken) => {
    localStorage.setItem('accessTokenForUnsplash', JSON.stringify(accessToken));
  };

  const deleteAccessTokenFromLocalStorage= () => {
    localStorage.removeItem('accessTokenForUnsplash');
  };

  const toLogout= () => {
    setIsAuth(false);
    deleteAccessTokenFromLocalStorage();
  };

  const goToAuthorizePage=()=>{
    const authenticationUrl = unsplashState.auth.getAuthenticationUrl([// Генерируем адрес страницы аутентификации на unsplash.com
      "public",// и указываем требуемые разрешения (permissions)
      "write_likes",
    ]);
    window.location.assign(authenticationUrl);// Отправляем пользователя на авторизацию сайта Unsplash а потом он пепенаправит пользователя на - callbackUrl: "https://jsdiploma.nef-an.ru/auth"
  };

  const goToRoot = ()=>{
    console.log('going to root...')
    console.log('going to root...checking key in state:', unsplashState.users._bearerToken)
    if (unsplashState.users._bearerToken!==null||undefined){// = в перв раз false тк при первоначальном рендере устанавливается на null. Второй раз будет true тк будет установлен ключ. UseEffect.
      window.location.assign('https://jsdiploma.nef-an.ru');// Отправляем пользователя обратно на гл стр.
    }else{
      console.log('going to root is skipped. BearerToken in UnsplashState is null or undefined')
    }
  }

  const getFirstTenPhotos = ()=>{
    console.log('getting 10 photos...')
    if (images.length === 0) {//когда обновится unsplashState (добавится ключ), то он перезапустится (UseEffect) а нам 2й раз загружать фотки в стейт не надобно.
      unsplashState.photos.listPhotos(page, amountOnPage, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
        .then(toJson)
        .then(json => {//json это ответ в виде массива обьектов
          setImages([...json]);//установка нов стейта списка фоток (после этой ф).
        });
    }else {
      console.log('getting 10 photos is skipped. images.length is:', images.length)
    }

  };

  const addPhotos = () => {
    unsplashState.photos.listPhotos(page+1, amountOnPage, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов в количестве указанном в переменной amountOfItemsOnPage.
        const newImagesArr = [...images, ...json];//создаем новый массив добавляя к старым новые фотки.
        // const newCleanArr = [...new Set(newDirtyArr)];//избавляемся от дублирования элементов. ES6. Альтернатива Array.from(new Set (newDirtyArr))
        // const newCleanArr2 = newDirtyArr.filter((item,index)=>newDirtyArr.indexOf(item===index));//способ 2 через filter
        // const newCleanArr3 = newDirtyArr.reduce((unique,item)=>unique.includes((item) ? unique:[...unique, item], []));//способ 3 через reduce
        setImages(newImagesArr);//обновляем стейт списка картинок.
      });
    setPage(page + 1);//на последок сохраняем стейт последней запрашиваемой страницы.
  };

  const getClickedImageObj = (id) => {//повешен на preview
    const clickedImageObj = images.find(item => item.id === id);//найти итем с нужным айди в стейте
    setClickedImageObj(clickedImageObj);//установить стейт открытой картинки, кот потом будет передавать всю инфу при детальном просмотре.
    setOpen(true);//установить стейт булинь статуса открытости картинки
      console.log(`setOpen is done`);
  };

  const likePhotoRequest =(id)=> {
    unsplashState.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта {photo:{}, user:{}}
      })
  };

  const unlikePhotoRequest =(id)=> {
    unsplashState.photos.unlikePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта {photo:{}, user:{}}
      })
  };

  const handleClickHeart = (id) => {
    const clickedImageObj = images.find(item => item.id === id);//найти итем с нужным айди в стейте
    const clickedImageLikes = clickedImageObj.likes;//вытащить число лайков из обьекта для дальнейшего их изменения ниже.

    if (clickedImageObj.liked_by_user === false) {//если у выбранного итема стоит like=false...
      likePhotoRequest(id);//...то запрос на сервер на лайк
      const filteredImages = images.filter(item =>//создать копию стейта списка изменяя нужные данные у одного выбранного элемента
        item.id === id
          ? (item.liked_by_user=true, item.likes=clickedImageLikes+1)
          : item
      );
      setImages(filteredImages);//установить нов фильтрованый список с измененным итемом.
    } else {//иначе, тобишь true...
      unlikePhotoRequest(id);//...запрос на сервер на анлайк
      const filteredImages = images.filter(item =>//создать копию стейта списка изменяя нужные данные у одного выбранного элемента
        item.id === id
          ? (item.liked_by_user=false, item.likes=clickedImageLikes-1)
          : item
      );
      setImages(filteredImages);//установить нов фильтрованый список с измененным итемом.
    };
  };

  const firstLoad=()=>{

  };

  const secondLoad=()=>{

  };


  useEffect(() => {
    // firstLoad();//(1.false. 2.true)
    // secondLoad();//(1.false. 2.true)
    getUserProfile();//(1.false. 2.true) сначала unsplashState без ключа. Сработает вхолостую. (Внутри имеется проверка на наличие ключа). Когда из ф авторизации (getAccessTokenFromUrlCode) установится новый unsplashState то эта ф перезапустится.
    getFirstTenPhotos();//(1.true 2.false) загрузит первые фотки, независимо от ключа ибо unsplashState хоть урезанный но есть.
    getAccessTokenFromUrlCode();//(1.false 2.true).
    goToRoot();//(1.false. 2.true) выполнился вхолостую ибо нет ключа в стейте (устанавливается на null при первоначальном рендере). Но далее, когда выполнится обновится unsplashState = выполнится заново и сработает.
  }, [unsplashState]);//= componentDidMount, componentWillUpdate. Выполняется 1 раз при монтаже и кажд раз при изменении []. Если в [] пусто то просто 1 раз при монтаже.

  return (
    <>
      <Header
        goToAuthorizePage={goToAuthorizePage}
        checkLogs={checkLogs}
        toLogout={toLogout}
        isAuth={isAuth}
        userProfile={userProfile}
      />
      <Switch>{/*рендерится в зависимости от Route path*/}
        <Route exact path={'/'}
               component={() =>
                 <CardList
                   add={addPhotos}
                   handleClickHeart={handleClickHeart}
                   images={images}
                   getClickedImageObj={getClickedImageObj}
                   isAuth={isAuth}
                 />}
        />
        <Route exact path={'/auth'} component={() => <Auth unsplashState={unsplashState}/>}/>
        <Route exact path={'/cardpage'}
               component={() =>
                 <CardPage
                   clickedImageObj={clickedImageObj}
                   open={open}
                   handleClickHeart={handleClickHeart}
                   images={images}
                 />
               }
        />
      </Switch>
      {isAuth && (
        <Footer/>
      )}
    </>
  );
}




// <InfiniteScroll
//   dataLength={images.length}
//   next={fetchImages}
//   hasMore={true}
//   loader={<p>Loading...</p>}
// >
// </InfiniteScroll>


// componentDidMount = ()=>{//заводской метод, срабатывающий после метода render и указывающий что именно сделать после изначальной отрисовки.
//   this.setState({// установить состояние при условии
//     items: localStorage.commentItems //есть ли запись в локале?
//     ? JSON.parse(localStorage.getItem('commentItems'))// считать массив в JSON формате('text','text') из localeStorage а если его там нет то просто установить пустой массив
//     : this.state.items//если нет, то просто оставить как есть. Можно написать просто items вместо this.state.items.
//   })
// }
//
// updateLocalStorage(newSet) {
//   localStorage.setItem('commentItems', JSON.stringify(newSet))
// }
//
// handleChange(event) {//при любом изменении полей идет обновление состояния
//   const objKey = event.target.name === 'js-textContent' ? 'formText' : 'formName';//условие определяющее какой ключ менять
//   const targetValue = event.target.value// какую инфу записывать в значение
//   this.setState({//обновить состояние с добавлением изменений
// 		[objKey]: targetValue,
//   });
// }

// handleSubmit(event) {
//   event.preventDefault();//сброс отправки формы и открытия дефолтной нов страницы
//   const itemsArr = this.state.items;//считываем состояние базы
// 	const submittedName = this.state.formName;//считываем данные на отправку из базы
// 	const submittedText = this.state.formText;//считываем данные на отправку из базы
//   const submittedDate = new Date().toLocaleString('ru');//определяем нынешнее время
//   const newItem = {//создаем объект с этими свежими данными
//     name: submittedName,
//     text: submittedText,
//     date: submittedDate,
//   };
//   itemsArr.push(newItem);//засовываем этот новый объект в общее состояние (в конец)
//   this.setState(itemsArr);//устанавливаем новое состояние базы
//   this.updateLocalStorage(itemsArr); //записываем свежий массив в локал в формате('text','text'), тобишь в формате JSON
// 	this.setState({//обновляем состояние на пустые поля
//     formName:'',
//     formText:'',
//     formDate:''
//   });
// }

//   addToList() {
//     this.setState(prevState => ({
//         list: prevState.list.concat(this.state.text),
//         text: ''
//     }))
// }

// removeItem(item) {
//   const item = getItem(this.state.list, item.id) // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
//   const newlist = [].concat(list) // Clone array with concat or slice(0)
//   newlist.splice(item.index, 1);
//   this.setState({list: newlist});
// }

// handleDelete = chosenItem => {//атрибут приходит с кнопки удалить
//   let itemsArr = this.state.items;//считываем состояние
//   itemsArr.splice(chosenItem, 1);//удаляем выбранный итем методом массива splice(начиная с chosenItem в количестве 1 шт)
//   this.setState({items: itemsArr});//обновляем состояние
//   this.updateLocalStorage(itemsArr); //записываем массив в локал в формате('text','text'), тобишь в формате JSON
//
//   arr.forEach((item,index) => {//перебирается существующий массив и
//     if(item.name === '7') {//если в элементе(обьект) есть св-во с этим значением
//       arr.splice(index,1);//то у себя же и удалить этот элемент(обьект)
//     }
//   });
// };


export default App

// axios
//   .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`)
//   .then(res=>setImages([...images, ...res.data]))// Добавляем к уже имеющимся картинкам этот ответ кот приходит в res.data в виде массива обьектов где записаны данные о кажд картинке (url, id, categories etc).
