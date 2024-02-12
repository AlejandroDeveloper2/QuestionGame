import { SpinnerProps } from "@models/ComponentPropsModels";

import "./Spinner.css";
import { SpinnerContainer } from "./Spinner.style";

const Spinner = ({ message, color }: SpinnerProps): JSX.Element => {
  const points = Array(12).fill(".");
  return (
    <SpinnerContainer>
      <div>
        <div className="lds-default">
          {points.map((_, i) => (
            <div
              key={i}
              className={
                color ? "lds-default-color-primary" : "lds-default-color-white"
              }
            ></div>
          ))}
        </div>
      </div>
      {message ? (
        <span style={{ color: color ? color : "var(--white)" }}>{message}</span>
      ) : null}
    </SpinnerContainer>
  );
};

export default Spinner;
