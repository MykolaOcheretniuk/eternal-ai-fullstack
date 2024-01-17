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
              <p className="question-text base-text">
                What did you want to be when you grew up?
              </p>
            </div>
            <div className="question gradient-border">
              <p className="question-text base-text">
                What is the meaning of life?
              </p>
            </div>
            <div className="question gradient-border">
              <p className="question-text base-text">
                What is your greatest accomplishment?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
