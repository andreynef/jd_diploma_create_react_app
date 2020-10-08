import React from 'react';
import styles from './Footer.module.css';


export const Footer = () => {//функциональный компонент с единственными получаемыми аргументами props. Типа глупый компонент который тупо принимает приказ и выполняет его(принял аргументы и использовал их не меняя ничего)

  return (
    <div className={styles.footerContainer}>
      <p> &#169; 2020 INSTAGhmGhm FROM FOOTBOOK</p>
    </div>
  );
}