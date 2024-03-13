import "./Footer.css";
import EternalLogo from "../../../public/EternalLogo.svg";
import twitter from "../../../public/twitter.svg";
import facebook from "../../../public/facebook.svg";
import youtube from "../../../public/youtube.svg";
import Image from "next/image";
interface Props {
  isNavOpen: boolean;
}
export const Footer = ({ isNavOpen }: Props) => {
  return (
    <footer className="footer">
      <div className="fluid-container">
        <div className="footer-inner">
          <Image className="footer-logo" src={EternalLogo} alt="logo" />
          <p className="footer-copyright">
            © 2023 Eternal. All rights reserved.
          </p>
          <div className="footer-follow-us">
            <p className="footer-text">Follow us</p>
            <ul className="footer-social-medias">
              <li className="footer-social-media">
                <a
                  className="footer-social-media-link"
                  href="#"
                  tabIndex={isNavOpen ? -1 : 0}
                >
                  <Image
                    className="footer-social-media-img"
                    src={twitter}
                    alt="twitter"
                  />
                </a>
              </li>
              <li className="footer-social-media">
                <a
                  className="footer-social-media-link"
                  href="#"
                  tabIndex={isNavOpen ? -1 : 0}
                >
                  <Image
                    className="footer-social-media-img"
                    src={facebook}
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="footer-social-media">
                <a
                  className="footer-social-media-link"
                  href="#"
                  tabIndex={isNavOpen ? -1 : 0}
                >
                  <Image
                    className="footer-social-media-img"
                    src={youtube}
                    alt="youtube"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
