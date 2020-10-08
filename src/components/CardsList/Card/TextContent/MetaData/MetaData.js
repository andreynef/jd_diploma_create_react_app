import React from 'react';
import styles from "./Metadata.module.css";

export function MetaData({created, profile, name, ava}) {
  const date = created.slice(0,9);
  // const time = created.slice(11,15);
  // const formattedDate = [date, time].join("/")

  return (
    <div className={styles.metaData}>
      <a href={profile} className={styles.userLink}>
        <img
          className={styles.avatar}
          src={ava}
          alt="avatar"
        />
        <span className={styles.userName}>{name}</span>
      </a>
      <span className={styles.createdAt}>
        {date}
      </span>
    </div>
  );
}
