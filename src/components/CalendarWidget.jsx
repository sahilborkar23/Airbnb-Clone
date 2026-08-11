import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget = ({ range, setRange }) => {
  return (
    <div className="w-full">
      <style>{`
        .airbnb-calendar {
          --rdp-day-width: 48px;
          --rdp-day-height: 48px;
          --rdp-day_button-width: 48px;
          --rdp-day_button-height: 48px;
          --rdp-day_button-border-radius: 50%;
          --rdp-accent-color: #222222;
          --rdp-accent-background-color: #f7f7f7;
          --rdp-outline: none;
          margin: 0;
          position: relative;
        }
        
        .rdp-months {
          justify-content: flex-start;
          gap: 40px;
          flex-wrap: nowrap;
        }
        
        .rdp-month {
          margin: 0;
        }
        
        .rdp-month_caption {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          height: 48px;
          margin-bottom: 8px;
        }
        
        .rdp-caption_label {
          font-size: 16px;
          font-weight: 600;
          color: #222222;
        }
        
        .rdp-nav {
          position: absolute;
          top: 0;
          height: 48px;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          pointer-events: none;
        }
        
        .rdp-nav_button {
          pointer-events: auto;
          width: 32px;
          height: 32px;
          padding: 0;
          border-radius: 50%;
          color: #222222;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        
        .rdp-nav_button:hover {
          background-color: #f7f7f7;
        }
        
        .rdp-weekday {
          font-size: 12px;
          font-weight: 600;
          color: #717171;
          text-transform: none;
          padding-bottom: 4px;
        }
        
        .rdp-day_button {
          font-size: 14px;
          font-weight: 600;
          color: #222222;
        }
        
        .rdp-day_button:hover:not([disabled]) {
          background-color: transparent;
          border: 1px solid #222222;
        }
        
        .rdp-selected .rdp-day_button:hover {
          border-color: transparent;
        }
        
        .rdp-disabled {
          color: #b0b0b0;
          text-decoration: line-through;
          opacity: 1;
        }
        
        .rdp-disabled .rdp-day_button:hover {
          border: none;
        }
        
        @media (max-width: 768px) {
          .rdp-months {
            flex-direction: column;
            gap: 24px;
          }
        }
      `}</style>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        pagedNavigation
        showOutsideDays={false}
        className="airbnb-calendar"
        disabled={{ before: new Date() }}
        formatters={{
          formatWeekdayName: (day) => format(day, 'E').charAt(0)
        }}
        components={{
          IconLeft: () => <ChevronLeft size={20} strokeWidth={1.5} />,
          IconRight: () => <ChevronRight size={20} strokeWidth={1.5} />
        }}
      />
    </div>
  );
};

export default CalendarWidget;
