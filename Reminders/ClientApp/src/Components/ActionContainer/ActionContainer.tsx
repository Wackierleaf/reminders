import React from "react";
import "./ActionContainer.css";
import { NavLink } from "react-router-dom";

interface IProps {
  ShowDeleteButtonHandler: any;
}

export const ActionContainer = ({ ShowDeleteButtonHandler }: IProps) => (
  <div className="icons-container">
    <NavLink to="/AddNote">
      <i className="fas fa-plus-square icon add-btn" />
    </NavLink>
    <i onClick={ShowDeleteButtonHandler} className="fas fa-trash-alt icon delete-btn" />
  </div>
);
