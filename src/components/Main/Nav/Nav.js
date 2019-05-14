import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.scss";
import Button from "@material-ui/core/Button";

function Nav(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_cont}>
        <h1>T A P E D E C K</h1>
        <div className={styles.cont}>
          <Button
            component={Link}
            to="/"
            className={styles.Button}
            onClick={props.logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
