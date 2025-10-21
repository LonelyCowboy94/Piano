import style from "./Keyboard.module.scss";

const Keyboard = ({ notes, handleMouseUp, handleMouseDown, activeNote }) => {
  return (
    <div className={style.keyboard}>
        <div className={style.speakers}>
            <div className={style.leftSpeaker}></div>
            <div className={style.rightSpeaker}></div>
        </div>
        <div className={style.controls}></div>
        <div className={style.borderLeft}></div>
        <div className={style.borderReft}></div>
      <div className={style.keys}>
        {/* Bele dirke */}
        {notes
          .filter((n) => !n.name.includes("#"))
          .map((note) => (
            <button
              key={note.name}
              className={`${style.whiteKeys} ${
                activeNote === note.name ? style.pressedKey : ""
              } ${
                activeNote === note.name ? style.active : ""
              }`}
              onMouseDown={() => handleMouseDown(note)}
              onMouseUp={() => handleMouseUp(note)}
              onMouseLeave={() => handleMouseUp(note)}
            >
              {note.name}
              <div style={{ fontSize: "10px", color: "#555" }}>
                {note.key.toUpperCase()}
              </div>
            </button>
          ))}

        {/* Crne dirke */}
        {notes
          .filter((n) => n.name.includes("#"))
          .map((note) => (
            <button
              key={note.name}
              className={`${style.blackKeys} ${
                activeNote === note.name ? style.pressedKey : ""
              } ${note.key}`}
              onMouseDown={() => handleMouseDown(note)}
              onMouseUp={() => handleMouseUp(note)}
              onMouseLeave={() => handleMouseUp(note)}
            >
              {note.name}
              <div>{note.key.toUpperCase()}</div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Keyboard;
