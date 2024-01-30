"use client";
import "./Header.css";
import EternalLogo from "../../../public/EternalLogo.svg";
import MenuIcon from "../../../public/MenuIcon.svg";
import GradientMenuIcon from "../../../public/gradientMenuIcon.svg";
import Image from "next/image";
import { HeaderNav } from "./HeaderNav/HeaderNav";
import { AuthButtons } from "./AuthButtons/AuthButtons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import XMark from "../../../public/xMark.svg";
export const Header = () => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      {isNavOpen && <HeaderNav setVisible={setIsNavOpen} />}
      <header className="header">
        <div className="fluid-container">
          <div className="header-inner">
            {!isNavOpen ? (
              <Image
                className="menu-icon"
                src={MenuIcon}
                alt="menu"
                onClick={() => {
                  setIsNavOpen(true);
                }}
              />
            ) : (
              <div className="menu-close-container">
                <button className="menu-close" onClick={() => router.push("/")}>
                  <Image
                    className="menu-close-img"
                    src={XMark}
                    alt="x mark"
                    onClick={() => {
                      setIsNavOpen(false);
                    }}
                  />
                </button>
              </div>
            )}
            <a
              className="logo-container"
              onClick={() => {
                router.push("/");
              }}
            >
              <Image
                className="header-logo"
                src={EternalLogo}
                alt="logo"
                priority={true}
              />
            </a>
            <div className="header-buttons">
              <AuthButtons />
            </div>
            {!isNavOpen ? (
              <Image
                className="mobile-menu-icon"
                src={GradientMenuIcon}
                alt="menu"
                onClick={() => {
                  setIsNavOpen(true);
                }}
              />
            ) : (
              <div className="menu-mobile-close-container">
                <button className="menu-close" onClick={() => router.push("/")}>
                  <Image
                    className="menu-close-img"
                    src={XMark}
                    alt="x mark"
                    onClick={() => {
                      setIsNavOpen(false);
                    }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
