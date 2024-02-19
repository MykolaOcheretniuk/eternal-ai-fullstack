import Link from "next/link";
import "./ImportantQuestions.css";

export const ImportantQuestions = () => {
  return (
    <section className="important-question">
      <div className="container">
        <div className="inner">
          <h1 className="title">ask important people important questions</h1>
          <p className="questions-text base-text">
            Choose a question to quickly get a realistic response
          </p>
          <div className="questions-list">
            <div className="question gradient-border">
              <Link
                href="#individuals"
                onClick={() => {
                  sessionStorage.setItem(
                    "QUESTION",
                    "What did you want to be when you grew up?"
                  );
                }}
              >
                <p className="question-text base-text">
                  What did you want to be when you grew up?
                </p>
              </Link>
            </div>
            <div className="question gradient-border">
              <Link
                href="#individuals"
                onClick={() => {
                  sessionStorage.setItem(
                    "QUESTION",
                    "What is the meaning of life?"
                  );
                }}
              >
                <p className="question-text base-text">
                  What is the meaning of life?
                </p>
              </Link>
            </div>
            <div className="question gradient-border">
              <Link
                href="#individuals"
                onClick={() => {
                  sessionStorage.setItem(
                    "QUESTION",
                    "What is your greatest accomplishment?"
                  );
                }}
              >
                <p className="question-text base-text">
                  What is your greatest accomplishment?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
