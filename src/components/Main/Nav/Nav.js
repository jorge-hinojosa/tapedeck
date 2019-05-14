import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.scss";
import Button from "@material-ui/core/Button";

function Nav(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_cont}>
        <h1>
          <img
            src="https://image.flaticon.com/icons/png/512/1789/1789303.png"
            alt="TapeDeck"
          />
          T A P E D E C K
        </h1>
        <div className={styles.cont}>
          {/* <i onClick={props.addProjectToggle()} className="material-icons">
            add_circle_outline
          </i> */}
          <Button
            component={Link}
            to="/"
            className={styles.Button}
            onClick={props.logout}
          >
            {/* <Link to="/" className={styles.nav_link}> */}
            Logout
            {/* </Link> */}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
