import { LoadingWindowProps } from "@models/ComponentPropsModels";

import { Logo } from "@components/index";

import { LoadingWindowContainer, Content } from "./LoadingWindow.style";
import { IconIllustration1, IconIllustration2 } from "@assets/index";

const LoadingWindow = ({
  children,
  opacity,
  isLoading,
}: LoadingWindowProps): JSX.Element => {
  return (
    <LoadingWindowContainer opacity={opacity} isLoading={String(isLoading)}>
      <IconIllustration1 />
      <IconIllustration2 />
      <Content>
        <Logo
          width={{ sm: 200, md: 300, lg: 350 }}
          height={{ sm: 200, md: 300, lg: 350 }}
        />
        {children}
      </Content>
    </LoadingWindowContainer>
  );
};

export default LoadingWindow;
