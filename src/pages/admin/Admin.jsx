import MenuAdmin from "./menu/MenuAdmin.jsx";
import styles from "./Admin.module.css";
import { Outlet } from "react-router-dom";
export default function Admin() {
  return (
    <div className={styles.admin}>
      <MenuAdmin />
      <main className={styles.main__content}>
        <Outlet />
      </main>
    </div>
  );
}
