import React from "react";
import "./Filter.css";

interface IProps {
  notesFiltration: any;
}

interface IFilterProps {
  fromDate: any;
  toDate: any;
  type: any;
}

interface IState {
  showPeriodFilter: boolean;
  filterProps: IFilterProps;
}

const options = ["Выберите период", "Сегодня", "Завтра", "На неделю", "На месяц", "Произвольный период"];

export class Filter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showPeriodFilter: false,
      filterProps: {
        type: null,
        fromDate: null,
        toDate: null,
      },
    };
  }
  filterHandler = (event: any) => {
    if (event.target.value !== options[options.length - 1]) {
      this.props.notesFiltration(event.target.value);
    } else {
      this.setState({
        showPeriodFilter: true,
        filterProps: {
          type: event.target.value,
          fromDate: null,
          toDate: null,
        },
      });
    }
  };

  activePeriodFilterHandler = () => {
    const { filterProps } = this.state;
    if (filterProps.type && filterProps.fromDate && filterProps.toDate) {
      this.props.notesFiltration(filterProps.type, filterProps.fromDate, filterProps.toDate);
    }
  };

  selectFromDateHandler = (event: any) => {
    const filterProps = { ...this.state.filterProps };
    filterProps.fromDate = new Date(Date.parse(event.target.value));
    this.setState({
      filterProps: filterProps,
    });
  };

  selectToDateHandler = (event: any) => {
    const filterProps = { ...this.state.filterProps };
    filterProps.toDate = new Date(Date.parse(event.target.value));
    this.setState({
      filterProps: filterProps,
    });
  };

  closePeriodFilterHandler = () => {
    this.setState({
      showPeriodFilter: false,
      filterProps: {
        type: null,
        fromDate: null,
        toDate: null,
      },
    });
    this.props.notesFiltration(options[0]);
  };

  render() {
    const { showPeriodFilter } = this.state;
    if (!showPeriodFilter) {
      return (
        <div className="FilterCon">
          <select className="Filter" onChange={this.filterHandler}>
            {options.map((option, index = 1) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }
    if (showPeriodFilter) {
      return (
        <div className="FilterCon">
          <span> C </span>
          <input type="date" onChange={this.selectFromDateHandler}></input>
          <span> по </span>
          <input type="date" onChange={this.selectToDateHandler}></input>
          <i className="fas fa-filter filterActions filterIcon" onClick={this.activePeriodFilterHandler}></i>
          <i className="fas fa-times-circle filterActions closeFilterIcon" onClick={this.closePeriodFilterHandler}></i>
        </div>
      );
    }
  }
}
