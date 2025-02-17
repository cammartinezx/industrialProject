import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import styles from './styles/Header.module.css';

const Header = () => {
    const navigate = useNavigate();

  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <img src="/logo.png" alt="Chatbot Logo" onClick={() => navigate('/home')}/>
        </div>
        <div className={styles.icons}>
            <div className={styles.notificationWrapper}>
            <FontAwesomeIcon 
                icon={faBell} 
                className={styles.icon} 
            />
            <span className={styles.redDot}></span>
            </div>
            <FontAwesomeIcon 
            icon={faUser}
            className={styles.icon}
            />
        </div>
    </header>
  );
};

export default Header