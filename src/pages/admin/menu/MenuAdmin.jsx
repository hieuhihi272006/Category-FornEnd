import { Link } from "react-router-dom";
import { data } from "./dataMenu.jsx";
import styles from "../Admin.module.css";
export default function MenuAdmin() {
  return (
    <div className={styles.menu}>
      <div className={styles.navigation}>
        <p className={styles.navigation__header}>Admin Dashboard</p>
        <aside>
          <ul>
            {data.map((item) => (
              <Link
                to={item.link}
                className={styles.navigation__link}
                key={item.title}
              >
                <li className={styles.navigation__item}>
                  {item.icon}
                  <p className={styles.navigation__title}>{item.title}</p>
                </li>
              </Link>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
