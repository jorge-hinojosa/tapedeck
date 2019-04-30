import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.scss";

function Nav(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_cont}>
        <h1>TapeDeck</h1>
        <ul>
          <li>Home</li>
          <li>Settings</li>
          <li onClick={props.logout}>
            <Link to="/" className={styles.nav_link}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
