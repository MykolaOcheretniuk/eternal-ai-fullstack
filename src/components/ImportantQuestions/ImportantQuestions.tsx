import Link from "next/link";
import "./ImportantQuestions.css";
interface Props {
  isNavOpen: boolean;
}
export const ImportantQuestions = ({ isNavOpen }: Props) => {
  return (
    <section className="important-question">
      <div className="container">
        <div className="inner">
          <h1 className="title">ask important people important questions</h1>
          <p className="questions-text base-text">
            Choose a question to quickly get a realistic response
          </p>
          <div className="questions-list">
            <Link
              className="question gradient-border"
              href="#individuals"
              onClick={() => {
                console.log("question");
                sessionStorage.setItem(
                  "QUESTION",
                  "What did you want to be when you grew up?"
                );
              }}
              tabIndex={isNavOpen ? -1 : 0}
            >
              <p className="question-text base-text">
                What did you want to be when you grew up?
              </p>
            </Link>
            <Link
              className="question gradient-border"
              href="#individuals"
              onClick={() => {
                sessionStorage.setItem(
                  "QUESTION",
                  "What is the meaning of life?"
                );
              }}
              tabIndex={isNavOpen ? -1 : 0}
            >
              <p className="question-text base-text">
                What is the meaning of life?
              </p>
            </Link>

            <Link
              href="#individuals"
              className="question gradient-border"
              onClick={() => {
                sessionStorage.setItem(
                  "QUESTION",
                  "What is your greatest accomplishment?"
                );
              }}
              tabIndex={isNavOpen ? -1 : 0}
            >
              <p className="question-text base-text">
                What is your greatest accomplishment?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
