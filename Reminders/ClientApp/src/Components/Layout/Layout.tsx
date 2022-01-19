import React, { ReactNode } from "react";
import "./Layout.css";
import { Header } from "../Header/Header";
import { NotesContainer } from "../NotesContainer/NotesContainer";
import { NotesBundel, fixData, doBundels, doFiltration } from "../../NotesData";
import axios from "axios";

interface IState {
  notes: NotesBundel[];
  isLoading: boolean;
  isDeleteBtnsVisible: boolean;
  filteredNotes: NotesBundel[];
  filtration: boolean;
}
interface IProps {}
export default class Layout extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      notes: [],
      isLoading: true,
      isDeleteBtnsVisible: false,
      filteredNotes: [],
      filtration: false,
    };
  }

  ShowDeleteButtonHandler = () => {
    this.setState({
      isDeleteBtnsVisible: !this.state.isDeleteBtnsVisible,
    });
  };

  notesFiltration = async (filterValue: string, fromDate?: Date, toDate?: Date) => {
    switch (filterValue) {
      case "Выберите период":
        await this.setState({
          filtration: false,
          filteredNotes: [],
        });
        break;
      case "Произвольный период":
        await this.setState({
          filtration: true,
          filteredNotes: doFiltration(this.state.notes, filterValue, fromDate, toDate),
        });
        break;
      default:
        await this.setState({
          filtration: true,
          filteredNotes: doFiltration(this.state.notes, filterValue),
        });
        break;
    }
  };

  prepareData = async (data: any[]) => {
    data = fixData(data);
    data.reverse();
    await this.setState({
      notes: doBundels(data),
      isLoading: false,
    });
  };

  deleteHandler = async (noteId: number, bundleId: number) => {
    try {
      await axios.delete(`https://localhost:44376/api/notes/${noteId}`);
      let notes: NotesBundel[] = this.state.notes.slice(0);
      notes.forEach((bundel) => {
        if (bundel.bundleId === bundleId) {
          bundel.notes = bundel.notes.filter((note) => note.id !== noteId);
        }
      });
      notes = notes.filter((bundel) => bundel.notes.length > 0);
      this.setState({
        notes: notes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  async componentDidMount() {
    try {
      const response: any[] = (await axios.get("https://localhost:44376/api/notes")).data;
      this.prepareData(response);
    } catch (error) {
      console.log(error);
    }
  }

  renderNotes = (notes: NotesBundel[]): ReactNode => {
    return notes.map((bundel) => {
      return (
        <>
          <NotesContainer
            key={bundel.bundleId}
            notes={bundel.notes}
            flag={this.state.isDeleteBtnsVisible}
            bundelId={bundel.bundleId}
            deleteHandler={this.deleteHandler}
          />
          <hr key={bundel.bundleId + 1} className="layout-hr" />
        </>
      );
    });
  };

  render(): ReactNode {
    const { isLoading } = this.state;
    const { filtration } = this.state;
    if (!isLoading) {
      return (
        <div className="Layout">
          <Header ShowDeleteButtonHandler={this.ShowDeleteButtonHandler} notesFiltration={this.notesFiltration} />
          <div className="Notes">
            {filtration ? this.renderNotes(this.state.filteredNotes) : this.renderNotes(this.state.notes)}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
