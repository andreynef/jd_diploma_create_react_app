import React from 'react';
import styles from './Header.module.css';

export function Header({userId,userName,setUserId,setUserName,toAuthorizePage, userAva, isAuth, checkLogs, toLogout}) {

  return (
    <header className={styles.headerContainer}>
      <div className={styles.centralContainer}>
        <div className={styles.logoContainer}>
          <img src={'https://www.flaticon.com/svg/static/icons/svg/1/1394.svg'} alt={'logo'}/>
        </div>
        <div className={styles.authButtonContainer}>
          <button
            className={styles.buttonCheck}
            type="button"
            onClick={checkLogs}
          >
            show stats in console
          </button>
        </div>
        <div className={styles.userContainer}>
          {isAuth && (
            <>
              <button className={styles.button} type="button" onClick={toLogout}>
                <span className={styles.avatarText}>Logout</span>
              </button>
              <img
                className={styles.avatarImg}
                src={userAva ? userAva : "https://copypast.ru/fotografii/foto_zhivotnih/jivotnye_v_obraze_znamenitostej_0_/jivotnye_v_obraze_znamenitostej_0_027.jpg"}
                alt="avatar"
              />
              <button className={styles.button} type="button">
                <a className={styles.avatarText} href={'https://unsplash.com/'}> {userName}</a>
              </button>
            </>
          )}
          {!isAuth && (
            <button className={styles.button} type="button" onClick={toAuthorizePage}>
              <span className={styles.avatarText}> Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}





