import React from "react";
import { Filter } from "../Filter/Filter";
import { ActionContainer } from "../ActionContainer/ActionContainer";
import "./Header.css";

interface IProps {
  ShowDeleteButtonHandler: any;
  notesFiltration: any;
}

export const Header = ({ ShowDeleteButtonHandler, notesFiltration }: IProps) => (
  <div>
    <div className="Header">
      <Filter notesFiltration={notesFiltration}></Filter>
      <span className="title">Reminders</span>
      <ActionContainer ShowDeleteButtonHandler={ShowDeleteButtonHandler} />
    </div>
    <hr className="header-hr" />
  </div>
);
