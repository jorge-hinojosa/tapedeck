import React from "react";
import styles from "./user-info.module.scss";

function UserInfo(props) {
  return (
    <div className={styles.user_card}>
      <img src={props.image} alt={props.first_name} />
      <div className={styles.info_cont}>
        <h2>
          {props.first_name} {props.last_name}
        </h2>
        <h3>@{props.username}</h3>
        <h3>{props.email}</h3>
        <h3>{props.bio}</h3>
        <h3>{props.location}</h3>
      </div>
    </div>
  );
}

export default UserInfo;
