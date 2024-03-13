"use client";
import "./Header.css";
import EternalLogo from "../../../public/EternalLogo.svg";
import MenuIcon from "../../../public/MenuIcon.svg";
import GradientMenuIcon from "../../../public/gradientMenuIcon.svg";
import Image from "next/image";
import { HeaderNav } from "./HeaderNav/HeaderNav";
import { AuthButtons } from "./AuthButtons/AuthButtons";
import { useRouter } from "next/navigation";
3;
import XMark from "../../../public/xMark.svg";
import Link from "next/link";
interface Props {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Header = ({ isNavOpen, setIsNavOpen }: Props) => {
  const router = useRouter();

  return (
    <>
      {isNavOpen && <HeaderNav setVisible={setIsNavOpen} />}
      <header className="header">
        <div className="fluid-container">
          <div className="header-inner">
            {!isNavOpen ? (
              <button
                className="header-menu-button"
                onClick={() => {
                  setIsNavOpen(true);
                }}
              >
                <Image className="menu-icon" src={MenuIcon} alt="menu" />
              </button>
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
            <div className="logo-container">
              <Link href={"/"}>
                <Image
                  className="header-logo"
                  src={EternalLogo}
                  alt="logo"
                  priority={true}
                />
              </Link>
            </div>

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
