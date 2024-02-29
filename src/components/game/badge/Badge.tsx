import {
  BadgeBaseProps,
  BadgeWithLabelProps,
} from "@models/ComponentPropsModels";

import { Badge, BadgeContainer } from "./Badge.style";

const BadgeBase = ({ Icon, style, value, id }: BadgeBaseProps): JSX.Element => {
  return (
    <Badge {...style} id={id}>
      <Icon />
      <span>{value}</span>
    </Badge>
  );
};

const BadgeWithLabel = ({
  Icon,
  style,
  label,
  value,
  id,
}: BadgeWithLabelProps): JSX.Element => {
  return (
    <BadgeContainer>
      <label>{label}</label>
      <BadgeBase id={id} style={style} Icon={Icon} value={value} />
    </BadgeContainer>
  );
};

export { BadgeWithLabel };
export default BadgeBase;
