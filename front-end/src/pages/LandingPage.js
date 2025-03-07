import { useNavigate } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.landingContainer}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
            <img src="/goc_logo.png" alt="Chatbot Logo" className={styles.logo} />
                <h1 className={styles.heading}>Welcome to <span>EduChat AI</span></h1>
                <p className={styles.subheading}>
                    Your AI-powered assistant to help students get quick answers, with instructors available to refine responses.
                </p>
                <button className={styles.chatButton} onClick={() => navigate('/login')}>
                    Log In To Get Started
                </button>
            </div>
        </div>
    );
}

export default LandingPage;
