import React from 'react';
import styles from './Info.module.css';
import {MetaData} from "./MetaData/MetaData";



export function Info({created, profile, name, ava}) {

  return (
    <div className={styles.infoContainer}>
      <div className={styles.metaContainer}>
        <MetaData created={created} profile={profile} name={name} ava={ava}/>
      </div>
    </div>
  );
}
