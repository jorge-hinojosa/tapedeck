import React from "react";
import styles from "./user-info.module.scss";

function UserInfo(props) {
  return (
    <div className={styles.user_card}>
      <img src={props.image} alt={props.first_name} />
      <div className={styles.info_cont}>
        <h2>{props.username}</h2>
        <h2>{props.first_name}</h2>
        <h2>{props.last_name}</h2>
        <h2>{props.email}</h2>
        <h2>{props.location}</h2>
        <h2>{props.bio}</h2>
      </div>
    </div>
  );
}

export default UserInfo;
