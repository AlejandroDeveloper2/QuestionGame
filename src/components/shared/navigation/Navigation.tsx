import { useLocation } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { MdOutlineCategory, MdAdd } from "react-icons/md";

import { NavigationProps } from "@models/ComponentPropsModels";

import { ButtonIconOnly } from "@components/index";

import { Nav, ItemLink } from "./Navigation.style";

const Navigation = ({ addingFunction }: NavigationProps): JSX.Element => {
  const location = useLocation();
  const getItemActive = (to: string): string => {
    if (location.pathname === to) return "var(--primary-color-base)";
    return "var(--gray)";
  };

  return (
    <Nav>
      <ItemLink to="/admin" color={getItemActive("/admin")}>
        <RiHomeLine />
        <span>Inicio</span>
      </ItemLink>
      <ButtonIconOnly
        type="button"
        Icon={MdAdd}
        style={{
          background: "var(--primary-color-base)",
          color: "var(--white)",
          width: {
            sm: 72,
            md: 72,
            lg: 72,
          },
          height: {
            sm: 72,
            md: 72,
            lg: 72,
          },
        }}
        title={"Agregar nueva pregunta"}
        onClick={() => addingFunction()}
      />
      <ItemLink
        to="/admin/categories"
        color={getItemActive("/admin/categories")}
      >
        <MdOutlineCategory />
        <span>Categorías</span>
      </ItemLink>
    </Nav>
  );
};

export default Navigation;
