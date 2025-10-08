import styles from "../pages/home/Home.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";
// import { Link } from "react-router-dom";
export default function HeaderSearch() {
  const { isLoggedIn, hasRole } = useAuth();
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width="40"
            height="40"
          >
            <path d="M53.5 245.1L110.3 131.4C121.2 109.7 143.3 96 167.6 96L472.5 96C496.7 96 518.9 109.7 529.7 131.4L586.5 245.1C590.1 252.3 592 260.2 592 268.3C592 295.6 570.8 318 544 319.9L544 512C544 529.7 529.7 544 512 544C494.3 544 480 529.7 480 512L480 320L384 320L384 496C384 522.5 362.5 544 336 544L144 544C117.5 544 96 522.5 96 496L96 319.9C69.2 318 48 295.6 48 268.3C48 260.3 49.9 252.3 53.5 245.1zM160 320L160 432C160 440.8 167.2 448 176 448L304 448C312.8 448 320 440.8 320 432L320 320L160 320z" />
          </svg>
          <h3 className={styles.brand__name}>ShopMart</h3>
        </div>

        <form className={styles.form}>
          <input
            name="search"
            id="search"
            type="text"
            placeholder="search for products, brands and categories..."
            className={styles.form__search}
          />
          <button type="submit" className={styles.form__btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width="23"
              height="23"
              className={styles.form__icon}
            >
              <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
            </svg>
          </button>
        </form>
        <div>
          {isLoggedIn ? (
            ""
          ) : (
            <div>
              <Link to="/login">
                <button className={`${styles.btn} ${styles.signIn}`}>
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className={`${styles.btn} ${styles.signUp}`}>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
          {isLoggedIn && !hasRole("ADMIN") ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width="40"
              height="40"
              className={styles.user__logged}
            >
              <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
            </svg>
          ) : (
            ""
          )}
          {isLoggedIn && hasRole("ADMIN") ? (
            <Link to="/admin/products">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                width="40"
                height="40"
                className={styles.user__logged}
              >
                <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
              </svg>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
