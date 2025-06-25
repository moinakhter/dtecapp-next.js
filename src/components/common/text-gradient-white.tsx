import React from "react";
import FadeText from "./FadeText";

const TextGradientWhite = ({
  text,
  className = "text-6xl mb-2.5",
  children,
}: {
  text?: string;
  className?: string;
  children?: React.ReactNode;
} = {}) => {
  return (
              <FadeText>

    <h2
      className={`${className} lg:leading-[1.1] font-black 
        dark:text-transparent dark:bg-clip-text dark:bg-[linear-gradient(311deg,_#FAFAFA_14%,_#CDCDCD_36%,_#999999_52%,_#E2E2E2_69%,_#FAFAFA_89%)] 
        text-transparent bg-clip-text bg-[linear-gradient(90deg,_#212121_14%,_#424242_36%,_#616161_52%,_#424242_69%,_#212121_100%)]`}
    >
      {text}
      {children}
    </h2>
    </FadeText>
  );
};

export default TextGradientWhite;
