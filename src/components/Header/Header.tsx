import "./Header.css";
import EternalLogo from "../../../public/EternalLogo.svg";
import MenuIcon from "../../../public/MenuIcon.svg";
import GradientMenuIcon from "../../../public/gradientMenuIcon.svg";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="header">
      <div className="fluid-container">
        <div className="header-inner">
          <Image className="menu-icon" src={MenuIcon} alt="menu" />
          <a className="logo-container">
            <Image
              className="header-logo"
              src={EternalLogo}
              alt="logo"
              priority={true}
            />
          </a>
          <div className="header-buttons">
            <button className="login-button">Login</button>
            <button className="start-button gradient-button">
              Get started
            </button>
          </div>
          <Image
            className="mobile-menu-icon"
            src={GradientMenuIcon}
            alt="menu"
          />
        </div>
      </div>
    </header>
  );
};
