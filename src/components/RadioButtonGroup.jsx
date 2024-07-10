import React, { useState } from "react";

import RadioButton from "@src/components/UI/RadioButton";

const RadioButtonGroup = () => {
  const [selectedOption, setSelectedOption] = useState("everything");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="filter">
      <RadioButton
        id="show_me_everything"
        name="show_me"
        value="everything"
        checked={selectedOption === "everything"}
        onChange={handleChange}
        label="Everything"
      />
      <RadioButton
        id="show_me_not_seen"
        name="show_me"
        value="unwatched"
        checked={selectedOption === "unwatched"}
        onChange={handleChange}
        label="Movies I Haven't Seen"
        disabled
      />
      <RadioButton
        id="show_me_seen"
        name="show_me"
        value="watched"
        checked={selectedOption === "watched"}
        onChange={handleChange}
        label="Movies I Have Seen"
        disabled
      />
    </div>
  );
};

export default RadioButtonGroup;
