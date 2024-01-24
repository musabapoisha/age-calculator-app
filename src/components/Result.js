import React from "react";
import { useSelector } from "react-redux";

export default function Result() {
  const years = useSelector((state) => state.date.years);
  const months = useSelector((state) => state.date.months);
  const days = useSelector((state) => state.date.days);
  return (
    <div className="result">
      <h1>
        <span>{years}</span>years
      </h1>
      <h1>
        <span>{months}</span>
        {months > 1 ? "months" : "month"}
      </h1>
      <h1>
        <span>{days}</span>
        {days > 1 ? "days" : "day"}
      </h1>
    </div>
  );
}
