import React, {useEffect, useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "./components/CardsList/CardList";
import {Route, Switch} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {CardPage} from "./components/CardPage/CardPage";
import {Auth} from "./components/Auth/Auth";

// 'xGHYVNYkr6A' id foto to like

const accessKey= "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw";
const secret = "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA";
const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "xCCc0l4N7uCUZqW8-2ul9aL-jZdSq5DU5CxoTlvYccU";
// const secret = "bPf1_xm6rpCWU_i3E1xJg26vgFYdbrChRJL93ICuH5k";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";
// const accessToken = JSON.parse(localStorage.getItem('accessTokenForUnsplash'));//если есть в локале то берем оттуда иначе undefined

// const accessKey= "S1Nhql7F6MIMl3zRV2tEmyn_523yixt2QW_nfuz751c";
// const secret = "gRkmQ9LdQDXHw6LnTQPlk67suNqrE_ASY2Vy8JD7nrg";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "Awhepytu0JPZujZW7f97BMriVV8gKVO9_i2cM82Z1YU";
// const secret = "6LfA1BzLZz3Z2_Co9uWJJB4_fkpZvXZAUCxdQEAHP5o";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";


const App = () => {
  const bearerToken = JSON.parse(localStorage.getItem('accessTokenForUnsplash'));//берем из локала. Если нет то устанавливается на null.
  const unsplashState = new Unsplash({//с ключом или без неважно. Будет использоваться только один unsplash без обновлений.
    accessKey: accessKey,// accesskey из настроек вашего приложения
    secret: secret,// Application Secret из настроек вашего приложения
    callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
    bearerToken: bearerToken,//берем из локала. Если нет то устанавливается null.
  });
  const AMOUNT_ON_PAGE = 5;

  const [images, setImages] = useState([]);//стейт списка фоток
  const [clickedImageObj, setClickedImageObj] = useState({});
  const [page, setPage] = useState(1);
  const [isAuth, setIsAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  const getBearerTokenFromUrlCode =()=> {
    console.log('getting code from url...');
    const codeFromUrl = window.location.search.split('code=')[1];// Считываем GET-параметр code из URL// www.example.com/auth?code=abcdef123456...

    if (codeFromUrl) {//если код в строке есть.
      console.log('check codeFromUrl:', codeFromUrl);
      unsplashState.auth.userAuthentication(codeFromUrl)//отправляем запрос на получение токена
        .then(toJson)
        .then(json => {
          console.log('json answer from url is:', json);
          setBearerTokenToLocalStorage(json.access_token);
          console.log('set to local from getBearerTokenFromUrlCode is done');
          // setBearerToken(json.access_token);
          window.location.assign('https://jsdiploma.nef-an.ru');// Перезагружаем гл страницу.
          // console.log('setBearerToken from getBearerTokenFromUrlCode is done');
          console.log('reloading from getBearerTokenFromUrlCode is done');
        })
      }else{
        console.log('getting code is skipped. codeFromUrl is:',codeFromUrl);//return false
      }
  }

  const checkLogs =()=> {
     console.log('unsplashState is:', unsplashState);
     console.log('images State is:', images);
     console.log('isAuth is:', isAuth);
     console.log('userProfile is:', userProfile);
     console.log('localStorage.accessTokenForUnsplash is:', localStorage.accessTokenForUnsplash);
     console.log('unsplashState._bearerToken is:', unsplashState._bearerToken);
    const authenticationUrl = unsplashState.auth.getAuthenticationUrl([// Генерируем адрес страницы аутентификации на unsplash.com
      "public",// и указываем требуемые разрешения (permissions)
      "write_likes",
    ]);
    console.log('unsplashState.auth.getAuthenticationUrl is:', authenticationUrl);
  };

  const getUserProfile =()=> {
    console.log('getting UserProfile...bearerToken is:', bearerToken);
    if (bearerToken) {//если в стейте есть ключ
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
      console.log('getting UserProfile from server is skipped.  bearerToken is:', bearerToken);
    }
  };

  const setBearerTokenToLocalStorage= (bearerToken) => {
    localStorage.setItem('accessTokenForUnsplash', JSON.stringify(bearerToken));
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

  const getFirstTenPhotos = ()=>{
    console.log('getting 10 photos...')
    if (images.length === 0) {//только когда список пуст.
      unsplashState.photos.listPhotos(page, AMOUNT_ON_PAGE, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
        .then(toJson)
        .then(json => {//json это ответ в виде массива обьектов
          setImages([...json]);//установка нов стейта списка фоток (после этой ф).
          console.log('getting 10 photos is done')
        });
    }else {
      console.log('getting 10 photos is skipped. images.length is:', images.length)
    }

  };

  const getExistingPhotos = ()=>{
    console.log('getting existing photos...')
    if (images.length === 0) {//только когда список пуст.
    }else {
      console.log('getting 10 photos is skipped. images.length is:', images.length)
    }

  };


  const addPhotos = () => {
    unsplashState.photos.listPhotos(page+1, AMOUNT_ON_PAGE, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов в количестве указанном в переменной amountOfItemsOnPage.
        const newImagesArr = [...images, ...json];//создаем новый массив добавляя к старым новые фотки.
        // const newCleanArr = [...new Set(newDirtyArr)];//избавляемся от дублирования элементов. ES6. Альтернатива Array.from(new Set (newDirtyArr))
        // const newCleanArr2 = newDirtyArr.filter((item,index)=>newDirtyArr.indexOf(item===index));//способ 2 через filter
        // const newCleanArr3 = newDirtyArr.reduce((unique,item)=>unique.includes((item) ? unique:[...unique, item], []));//способ 3 через reduce
        setImages(newImagesArr);//обновляем стейт списка картинок.
        setPage(page + 1);//сохраняем стейт последней запрашиваемой страницы.
      });
  };

  const getClickedImageObj = (id) => {//повешен на preview
    console.log(`getting image obj...id:`, id);

    const clickedImageObj = images.find(item => item.id === id);//найти итем с нужным айди в стейте
    console.log(`clickedImageObj is:`, clickedImageObj);

    setClickedImageObj(clickedImageObj);//установить стейт открытой картинки, кот потом будет передавать всю инфу при детальном просмотре.
    setIsOpen(true);//установить стейт булинь статуса открытости картинки
    console.log(`setClickedImageObj is done`);
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
    if(isAuth) {
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
    }else{
      console.log('no access. isAuth is:', isAuth)
    }
  };

  useEffect(() => {
    getBearerTokenFromUrlCode();//(is it auth location? true  -> setBearerTokenToLocalStorage and reload).
    getUserProfile();//(is unsplashState has code? true->setUserProfile,setIsAuth). Сначала bearerToken без ключа. Сработает вхолостую. (Внутри имеется проверка на наличие ключа). Когда из ф авторизации (getBearerTokenFromUrlCode) установится новый bearerToken то эта ф перезапустится.
    getFirstTenPhotos();//(are images empty? true  -> setImages). Загрузит первые фотки, независимо от ключа ибо unsplashState хоть урезанный но есть.
  }, []);//= componentDidMount, componentWillUpdate. Выполняется 1 раз при монтаже и кажд раз при изменении []. Если в [] пусто то просто 1 раз при монтаже.


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
                   setIsOpen={setIsOpen}
                 />}
        />
        <Route exact path={'/auth'} component={() => <Auth unsplashState={unsplashState}/>}/>
        <Route exact path={'/cardpage'}
               component={() =>
                 <CardPage
                   clickedImageObj={clickedImageObj}
                   handleClickHeart={handleClickHeart}
                   images={images}
                   isAuth={isAuth}
                   isOpen={isOpen}
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
