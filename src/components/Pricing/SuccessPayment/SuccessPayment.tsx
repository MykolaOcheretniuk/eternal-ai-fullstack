"use client";
import "./SuccessPayment.css";
import check from "../../../../public/check.svg";
import XMark from "../../../../public/xMark.svg";
import Image from "next/image";
import EternalLogo from "../../../../public/EternalLogo.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { useEnterKeyHandler } from "@/utils/handleEnterKey";

export const SuccessPayment = () => {
  const router = useRouter();
  const { setIsOpen: setIsPopUpOpen } = useIsPopUpOpen();
  useEnterKeyHandler(() => {
    setIsPopUpOpen(false);
    router.push("/");
  });

  return (
    <>
      <Link
        className="auth-pop-up-logo"
        href="/"
        onClick={() => {
          setIsPopUpOpen(false);
        }}
      >
        <Image src={EternalLogo} alt="logo" />
      </Link>
      <button className="close-button">
        <Image
          className="close-button-ig"
          src={XMark}
          alt="x mark"
          onClick={() => {
            router.push("/");
          }}
        />
      </button>
      <div className="success-payment">
        <div className="container">
          <div className="success-payment-inner gradient-border">
            <span className="success-payment-check gradient-button">
              <Image
                className="success-payment-check-img"
                src={check}
                alt="check"
              />
            </span>
            <div className="success-payment-text-group">
              <h1 className="success-payment-title avenir-bold">
                You have successfully subscribed!
              </h1>
              <p className="success-payment-text base-text">
                A receipt was sent to your email
              </p>
            </div>
            <button
              className="success-payment-start gradient-button"
              onClick={async () => {
                setIsPopUpOpen(false);
                router.push("/");
              }}
            >
              start chatting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
