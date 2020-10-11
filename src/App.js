import React, {useEffect, useState} from 'react';
import Unsplash, {toJson} from 'unsplash-js';
import {CardList} from "./components/CardsList/CardList";
import {Route, Switch} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {CardPage} from "./components/CardPage/CardPage";
import {Auth} from "./components/Auth/Auth";

const accessKey= "sQ_OK-FHQD1dS6L4h98HkNOr-HHHKRE8KuUPVf9BXAw";
const secret = "Eu_hWiHa3mUGcHyGtq2Idfj_gGCGYq6Jp0mv1ZL_kjA";
const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "xCCc0l4N7uCUZqW8-2ul9aL-jZdSq5DU5CxoTlvYccU";
// const secret = "bPf1_xm6rpCWU_i3E1xJg26vgFYdbrChRJL93ICuH5k";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";

// const accessKey= "S1Nhql7F6MIMl3zRV2tEmyn_523yixt2QW_nfuz751c";
// const secret = "gRkmQ9LdQDXHw6LnTQPlk67suNqrE_ASY2Vy8JD7nrg";
// const callbackUrl="https://jsdiploma.nef-an.ru/auth";


const App = () => {
  const [unsplashState, setUnsplashState]= useState(new Unsplash({
    accessKey: accessKey,// accesskey из настроек вашего приложения
    secret: secret,// Application Secret из настроек вашего приложения
    callbackUrl: callbackUrl,// Полный адрес страницы авторизации приложения (Redirect URI). Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
  }));
  const [images, setImages] = useState([]);//стейт списка фоток
  const [openedImage, setOpenedImage] = useState({});
  const [page, setPage] = useState(1);
  const [isAuth, setIsAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userAva, setUserAva] = useState(undefined);

  const checkLogs =()=> {
     console.log('unsplashState is:', unsplashState);
     console.log('isAuth is:', isAuth);
     console.log('userId is:', userId);
     console.log('userName is:', userName);
     console.log('userAva is:', userAva);
  };

  const getUserProfile =()=> {
    unsplashState.currentUser.profile()
      .then(toJson)
      .then(json => {// json обьект = {id: "Rc7GH-2FKsU", name: "andrey nefedyev", first_name: "andrey"}
        console.log('unsplash.currentUser.profile() -> json is:', json);
        setUserId(json.id);
        setUserName(json.name);
        setUserAva(json.profile_image.small);
      });
  };

  const toAuthorize=()=>{
    const authenticationUrl = unsplashState.auth.getAuthenticationUrl([// Генерируем адрес страницы аутентификации на unsplash.com
      "public",// и указываем требуемые разрешения (permissions)
      "write_likes",
    ]);
    window.location.assign(authenticationUrl);// Отправляем пользователя на авторизацию сайта Unsplash а потом он пепенаправит пользователя на - callbackUrl: "https://jsdiploma.nef-an.ru/auth"
  };

  const getFirstTenPhotos = ()=>{
    console.log(unsplashState);
    isAuth && getUserProfile();
    unsplashState.photos.listPhotos(page, 10, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов
        setImages([...json]);//установка нов стейта списка фоток (после этой ф).
      });
    console.log('getFirstTenPhotos is done')
  };

  const addPhotos = () => {
    handleListPhotos(page+1);
    setPage(page + 1);//сохраняем стейт посл страницы. но только после заверш этой ф!
  };

  const updateImagesState = (jsonRespond)=>{
      const newDirtyArr = [...images, ...jsonRespond];//мешаем все в кучу
      const newCleanArr = [...new Set(newDirtyArr)];//избавляемся от дублирования элементов. ES6. Альтернатива Array.from(new Set (newDirtyArr))
      // const newCleanArr2 = newDirtyArr.filter((item,index)=>newDirtyArr.indexOf(item===index));//способ 2 через filter
      // const newCleanArr3 = newDirtyArr.reduce((unique,item)=>unique.includes((item) ? unique:[...unique, item], []));//способ 3 через reduce
      setImages(newCleanArr);//обновляем стейт списка картинок.
  }

  const getOneImageObj = (id) => {//повешен на preview
    const filteredImages = images.filter(eachElementOfArr => eachElementOfArr.id === id);//оставить только тот итем кот имеет этот id
      console.log(`sorting images is done`);
    setOpenedImage(filteredImages[0]);//установить стейт открытой картинки
      console.log(`setOpenedImage is done`);
    setOpen(true);//установить стейт булинь статуса открытости картинки
      console.log(`setOpen is done`);
  };

  const handleListPhotos = (pageToShow) => {
    unsplashState.photos.listPhotos(pageToShow, 10, "latest")// метод из библиотеки https://github.com/unsplash/unsplash-js#photos. photos.listPhotos(page, perPage, orderBy)
      .then(toJson)
      .then(json => {//json это ответ в виде массива обьектов в количестве указанном в переменной amountOfItemsOnPage.
        updateImagesState(json);
      });
  };

  const handleLikePhoto =(id)=> {
    unsplashState.photos.likePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта {photo:{}, user:{}}
      })
  };

  const handleUnlikePhoto =(id)=> {
    unsplashState.photos.unlikePhoto(id)// метод из библиотеки https://github.com/unsplash/unsplash-js#photos
      .then(toJson)
      .then(json => {//json это ответ в виде одного обьекта {photo:{}, user:{}}
      })
  };

  const handlePressHeart = (id) => {
    const chosenItemObj = images.find(item => item.id === id);//найти итем с нужным айди в стейте
    const chosenItemLikes = chosenItemObj.likes;//вытащить количество лайков из обьекта для дальнейшего их изменения ниже.

    if (chosenItemObj.liked_by_user === false) {//если у выбранного итема стоит like=false...
      handleLikePhoto(id);//...то запрос на сервер на лайк
      const filteredImages = images.filter(item =>//создать копию стейта с измененными данными выбранного элемента
        item.id === id
          ? (item.liked_by_user=true, item.likes=chosenItemLikes+1)
          : item
      );
      setImages(filteredImages);//установить нов фильтрованый список с измененным итемом.
    } else {//иначе, тобишь true...
      handleUnlikePhoto(id);//...запрос на сервер на анлайк
      const filteredImages = images.filter(item =>//создать копию стейта с измененными данными выбранного элемента
        item.id === id
          ? (item.liked_by_user=false, item.likes=chosenItemLikes-1)
          : item
      );
      setImages(filteredImages);//установить нов фильтрованый список с измененным итемом.
    };
  };

  useEffect(() => {
    getFirstTenPhotos();//= componentDidMount. Выполняется только 1 раз при монтаже ибо добавлен [].
  }, []);


  return (
    <>
      <Header
        toAuthorize={toAuthorize}
        userId={userId}
        userName={userName}
        setUserId={setUserId}
        setUserName={setUserName}
        userAva={userAva}
        setUserAva={setUserAva}
        isAuth={isAuth}
        checkLogs={checkLogs}
      />
        <Switch>{/*рендерится в зависимости от Route path*/}
          <Route exact path={'/'}
                 component={() =>
                   <CardList
                     add={addPhotos}
                     handlePressHeart={handlePressHeart}
                     images={images}
                     getImageObj={getOneImageObj}
                     isAuth={isAuth}
                   />}
          />
          <Route exact path={'/auth'}
                 component={() =>
                   <Auth
                     setUnsplashState={setUnsplashState}
                     unsplashState={unsplashState}
                     setIsAuth={setIsAuth}
                   />
                 }
          />
          <Route exact path={'/cardpage'}
             component={() =>
               <CardPage
                 openedImage={openedImage}
                 open={open}
                 handlePressHeart={handlePressHeart}
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
