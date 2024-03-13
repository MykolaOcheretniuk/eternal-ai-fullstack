"use client";
import { useEffect, useRef } from "react";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import "./HeaderNav.css";
import { useHandleOutsideClick } from "@/utils/handleOutsideClick";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Facebook from "../../../../public/facebook.svg";
import Instagram from "../../../../public/instagram.svg";
import Twitter from "../../../../public/twitter.svg";
import Discord from "../../../../public/discord.svg";
interface Props {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export const HeaderNav = ({ setVisible }: Props) => {
  const menuAreaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  useHandleOutsideClick(menuAreaRef, () => {
    setVisible(false);
  });
  return (
    <section className="header-nav container-with-blur no-scroll">
      <div className="container">
        <div className="header-nav-inner" ref={menuAreaRef}>
          <nav className="header-nav-navigation">
            <ul className="header-nav-elements">
              <li className="header-nav-element">
                <a className="header-nav-element-link" href="#">
                  About us
                </a>
              </li>
              <li className="header-nav-element">
                <Link className="header-nav-element-link" href="/?pricing=info">
                  Pricing
                </Link>
              </li>
              <li className="header-nav-element">
                <a className="header-nav-element-link" href="#">
                  How it works
                </a>
              </li>
              {session?.user && (
                <li className="header-nav-element">
                  <Link
                    className="header-nav-element-link"
                    href="/accountDetails"
                    onClick={() => {
                      if (pathname === "/accountDetails") {
                        setVisible(false);
                      }
                    }}
                  >
                    My account
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className="header-nav-social-medias">
            <ul className="header-nav-social-list">
              <li className="header-nav-social-media ">
                <a className="header-nav-social-link" href="#">
                  <Image
                    className="header-nav-social-icon"
                    src={Facebook}
                    alt="facebook"
                  ></Image>
                </a>
              </li>
              <li className="header-nav-social-media">
                <a className="header-nav-social-link" href="#">
                  <Image
                    className="header-nav-social-icon"
                    src={Instagram}
                    alt="instagram"
                  ></Image>
                </a>
              </li>
              <li className="header-nav-social-media">
                <a className="header-nav-social-link" href="#">
                  <Image
                    className="header-nav-social-icon"
                    src={Twitter}
                    alt="twitter"
                  ></Image>
                </a>
              </li>
              <li className="header-nav-social-media">
                <a className="header-nav-social-link" href="#">
                  <Image
                    className="header-nav-social-icon"
                    src={Discord}
                    alt="discord"
                  ></Image>
                </a>
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
