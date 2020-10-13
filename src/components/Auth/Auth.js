import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import styles from './Auth.module.css';
import loader from "../../assets/images/Gear.gif";

export function Auth({unsplashState}) {

  return (
    <>
      {unsplashState.users._bearerToken===null||undefined
        ? <img src={loader} alt={'loader'} className={styles.loader}/>
        : <span> You are authorized. Going back to homepage...</span>
      }
    </>
  )
}

        // ?
        //   <img src={loader} alt={'loader'} className={styles.loader}/>
        // :
        // <>
        //   <span> you are authorized</span>
        //   {/*<Link to={'/'}>*/}
        //   {/*    <button className={styles.button} onClick={getBearerTokenFromUrlCode}>Now you are authorized. Click here to get back to home page </button>*/}
        //   {/*</Link>*/}
        // </>

