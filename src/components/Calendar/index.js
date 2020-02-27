import React from "react";
import { CalendarTable } from './styled.js'

export default class Calendar extends React.Component {
    state = {
        isToday: false,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        day: new Date().getDate()
    };

    MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH',
        'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER',
        'OCTOBER', 'NOVEMBER', 'DECEMBER'];


    daysOfWeek = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];


    skipToNextMonth = () => {
        if (this.state.month < 11) {
            this.setState(prevState => ({ month: prevState.month + 1 }));
        } else {
            this.setState(prevState => ({ month: 0, year: prevState.year + 1 }));
        }
    };
    skipToPrevMonth = () => {
        if (this.state.month > 0) {
            this.setState(prevState => ({ month: prevState.month - 1 }));
            console.log(this.state.month);
        } else {
            this.setState(prevState => ({ month: 11, year: prevState.year - 1 }));
        }
    };

    displayCalendarDates = () => {
        let today = new Date().toDateString();
        let dates = [];
        let date = 1;
        //finding the day of the week on which the first of each month falls
        let firstDayOfMonth = new Date(
            this.state.year,
            this.state.month,
            1
        ).getDay();
        // finding the number of days in each month
        const findLastDayOfMonth = (month, year) => {
            return new Date(year, month + 1, 0).getDate();
        };
        if (
            new Date(this.state.year, this.state.month, date).toDateString() === today
        ) {
            this.setState(prevState => ({ isToday: !prevState.isToday }));
        }

        let lastDayOfMonth = findLastDayOfMonth(this.state.month, this.state.year);
        for (let i = 0; i < 6; i++) {
            let rows = [];
            for (let j = 0; j < 7; j++) {
                if (date > lastDayOfMonth) {
                    rows.push(<td className="inactive" key={j} ></td >);
                } else if (i === 0 && j < firstDayOfMonth) {
                    rows.push(<td className="inactive" key={j} />);
                } else {
                    rows.push(<td key={j}>{date}</td>);
                    date++;
                }
            }
            dates.push(<tr key={i}>{rows}</tr>);
        }
        return dates;
    };

    render() {
        return (
            <CalendarTable>
                <caption className="month-title">
                    <button onClick={this.skipToPrevMonth}>&#x2190;</button>
                    {this.MONTHS[this.state.month]} {this.state.year}
                    <button onClick={this.skipToNextMonth}>&#x2192;</button>
                </caption>
                <thead>
                    <tr>
                        {this.daysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{this.displayCalendarDates()}</tbody>
            </CalendarTable>
        );
    }
}


