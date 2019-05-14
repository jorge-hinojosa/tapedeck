import React from "react";
import styles from "./user-info.module.scss";

function UserInfo(props) {
  return (
    <div className={styles.user_card}>
      <img src={props.image} alt={props.first_name} />
      <div className={styles.info_cont}>
        <h3 className={styles.fullName}>
          {props.first_name} {props.last_name}
        </h3>
        <h3 className={styles.userInfo}>@{props.username}</h3>
        <h3 className={styles.userInfo}>{props.email}</h3>
        <h3 className={styles.userInfo}>{props.bio}</h3>
        <h3 className={styles.userInfo}>{props.location}</h3>
      </div>
    </div>
  );
}

export default UserInfo;
