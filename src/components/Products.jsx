import styles from "../pages/home/Home.module.css";
import { useState, useEffect } from "react";
export default function Products() {
  const [product, changProduct] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/api/grocery/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changProduct(data);
      });
  }, []);
  if (!product.listProduct) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.boxProduct}>
      {product.listProduct.map((item, index) => (
        <div key={index} className={styles.product__item}>
          <div className={styles.boxImg}>
            <img src={item.image} className={styles.product__image} />
          </div>
          <p className={styles.product__name}>{item.name}</p>
          <div className={styles.product__price}>
            <p className={styles.price__discount}>
              ${item.discount_price.toFixed(2)}
            </p>
            <p className={styles.price__old}>${item.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
