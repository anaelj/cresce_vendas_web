'use client';

import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { ChevronDown } from "lucide-react";
import { Label } from "./label";

interface DatePickerProps { 
  label: string;
  setDate: (value : any) => void;
  date: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDate, label }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (date) {
      setFormattedDate(format(date, "dd/MM/yyyy"));
    } else {
      setFormattedDate("");
    }
  }, [date]);

  return (
    <div className="flex h-10 w-full relative inline-block flex-col mb-4">
      {label && <Label htmlFor="date">{label}</Label>}
      <div
        className="flex h-10 w-full items-center border border-gray-300 rounded-md px-4 py-2 bg-white cursor-pointer mt-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          value={formattedDate}
          placeholder=""
          readOnly
          className="flex-1 border-none outline-none bg-transparent text-sm"
        />
        <ChevronDown className="ml-2 text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute mt-2 left-0 z-10 bg-white shadow-lg border border-gray-200 rounded-md">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(value: any) => {
              setDate(value);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
