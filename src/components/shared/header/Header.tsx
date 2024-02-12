import { HeaderProps } from "@models/ComponentPropsModels";
import { HeaderContainer, TitleContainer } from "./Header.style";

const Header = (props: HeaderProps): JSX.Element => {
  const { headingText, children, style, welcomeText } = props;
  return (
    <HeaderContainer {...style}>
      <TitleContainer>
        <h1>{headingText}</h1>
        {welcomeText ? (
          <p>
            <span>Bienvenido:</span>
            {" " + welcomeText}
          </p>
        ) : null}
      </TitleContainer>
      {children}
    </HeaderContainer>
  );
};

export default Header;
