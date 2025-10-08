import { createPortal } from "react-dom";
import styles from "../pages/admin/listProduct/ListProduct.module.css";
export default function DeletePortals({ ref, value, id, handle }) {
  const deleteProduct = () => {
    fetch(`http://localhost:8080/api/admin/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.text();
      })
      .then((data) => {
        console.log(data);
        alert("Successfully deleted product");
        handle((item) => !item);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return createPortal(
    <dialog ref={ref} className={styles.portals}>
      <h2 className={styles.portals__header}>
        Are you sure you want to delete product code: {value} ?
      </h2>
      <form method="dialog">
        <button className={styles.portals__btn} onClick={deleteProduct}>
          Ok
        </button>
        <button className={styles.portals__btn}>Close</button>
      </form>
    </dialog>,
    document.getElementById("portals")
  );
}
