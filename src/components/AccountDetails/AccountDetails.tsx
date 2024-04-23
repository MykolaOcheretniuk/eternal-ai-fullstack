"use client";
import { useSession } from "next-auth/react";
import "./AccountDetails.css";
import { useLayoutEffect, useState } from "react";
import { UpdateUser, User } from "@/models/user";
import Spinner from "../../../public/ButtonSpinner.svg";
import { EMAIL_TEST_REGEX, NAME_REGEX } from "@/constants/regex";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { BASE_URL } from "@/constants/api";
import { useIsPopUpOpen } from "@/store/useIsPopUpOpenStore";
import { format } from "date-fns";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentForm } from "../Pricing/paymentForm/PaymentForm";
import validator from "validator";
interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
export const AccountDetails = ({ user, setUser }: Props) => {
  let { data: session } = useSession();
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [dataSending, setDataSending] = useState(false);
  const { setIsOpen: setIsPopUpOpen, isOpened: isPopUpOpen } = useIsPopUpOpen();
  const [isPaymentInputActive, setIsPaymentInputActive] = useState(false);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  const clearInputs = () => {
    setUserName(null);
    setEmail(null);
    setPhone(null);
    setPassword(null);
  };
  const updateUser = async () => {
    setDataSending(true);
    const updateRequest: UpdateUser = {
      name: userName ? userName : undefined,
      email: email ? email : undefined,
      password: password ? password : undefined,
      phone: phone ? `${phone}` : undefined,
    };

    const res = await fetch(`${BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.token,
      },
      body: JSON.stringify(updateRequest),
    });
    const updatedUser = await res.json();
    if (updatedUser.message) {
      const fields = Object.keys(updatedUser);
      toast(
        `Fields: ${fields
          .toString()
          .replace("message,", "")} was successfully updated!`,
        {
          style: {
            background: "#B5E42E",
            border: "none",
            fontSize: "18px",
            color: "black",
            fontFamily: "Avenir",
            justifyContent: "center",
          },
        }
      );
    }
    let prevUser = user;
    Object.keys(updatedUser).forEach((key) => {
      if (updateRequest.hasOwnProperty(key) && updatedUser[key] !== undefined) {
        (prevUser as any)[key] = updatedUser[key] as User[keyof User];
      }
    });
    setUser(prevUser);
    clearInputs();
    setDataSending(false);
  };
  const cancelSubscription = async () => {
    const res = await fetch(`${BASE_URL}/cancel-subscription`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.user.token,
      },
    });
    if (user) {
      setUser(user);
    }
  };
  useLayoutEffect(() => {
    setIsPopUpOpen(false);
  }, [setIsPopUpOpen]);
  const changePaymentMethod = async () => {
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string)
    );
    fetch(`${BASE_URL}/get-setup-intent-secret`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    }).then(async (res) => {
      const { clientSecret } = await res.json();
      setStripeClientSecret(clientSecret);
    });
  };
  return (
    <section className="account-details">
      <div className="container">
        <Toaster position="bottom-right" closeButton={true} />
        <span className="account-details-top-decor"></span>

        <div className="account-details-inner">
          <div className="account-details-info gradient-border">
            <h1 className="account-details-title avenir-bold">
              Account Details
            </h1>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Name</p>
              <input
                className="account-details-input base-input"
                placeholder={user?.name ? user.name : "Justin Mac"}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName ? userName : ""}
                pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
                type="text"
                tabIndex={isPopUpOpen ? -1 : 0}
                autoComplete="off"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Email</p>
              <input
                className="account-details-input base-input"
                placeholder={user?.email ? user.email : "justin@gmail.com"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email ? email : ""}
                pattern={`${EMAIL_TEST_REGEX}`}
                type="email"
                tabIndex={isPopUpOpen ? -1 : 0}
                autoComplete="off"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">
                Phone number
              </p>
              <input
                className={`account-details-input ${
                  !isPhoneNumberValid && "account-details-input-invalid"
                } base-input`}
                placeholder={user?.phone ? user.phone : "8329822222"}
                value={phone ? phone : ""}
                onChange={({ target }) => {
                  if (target.value.length === 0) {
                    setIsPhoneNumberValid(true);
                  } else {
                    setIsPhoneNumberValid(
                      validator.isMobilePhone(target.value)
                    );
                  }
                  setPhone(target.value);
                }}
                type="number"
                tabIndex={isPopUpOpen ? -1 : 0}
                autoComplete="off"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Password</p>
              <input
                className="account-details-input base-input"
                placeholder="•••••••••••••••••••"
                type="password"
                value={password ? password : ""}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                tabIndex={isPopUpOpen ? -1 : 0}
                autoComplete="off"
              ></input>
            </div>
            <button
              className="account-details-save-button gradient-button"
              disabled={
                (!userName && !email && !password && !phone) ||
                (email ? !EMAIL_TEST_REGEX.test(email as string) : false) ||
                !isPhoneNumberValid ||
                (userName ? !NAME_REGEX.test(userName as string) : false)
              }
              onClick={async () => {
                await updateUser();
              }}
              tabIndex={isPopUpOpen ? -1 : 0}
            >
              {dataSending ? (
                <Image className="button-spinner" src={Spinner} alt="loading" />
              ) : (
                <>Save</>
              )}
            </button>
          </div>
        </div>
        {user && user.subscriptionId !== 0 && (
          <>
            <span className="account-details-bottom-decor"></span>
            <div className="account-details-subscription gradient-border">
              <span className="pro gradient-border">PRO</span>
              <p className="account-details-price avenir-bold">$10 / month</p>
              <p className="account-details-next-payment base-text">
                {user.cancelSubscriptionAtPeriodEnd
                  ? "Your subscription ends on "
                  : "Next payment will be processed on "}
                {format(
                  new Date(user.subscriptionExpireDate as string),
                  "MMMM d, yyyy"
                )}
              </p>
              {isPaymentInputActive ? (
                <div className="account-details-payment-input">
                  {stripeClientSecret ? (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret: stripeClientSecret,
                        appearance: {
                          theme: "stripe",
                          variables: {
                            fontFamily: "Avenir",
                          },
                        },
                        fonts: [
                          {
                            family: "Avenir",
                            src: "url(public/fonts/Avenir-Book.woff2)",
                            weight: "400",
                          },
                        ],
                      }}
                    >
                      <PaymentForm
                        clientSecret={stripeClientSecret}
                        isEdit={true}
                        setIsPaymentInputActive={setIsPaymentInputActive}
                      />
                    </Elements>
                  ) : (
                    <div className="form-loading payment-input-submit">
                      <Image
                        className="button-spinner"
                        src={Spinner}
                        alt="loading"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="account-details-buttons">
                  <button
                    className="account-details-button account-details-update-payment"
                    onClick={async () => {
                      setIsPaymentInputActive(true);
                      await changePaymentMethod();
                    }}
                  >
                    update payment
                  </button>
                  <button
                    className="account-details-button account-details-cancel-subscription"
                    onClick={async () => {
                      toast("Subscription canceled.", {
                        style: {
                          border: "none",
                          fontSize: "18px",
                          color: "white",
                          background: "#F82D98",
                          fontFamily: "Avenir",
                        },
                      });
                      await cancelSubscription();
                    }}
                    disabled={user.cancelSubscriptionAtPeriodEnd}
                  >
                    cancel subscription
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
