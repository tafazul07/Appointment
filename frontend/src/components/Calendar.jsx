import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import "./Calendar.css";

const Calendar = ({ selectedDate, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth} className="calendar-nav-button">
          Previous
        </button>
        <h2 className="calendar-title">{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={nextMonth} className="calendar-nav-button">
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`day-${i}`} className="calendar-weekday">
          {format(new Date(2021, 0, i + 1), dateFormat)}
        </div>
      );
    }

    return <div className="calendar-weekdays">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfMonth(monthStart);
    const endDate = endOfMonth(monthEnd);

    const rows = [];
    let days = [];

    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    daysInMonth.forEach((day, index) => {
      const formattedDate = format(day, "d");
      const dayKey = `day-${index}`;

      const isCurrentMonth = isSameMonth(day, monthStart);
      const isTodayDay = isToday(day);
      const isSelectedDay = selectedDate && format(selectedDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");

      let dayClass = "calendar-day";
      if (!isCurrentMonth) {
        dayClass += " calendar-day-not-current";
      }
      if (isTodayDay) {
        dayClass += " calendar-day-today";
      }
      if (isSelectedDay) {
        dayClass += " calendar-day-selected";
      }

      days.push(
        <div key={dayKey} className={dayClass} onClick={() => onSelect(day)}>
          {formattedDate}
        </div>
      );

      if (days.length === 7) {
        rows.push(
          <div key={`row-${index}`} className="calendar-days">
            {days}
          </div>
        );
        days = [];
      }
    });

    return <div>{rows}</div>;
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
