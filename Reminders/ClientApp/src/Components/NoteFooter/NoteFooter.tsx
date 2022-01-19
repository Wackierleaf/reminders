import React from "react";
import "./NoteFooter.css";

interface Props {
  time: Date;
  timeToRemind: Date;
}

export const NoteFooter = ({ time, timeToRemind }: Props) => {
  return (
    <div className="footer">
      <div className="dateTime">
        <span>
          Дата:&nbsp;
          <time>{time.toLocaleDateString()}</time>
        </span>
        <span>
          Время:&nbsp;
          <time>
            {time.toLocaleTimeString("ru", {
              hour: "numeric",
              minute: "numeric",
            })}
          </time>
        </span>
      </div>
      <span>
        Напоминание:&nbsp;
        <time>
          {timeToRemind.toLocaleTimeString("ru", {
            hour: "numeric",
            minute: "numeric",
          })}
        </time>
      </span>
    </div>
  );
};
