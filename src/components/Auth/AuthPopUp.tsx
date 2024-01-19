import { AboutPlatform } from "./AboutPlatform/AboutPlatform";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

interface Props {
  action: string;
}
export const AuthPopUp = ({ action }: Props) => {
  return (
    <>
      {action === "signIn" && (
        <section className="auth-pop-up container-with-blur">
          <SignIn />
        </section>
      )}
      {action === "signUp" && (
        <section className="auth-pop-up container-with-blur">
          <SignUp />
        </section>
      )}
      {action === "about" && (
        <section className="auth-pop-up container-with-blur">
          <AboutPlatform />
        </section>
      )}
    </>
  );
};
