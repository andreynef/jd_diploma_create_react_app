import React from 'react';
import {Link} from "react-router-dom";
import styles from './Auth.module.css';

export function Auth({getAccessTokenFromUrl}) {

  return (
    <>
      <Link to={'/'}>
          <button className={styles.button} onClick={getAccessTokenFromUrl}>Now you are authorized. Click here to get back to home page </button>
      </Link>
    </>
  )
}
