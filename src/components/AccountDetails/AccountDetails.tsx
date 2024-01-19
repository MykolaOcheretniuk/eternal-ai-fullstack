import "./AccountDetails.css";
export const AccountDetails = () => {
  return (
    <section className="account-details">
      <div className="container">
        <div className="account-details-inner">
          <div className="account-details-info gradient-border">
            <h1 className="account-details-title avenir-bold">
              Account Details
            </h1>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Name</p>
              <input
                className="account-details-input base-input"
                placeholder="Justin Mac"
                type="text"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Email</p>
              <input
                className="account-details-input base-input"
                placeholder="justin@gmail.com"
                type="email"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">
                Phone number
              </p>
              <input
                className="account-details-input base-input"
                placeholder="8329822222"
                type="number"
              ></input>
            </div>
            <div className="account-details-input-container">
              <p className="account-details-input-text avenir-bold">Password</p>
              <input
                className="account-details-input base-input"
                placeholder="•••••••••••••••••••"
                type="password"
              ></input>
            </div>
            <button className="account-details-save-button gradient-button">
              save
            </button>
          </div>
        </div>
        <div className="account-details-subscription gradient-border">
          <span className="pro gradient-border">PRO</span>
          <p className="account-details-price avenir-bold">$10 / month</p>
          <p className="account-details-next-payment base-text">
            Next payment will be processed on April 6, 2023
          </p>
          <div className="account-details-buttons">
            <button className="account-details-update-payment">
              update payment
            </button>
            <button className="account-details-cancel-subscription">
              cancel subscription
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
