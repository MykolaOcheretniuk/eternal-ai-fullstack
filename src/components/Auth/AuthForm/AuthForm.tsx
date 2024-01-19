import "./AuthForm.css";
export const AuthForm = () => {
  return (
    <form className="auth-form">
      <div className="auth-form-input">
        <p className="input-text avenir-bold">Email</p>
        <input
          className="auth-input base-input"
          placeholder="justin@gmail.com"
          type="email"
        ></input>
      </div>
      <div className="auth-form-input"></div>
      <p className="input-text avenir-bold">Password</p>
      <input
        className="auth-input base-input"
        placeholder="•••••••••••••••••••"
        type="password"
      ></input>
    </form>
  );
};
