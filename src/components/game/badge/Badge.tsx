import {
  BadgeBaseProps,
  BadgeWithLabelProps,
} from "@models/ComponentPropsModels";

import { Badge, BadgeContainer } from "./Badge.style";

const BadgeBase = ({ Icon, style, value }: BadgeBaseProps): JSX.Element => {
  return (
    <Badge {...style}>
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
}: BadgeWithLabelProps): JSX.Element => {
  return (
    <BadgeContainer>
      <label>{label}</label>
      <BadgeBase style={style} Icon={Icon} value={value} />
    </BadgeContainer>
  );
};

export { BadgeWithLabel };
export default BadgeBase;
