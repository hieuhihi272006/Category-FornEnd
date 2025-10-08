import { memo } from "react";
import styles from "./Footer.module.css";
import facebookImg from "../assets/img/facebook.svg";
import instagramImg from "../assets/img/instagram.svg";
import linkedImg from "../assets/img/linked.svg";
import twitterImg from "../assets/img/twiter.svg";
import { useAuth } from "../auth/useAuth.js";
export default memo(function Footer() {
  const { logout } = useAuth();
  return (
    <section className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__top}>
          <div className={styles.footer__subscribe}>
            <h3 className={styles.footer__heading}>
              Subscribe to keep up with the latest news
            </h3>
            <form action="" className={styles.form}>
              <input
                type="email"
                id="footer__email"
                className={styles.footer__email}
                placeholder="enter your email..."
              />
              <label htmlFor="footer__email">
                <button className={styles.footer__send}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 0 640 640"
                  >
                    <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
                  </svg>
                </button>
              </label>
            </form>
            <p className={styles.footer__desc}>
              by submitting this form,you acknowledge that you have the terms of
              our Privacy Statement
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width="40"
              height="40"
              onClick={() => logout()}
            >
              <path d="M569 337C578.4 327.6 578.4 312.4 569 303.1L425 159C418.1 152.1 407.8 150.1 398.8 153.8C389.8 157.5 384 166.3 384 176L384 256L272 256C245.5 256 224 277.5 224 304L224 336C224 362.5 245.5 384 272 384L384 384L384 464C384 473.7 389.8 482.5 398.8 486.2C407.8 489.9 418.1 487.9 425 481L569 337zM224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160z" />
            </svg>
          </div>

          <div className={styles.footer__row}>
            <div className={styles.footer__item}>
              <h3 className={styles.heading__solution}>Solutions</h3>
              <ul className={styles.footer_item__list}>
                <li>
                  <a href="" className={styles.item__link}>
                    MasterCard
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    Louis Vuitton
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    Gillette
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    Apple
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    General Electric
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.footer__item}>
              <h3 className={styles.heading__solution}>Solutions</h3>
              <ul className={styles.footer_item__list}>
                <li>
                  <a href="" className={styles.item__link}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    About
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="" className={styles.item__link}>
                    Term and conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.copy__desc}>Copyrighy @ Foodhub 2025</p>
          <figure className={styles.img__list}>
            <a className={styles.footer__media} href="">
              <img src={facebookImg} alt="" className={styles.copy__img} />
            </a>
            <a className={styles.footer__media} href="">
              <img src={instagramImg} alt="" className={styles.copy__img} />
            </a>
            <a className={styles.footer__media} href="">
              <img src={linkedImg} alt="" className={styles.copy__img} />
            </a>
            <a className={styles.footer__media} href="">
              <img src={twitterImg} alt="" className={styles.copy__img} />
            </a>
          </figure>
        </div>
      </div>
    </section>
  );
});
