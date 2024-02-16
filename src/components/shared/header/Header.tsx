import { HeaderProps } from "@models/ComponentPropsModels";
import { HeaderContainer } from "./Header.style";

const Header = (props: HeaderProps): JSX.Element => {
  const { children, style } = props;
  return <HeaderContainer {...style}>{children}</HeaderContainer>;
};

export default Header;
