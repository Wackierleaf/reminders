import React from "react";
import "./ModalWindow.css";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
interface IFormControl {
  content: string;
  time: any;
  period: string;
  timeToRemind: any;
  color: string;
}

interface IState {
  formControls: IFormControl;
  redirect: boolean;
  needParse: boolean;
  showWarning: boolean;
}

interface IProps {}

export default class ModalWindow extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      formControls: {
        content: "",
        time: null,
        period: "",
        timeToRemind: null,
        color: "",
      },
      redirect: false,
      needParse: false,
      showWarning: false,
    };
  }

  changeContent = (event: any) => {
    const formControls = this.state.formControls;
    formControls.content = event.target.value;
    if (Boolean(formControls.content)) {
      this.setState({ formControls: formControls, showWarning: false });
    } else {
      this.setState({ showWarning: true });
    }
  };

  changeDate = (event: any) => {
    const formControls = this.state.formControls;
    formControls.time = event.target.value;
    this.setState({ formControls: formControls });
  };

  changePeriod = (event: any) => {
    const formControls = this.state.formControls;
    formControls.period = event.target.value;
    this.setState({ formControls: formControls });
  };

  changeTime = (event: any) => {
    const formControls = this.state.formControls;
    formControls.timeToRemind = event.target.value;
    this.setState({ formControls: formControls });
  };

  changeColor = (event: any) => {
    const formControls = this.state.formControls;
    formControls.color = event.target.value;
    this.setState({ formControls: formControls });
  };

  addNoteHandler = async () => {
    try {
      const formControls = this.state.formControls;
      if (formControls.time === null && formControls.timeToRemind === null) {
        await this.setState({ needParse: true });
      } else {
        formControls.timeToRemind = formControls.time?.slice(0, 11) + formControls.timeToRemind;
        this.setState({ formControls });
      }
      if (Boolean(this.state.formControls.content)) {
        await axios
          .post(`https://localhost:44376/api/notes/${true}`, this.state.formControls)
          .then(() => this.setState({ redirect: true }));
      } else {
        this.setState({ showWarning: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { redirect } = this.state;
    if (!redirect) {
      return (
        <div className="modal-container">
          <div className="modal-window">
            <div className="modal-content">
              <span>Добавление заметки</span>
              <form className="form">
                <div className="textCon">
                  <textarea
                    rows={14}
                    cols={32}
                    className="text-area"
                    name="noteContent"
                    onChange={this.changeContent}
                  ></textarea>
                  {this.state.showWarning ? (
                    <span className="empty-text-label">Текст заметки не должен быть пустым</span>
                  ) : (
                    false
                  )}
                </div>
                <div className="inputs">
                  <label>
                    Дата: <input type="datetime-local" onChange={this.changeDate} />
                  </label>
                  <label>
                    Период: <input type="text" onChange={this.changePeriod} />
                  </label>
                  <label>
                    Напоминание: <input type="time" onChange={this.changeTime} />
                  </label>
                  <label>
                    Цвет: <input type="color" list="colors" onChange={this.changeColor} />
                  </label>
                </div>
              </form>
              <datalist id="colors">
                <option value="#bdd9ae" />
                <option value="#e8abcc" />
                <option value="#b4a8cf" />
                <option value="#addbf9" />
              </datalist>
            </div>
            <div className="btn-container">
              <button className="btn add-modal-btn Nav" onClick={this.addNoteHandler}>
                Добавить
              </button>
              <NavLink to="/" className="Nav">
                <button className="btn close-modal-btn ">Закрыть</button>
              </NavLink>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/"></Redirect>;
    }
  }
}
