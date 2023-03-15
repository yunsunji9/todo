import { ITodoItem, categoriesState, todoSelector, todosState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Todo from "./Todo";
import styled from "styled-components";

const BoardWrapper = styled.div`
  margin: 20px 20px;
  background: rgba(223, 230, 233, 0.3);
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h2`
  position: relative;
  font-size: 18px;
  margin-bottom: 20px;
`;

const DeleteCategory = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
  border: 0;
  background: rgb(99, 110, 114);
  color: #fff;
  padding: 0;
`;

export default function Board({ category }: { category: string }) {
  const setTodos = useSetRecoilState(todosState);
  const setCategories = useSetRecoilState(categoriesState);
  const toDoSelector = useRecoilValue(todoSelector);

  const onDeleteCategory = (categoryId: string) => {
    setCategories((allCategories) => {
      return allCategories.filter((category) => category !== categoryId);
    });

    setTodos((allTodos) => {
      return allTodos.filter((todo) => todo.category !== categoryId);
    });
  };

  return (
    <BoardWrapper>
      <Title>
        {category}
        <DeleteCategory onClick={() => onDeleteCategory(category)}>X</DeleteCategory>
      </Title>
      <ul>
        {toDoSelector[category].map((todo: ITodoItem) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </BoardWrapper>
  );
}
