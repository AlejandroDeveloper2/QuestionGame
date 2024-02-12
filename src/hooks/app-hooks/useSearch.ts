import { useEffect, useState } from "react";

const useSearch = <T>(recordList: T[], filterKey: string) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [records, setRecords] = useState<T[]>(recordList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    const searchElement = (): void => {
      if (searchValue === "") {
        setRecords(recordList);
        return;
      }
      const results = recordList.filter((item) => {
        const newItem = Object(item);
        return newItem[filterKey]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      const parsedResults = results as T[];
      setRecords(parsedResults);
    };
    searchElement();
  }, [searchValue, recordList, filterKey]);

  return {
    searchValue,
    records,
    handleSearch,
  };
};

export default useSearch;
