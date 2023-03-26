import React from 'react';
import styles from "./styles.module.css";
import Womanbg from "../../assets/woman-bg.png";
import Bulb from "../../assets/lightbulb.png";
// import Backdrop from "../../assets/transparent.png";

const Leftdiv = () => {
  return (
    <div className={styles.left_container}>
    <div className={styles.inner_container}>
        <div className={styles.container_main}>
        <img src={Womanbg} alt='woman-bg' className={styles.womanbg}/>
        </div>
        <div className={styles.tips_pane}>
            
        <p> <img src={Bulb} className={styles.tips_img} alt="tips-bulb"/> Tips: User experience is modified according to account type. This is to enhance experience.</p>
        </div>
    </div>
</div>
  )
}

export default Leftdiv;