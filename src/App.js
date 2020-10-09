import React, {useEffect, useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "./components/CardsList/CardList";
import {Route, Switch} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {CardPage} from "./components/CardPage/CardPage";
import {Auth} from "./components/Auth/Auth";

const App = () => {
  const accessKey= "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw";
  const secret = "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA";
  const callbackUrl="https://jsdiploma.nef-an.ru/auth";
  const [accessToken, setAccessToken] = useState('');
  const [unsplashState, setUnsplashState] = useState({});

  let unsplash = new Unsplash({
    accessKey: accessKey,// accesskey из настроек вашего приложения
    secret: secret,// Application Secret из настроек вашего приложения
    callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
    bearerToken: accessToken,
  });
  console.log(`initial unsplash is:`, unsplash);

  const [images, setImages] = useState([]);//стейт списка фоток
  const [openedImage, setOpenedImage] = useState({});
  const [page, setPage] = useState(1005);
  const [chosenId, setChosenId] = useState('');
  const [open, setOpen] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [code, setCode] = useState('');
  const [userId, setUserId] = useState('айди');
  const [userName, setUserName] = useState('наме');
  const [json, setJson] = useState('');

  const toAuthorize=()=>{
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([// Генерируем адрес страницы аутентификации на unsplash.com
      "public",// и указываем требуемые разрешения (permissions)
      "write_likes"
    ]);
    window.location.assign(authenticationUrl);// Отправляем пользователя по этому адресу
    //после подтверждения, перенаправляется на эту страницу - callbackUrl: "https://jsdiploma.nef-an.ru/auth"
  };

  const getOneImageObj = (id) => {//повешен на preview
    const filteredImages = images.filter(eachElementOfArr => eachElementOfArr.id === id);//оставить в стейте/списке только тот итем кот имеет этот id
    setOpenedImage(filteredImages[0]);//установить стейт открытой картинки
    setOpen(true);//установить стейт булинь статуса открытости картинки
  }

  const listPhotos = () => {//запрос данных с сервера Unsplash
    unsplash.photos.listPhotos(page, 10, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов
        setImages([...images, ...json]);//установка нов стейта списка фоток
        setPage(page + 1);//установка нов стейта страницы
        // console.log('listPhotos, json is:', json)
        // console.log('images State is:', images)
      });
  };

  const addPhotos = () => {
    unsplash.photos.listPhotos(page+1, 10, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов
        setImages([...images, ...json]);//установка нов стейта списка фоток
        setPage(page + 1);//установка нов стейта страницы
        // console.log('listPhotos, json is:', json)
        // console.log('images State is:', images)
      });
  };

  const likePhoto = (id) => {
    unsplash = new Unsplash({//перезапись запроса но уже с доп параметром
      accessKey: accessKey,// accesskey из настроек вашего приложения
      secret: secret,// Application Secret из настроек вашего приложения
      callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
      bearerToken: accessToken,
    });
    console.log(`new unsplash with bearerToken is:`, unsplash);
    unsplash.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта
        setImages(images.map(item=>item.id===id ? json : item));//установка нов стейта списка фоток
        console.log('json is:', json);
        console.log(`${id} is liked`);
      })
  };

  useEffect(() => {
    listPhotos();
  }, []);

  return (
    <>
      <Header
        toAuthorize={toAuthorize}
        userId={userId}
        userName={userName}
        setUserId={setUserId}
        setUserName={setUserName}
      />
        <Switch>{/*рендерится в зависимости от Route path*/}
          <Route exact path={'/'}
                 component={() =>
                   <CardList
                     add={addPhotos}
                     likePhoto={likePhoto}
                     images={images}
                     getImageObj={getOneImageObj}
                     pressed={pressed}
                     setPressed={setPressed}
                     setChosenId={setChosenId}
                   />}
          />
          <Route exact path={'/auth'}
                 component={() =>
                   <Auth
                     images={images}
                     setAccessToken={setAccessToken}
                     userId={userId}
                     userName={userName}
                     setUserId={setUserId}
                     setUserName={setUserName}
                     unsplashState={unsplashState}
                     setUnsplashState={setUnsplashState}
                   />
                 }
          />
          <Route exact path={'/cardpage'}
                 component={() =>
                   <CardPage
                     openedImage={openedImage}
                     open={open}
                     pressed={pressed}
                     setPressed={setPressed}
                     // likePhoto={likePhoto}
                     // likedId={likedId}
                     // setLikedId={setLikedId}
                   />
                 }
          />
        </Switch>
        <Footer/>
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
// componentDidMount() {
// 	this.timerID = setInterval(
// 		() => this.tick(),
// 		1000
// 	);
// }

// componentWillUnmount() {
// 	clearInterval(this.timerID);
// }

// axios
//   .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=10`)
//   .then(res=>setImages([...images, ...res.data]))// Добавляем к уже имеющимся картинкам этот ответ кот приходит в res.data в виде массива обьектов где записаны данные о кажд картинке (url, id, categories etc).
