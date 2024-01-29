import "./ActiveMessage.css";
interface Props {
  message: string;
}
export const ActiveMessage = ({ message }: Props) => {
  return (
    <div className="active-response">
      <div className="active-response-inner">
        <p className="active-response-text">{message}</p>
      </div>
    </div>
  );
};
