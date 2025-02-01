import React, { useState, useContext, useEffect } from "react";
import { MuebleContext } from "../Context/MuebleContext";
import { Input, Button } from "@chakra-ui/react";

const DateSelector = () => {
  const { setRol, getFurniture } = useContext(MuebleContext);
  const [simpledate, setSimpleDate] = useState("");

  const handleDateChange = (event) => {
    setSimpleDate(event.target.value);
  };

  useEffect(() => {
    if (simpledate) {
      getFurniture(); // Call to fetch furniture availability when date changes
    }
  }, [simpledate, getFurniture]);

  return (
    <div>
      <Input
        type="date"
        value={simpledate}
        onChange={handleDateChange}
        placeholder="Select a date"
      />
      <Button onClick={() => getFurniture()}>Check Availability</Button>
    </div>
  );
};

export default DateSelector;
