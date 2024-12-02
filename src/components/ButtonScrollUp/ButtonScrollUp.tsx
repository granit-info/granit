import css from "./ButtonScrollUp.module.css";
import { useState, useEffect, FC } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const ButtonScrollUp: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 256) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`${css.scroll_to_top} ${isVisible ? css.visible : ""}`}>
      <Link to="/">
      <button onClick={scrollToTop}>
        <BsArrowUpCircle size={32} />
      </button>
      </Link>
    </div>
  );
};

export default ButtonScrollUp;
