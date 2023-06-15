import React from "react";
import EmojiPicker from "emoji-picker-react";
import './Chat-Style/chat.css'
const Emoji = (props) => {
  return (
    <>
      <div
        className="emoji "
        style={{ position: "absolute", top: "225px", left: "367px" }}
      >
        <EmojiPicker
          onEmojiClick={props.onEmojiClick}
          show
          height={300}
          width={300}
        />
      </div>
    </>
  );
};

export default Emoji;
