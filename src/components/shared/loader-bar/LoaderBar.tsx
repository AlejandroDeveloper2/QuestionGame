import { LoaderProps } from "@models/ComponentPropsModels";

import { Load, LoaderBody, LoaderContainer } from "./LoaderBar.style";

const LoaderBar = ({ load }: LoaderProps): JSX.Element => {
  return (
    <LoaderContainer>
      <LoaderBody>
        <Load load={load}></Load>
      </LoaderBody>
      <span>Cargando...</span>
    </LoaderContainer>
  );
};

export default LoaderBar;
