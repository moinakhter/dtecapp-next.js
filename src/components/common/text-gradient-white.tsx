import React from "react";

const TextGradientWhite = ({
  text,
  className = "text-6xl  mb-2.5 ",
}: {
  text?: string;
  className?: string;
} = {}) => {
  return (
    <h2
      className={`${className} mb-2.5 font-black  dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)]`}
    >
      {text}
    </h2>
  );
};

export default TextGradientWhite;
