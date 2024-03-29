import { GrSearch } from "react-icons/gr";
import { MdOutlineCategory } from "react-icons/md";

import useCategoryStore from "@zustand/categoryStore";
import { useSearch } from "@hooks/index";
import { Category } from "@models/DataModels";

import { CardList, Empty, Header, Input, Spinner } from "@components/index";

import { TitleContainer } from "@components/shared/header/Header.style";

const CategoriesPage = (): JSX.Element => {
  const categories = useCategoryStore((state) => state.categories);
  const isLoading = useCategoryStore((state) => state.isLoading);

  const { searchValue, records, handleSearch } = useSearch<Category>(
    categories,
    "name"
  );

  return (
    <>
      <Header
        style={{
          height: { sm: 344, md: 300, lg: 300 },
          direction: { sm: "column", md: "column", lg: "column" },
        }}
      >
        <TitleContainer>
          <h1>Panel de administración</h1>
        </TitleContainer>
        <Input
          type="text"
          placeholder="Ejemplo: Matemáticas"
          label="Buscar Categoría"
          name="category"
          value={searchValue}
          Icon={GrSearch}
          onChange={handleSearch}
          errorMessage=""
        />
      </Header>
      <h2>Categorias ({records.length})</h2>
      {isLoading ? (
        <Spinner message="Cargando categorias..." />
      ) : (
        <CardList>
          {records.length > 0 ? (
            records.map((category) => (
              <CardList.Card
                key={category.id}
                Icon={MdOutlineCategory}
                title={category.name}
                id={category.id}
                data={category}
                type="category"
              />
            ))
          ) : (
            <Empty />
          )}
        </CardList>
      )}
    </>
  );
};

export default CategoriesPage;
