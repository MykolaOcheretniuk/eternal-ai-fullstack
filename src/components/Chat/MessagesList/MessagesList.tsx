import { ActiveMessage } from "../ActiveMessage/ActiveMessage";
import { IndividualMessage } from "../IndividualMessage/IndividualMessage";
import { UserMessage } from "../UserMessage/UserMessage";
import "./MessagesList.css";
export const MessagesList = () => {
  return (
    <div className="messages-list">
      <div className="messages-list-messages">
        <UserMessage />
        <IndividualMessage message="I have a dream to free the mind of user interfaces and that mankind will be able to communicate in new and innovative ways." />
        <IndividualMessage message="I have a dream that one day the world will no longer rely on fossil fuels." />
        <IndividualMessage message="I have a dream that man will walk on Mars during my lifetime." />
      </div>
      <div className="messages-list-active-message">
        <ActiveMessage message="I have a dream that one day every valley shall be exalted, every hill and mountain shall be made low, the rough places will be made plain, and the crooked places will be made straight, and the glory of the Lord shall be revealed." />
      </div>
      <div className="messages-list-send-message gradient-border">
        <input
          className="messages-list-send-message-input"
          placeholder="Enter your message..."
        ></input>
        <button className="messages-list-send-message-button gradient-button">
          Submit
        </button>
      </div>
    </div>
  );
};
