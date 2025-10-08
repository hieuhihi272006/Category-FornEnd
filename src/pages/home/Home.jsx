import HeaderSearch from "../../components/HeaderSearch";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Products from "../../components/Products";
import Footer from "../../components/Footer";

export default function Home() {
  const [banners, changeBanner] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/grocery/banners", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeBanner(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };
  return (
    <>
      <HeaderSearch />
      <div className={styles.containerB}>
        <Slider {...settings}>
          {banners.map((item, index) => (
            <div key={index} className={styles.slider}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles.slider__image}
              ></img>
            </div>
          ))}
        </Slider>
      </div>
      <section className={styles.container__product}>
        <div className={styles.product__header}>
          <h3>Featured Products</h3>
          <p>Discover our handpicked selection of top-quality products</p>
        </div>
        <Products />
      </section>
      <Footer />
    </>
  );
}
