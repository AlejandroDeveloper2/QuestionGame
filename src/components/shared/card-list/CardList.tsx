import { CardListProps } from "@models/ComponentPropsModels";

import { Card } from "@components/index";

import { CardListContainer } from "./CardList.style";

const CardList = ({ children }: CardListProps): JSX.Element => {
  return <CardListContainer>{children}</CardListContainer>;
};

CardList.Card = Card;
export default CardList;
