import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from './Auth.module.css';

export function Auth({getAccessTokenFromUrlCode}) {


  useEffect(() => {
    getAccessTokenFromUrlCode();
  }, []);//= componentDidMount, componentWillUpdate. Выполняется 1 раз при монтаже и кажд раз при изменении []. Если в [] пусто то просто 1 раз при монтаже.

  return (
    <>
      <Link to={'/'}>
          <button className={styles.button} onClick={getAccessTokenFromUrlCode}>Now you are authorized. Click here to get back to home page </button>
      </Link>
    </>
  )
}
