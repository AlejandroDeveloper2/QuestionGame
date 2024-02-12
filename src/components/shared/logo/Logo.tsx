import { LogoProps } from "@models/ComponentPropsModels";
import { LogoContainer, LogoFirstLayer, LogoSecondLayer } from "./Logo.style";
import { LogoIcon } from "@assets/index";

const Logo = ({ width, height }: LogoProps): JSX.Element => {
  return (
    <LogoContainer width={width} height={height}>
      <LogoFirstLayer>
        <LogoSecondLayer>
          <LogoIcon />
          <span>quiz game</span>
        </LogoSecondLayer>
      </LogoFirstLayer>
    </LogoContainer>
  );
};

export default Logo;
