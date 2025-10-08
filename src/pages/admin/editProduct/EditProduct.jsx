import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditProduct.module.css";

export default function EditProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((e) => console.log(e));
  }, [id]);

  if (!product || Object.keys(product).length === 0) {
    return <p>Loading...</p>;
  }

  const handle = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleDeleteImage = () => {
    setProduct({ ...product, image: "" });
  };
  const handleChangeImag = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct({ ...product, image: imageUrl });
    }
  };
  const callApi = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/admin/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.text();
      })
      .then((data) => {
        console.log(data);
        alert("Successfully changed");
      })
      .catch((e) => {
        alert("Wrong: " + e);
      });
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.edit__header}>Edit Product</h1>
        <p>Update product information, images, and variants</p>
      </div>

      <main className={styles.edit__main}>
        <div className={styles.main__top}>
          <h3 className={styles.main__header}>Product Information</h3>
          <p>Basic details about your product</p>

          <form className={styles.edit__form}>
            <label className={styles.input__name}>
              <p>Product name</p>
              <input
                type="text"
                name="name"
                value={product.name || ""}
                onChange={handle}
              />
            </label>

            <label>
              <p>Price ($)</p>
              <input
                type="number"
                name="price"
                value={product.price || ""}
                onChange={handle}
              />
            </label>

            <label>
              <p>Brand</p>
              <input
                type="text"
                name="brandName"
                value={product.brandName || ""}
                onChange={handle}
              />
            </label>

            <label>
              <p>Discount (%)</p>
              <input
                type="number"
                name="discount"
                value={product.discount || ""}
                onChange={handle}
              />
            </label>

            <label>
              <p>Quantity</p>
              <input
                type="number"
                name="quantity"
                value={product.quantity || ""}
                onChange={handle}
              />
            </label>
          </form>
          <div className={styles.footer__img}>
            <p className={styles.title__img}>Product Images</p>
            {product.image ? (
              <div>
                <img src={product.image} alt="" className={styles.show__img} />
                <button
                  className={styles.btn__delete}
                  name="image"
                  value=""
                  onClick={handleDeleteImage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width="20"
                    height="20"
                    className={styles.delete__icon}
                  >
                    <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z" />
                  </svg>
                </button>
              </div>
            ) : (
              <label className={styles.image__change}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImag}
                  hidden
                  name="image"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="20"
                  height="20"
                >
                  <path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z" />
                </svg>
                <p>Upload</p>
              </label>
            )}
            <button
              type="submit"
              className={styles.change__product}
              onClick={callApi}
            >
              Change
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
