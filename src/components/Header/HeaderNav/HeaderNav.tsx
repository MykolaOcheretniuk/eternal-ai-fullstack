import { AuthButtons } from "../AuthButtons/AuthButtons";
import "./HeaderNav.css";
export const HeaderNav = () => {
  return (
    <section className="header-nav container-with-blur">
      <div className="container">
        <div className="header-nav-inner">
          <nav className="header-nav-navigation">
            <ul className="header-nav-elements">
              <li className="header-nav-element">
                <a className="header-nav-element-link" href="#">
                  About us
                </a>
              </li>
              <li className="header-nav-element">
                <a className="header-nav-element-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="header-nav-element">
                <a className="header-nav-element-link" href="#">
                  How it works
                </a>
              </li>
              <li className="header-nav-element">
                <a className="header-nav-element-link" href="#">
                  My account
                </a>
              </li>
            </ul>
          </nav>
          <div className="header-nav-social-medias">
            <ul className="header-nav-social-list">
              <li className="header-nav-social-media header-nav-facebook">
                <a className="header-nav-social-link" href="#"></a>
              </li>
              <li className="header-nav-social-media header-nav-instagram">
                <a className="header-nav-social-link" href="#"></a>
              </li>
              <li className="header-nav-social-media header-nav-twitter">
                <a className="header-nav-social-link" href="#"></a>
              </li>
              <li className="header-nav-social-media header-nav-discord">
                <a className="header-nav-social-link" href="#"></a>
              </li>
            </ul>
          </div>
          <div className="header-nav-auth-buttons">
            <AuthButtons />
          </div>
        </div>
      </div>
    </section>
  );
};
