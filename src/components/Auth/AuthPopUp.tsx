import { SignIn } from "@/components/Auth/SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import { AboutPlatform } from "./AboutPlatform/AboutPlatform";

interface Props {
  action: string;
}
export const AuthPopUp = ({ action }: Props) => {
  return (
    <div className="auth-pop-up">
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
    </div>
  );
};
