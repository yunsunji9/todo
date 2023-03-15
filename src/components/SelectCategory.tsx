import { categoriesState, categoryState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import styled from "styled-components";

const Select = styled.select`
  border: 0;
  font-size: 14px;
`;

export default function SelectCategory() {
  const [categoryVal, setCategoryVal] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoriesState);

  const onChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    const optionVal = e.currentTarget.value;
    setCategoryVal(optionVal);
  };

  return (
    <Select onInput={onChangeSelect} defaultValue={categoryVal}>
      {categories.map((category) => (
        <option key={category}>{category}</option>
      ))}
    </Select>
  );
}
