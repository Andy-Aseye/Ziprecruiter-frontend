import React from 'react';
import styles from "./styles.module.css";
import Womanbg from "../../assets/woman-bg.png";
import Backdrop from "../../assets/transparent.png";

const Leftdiv = () => {
  return (
    <div className={styles.left_container}>
        <div className={styles.inner_container}>
            <div className={styles.img_container}>
              <div className={styles.model_div}>
              <img src={Womanbg} alt="bg-img" className={styles.img_bg}/>
              </div>
              {/* <div className={styles.backdrop_div}>
              <img src={Backdrop} alt="backdrop-img" className={styles.backdrop_img}/>
              </div> */}
            </div>
        </div>
    </div>
  )
}

export default Leftdiv;