import { IndividualPortrait } from "./IndividualPortrait/IndividualPortrait";
import "./Chat.css";
export const Chat = () => {
  return (
    <div className="chat">
      <div className="fluid-container">
        <div className="chat-inner">
          <IndividualPortrait />
        </div>
      </div>
    </div>
  );
};
