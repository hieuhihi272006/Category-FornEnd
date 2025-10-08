import styles from "./ListProduct.module.css";
import { useEffect, useState, useRef } from "react";
import DeletePortals from "../../../components/DeletePortals.jsx";
import { useNavigate } from "react-router-dom";
export default function ListProduct() {
  const navigation = useNavigate();
  const dialog = useRef();
  const [products, changeProduct] = useState([]);
  const [selectedProduct, setSelected] = useState(null);
  const [reLoad, setReLoad] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        changeProduct(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reLoad]);
  if (!products) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className={styles.list}>
        <div className={styles.list__header}>
          <h1>List Product</h1>
          <p>View and manage your products catalog</p>
          <form className={styles.list__form}>
            <div className={styles}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                width="23"
                height="23"
                className={styles.form__icon}
              >
                <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
              </svg>
              <input
                type="text"
                placeholder="Search by"
                className={styles.list__input}
              />
            </div>
            <button className={styles.list__btn}>Search</button>
          </form>
        </div>
        <div className={styles.table}>
          <div className={styles.table__column}>
            <p>Name</p>
            <p>Price</p>
            <p>Code</p>
            <p>Quantity</p>
            <p>Edit</p>
            <p>Delete</p>
          </div>
          <div>
            <DeletePortals
              ref={dialog}
              value={selectedProduct?.code}
              id={selectedProduct?.id}
              handle={setReLoad}
            />
            {products.map((item) => (
              <div className={styles.table__item} key={item.id}>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{item.code}</p>
                <p>{item.quantity}</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="20"
                  height="20"
                  className={`${styles.table__icon} ${styles.edit}`}
                  onClick={() => navigation(`/edit/${item.id}`)}
                >
                  <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="20"
                  height="20"
                  className={`${styles.table__icon} ${styles.delete}`}
                  onClick={() => {
                    setSelected(item);
                    dialog.current.showModal();
                  }}
                >
                  <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
