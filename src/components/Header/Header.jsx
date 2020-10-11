import React from 'react';
import styles from './Header.module.css';

export function Header({toAuthorizePage, isAuth, checkLogs, toLogout, userProfile}) {

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
          {isAuth===true && (
            <>
              <button className={styles.button} type="button" onClick={toLogout}>
                <span className={styles.logoutText}>Logout</span>
              </button>
              <img
                className={styles.avatarImg}
                src={userProfile.profile_image.small}
                alt="avatar"
              />
              <button className={styles.button} type="button">
                <a className={styles.avatarText} href={userProfile.links.html}> {userProfile.name}</a>
              </button>
            </>
          )}
          {isAuth===false && (
            <button className={styles.button} type="button" onClick={toAuthorizePage}>
              <span className={styles.avatarText}>Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}





