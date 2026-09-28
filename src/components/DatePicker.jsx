import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerDemo() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{ marginTop: "30px" }}>
      <p>Select a date:</p>

      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Select a date"
        dateFormat="dd/MM/yyyy"
      />

      {selectedDate && (
        <p>
          Selected Date: {selectedDate.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

export default DatePickerDemo;