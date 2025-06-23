import React from 'react'


//import css
import styles from './Loading.module.css';


const Loading = () => {
    return (
        <section className={styles.loaderContainer}>
            <div className={styles.spinner} ></div>
        </section>
    )
}

export default Loading