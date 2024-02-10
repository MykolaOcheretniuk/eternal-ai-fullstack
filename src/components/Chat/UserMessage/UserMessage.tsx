import "./UserMessage.css";
interface Props {
  message: string;
}
export const UserMessage = ({ message }: Props) => {
  return (
    <div className="user-message">
      <p className="user-message-text">{message}</p>
    </div>
  );
};
