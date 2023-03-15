import { ITodoItem, categoriesState, todosState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import styled from "styled-components";

const TodoItem = styled.li`
  position: relative;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
  display: flex;
`;

const DeleteItem = styled.button`
  width: 20px;
  height: 20px;
  padding: 0;

  background: none;
  border: 0;
`;

const Text = styled.div`
  flex: 1;
  line-height: 20px;
  color: #000;
`;

const StateBtn = styled.button`
  background: none;
  margin: 0 5px;
  border: 1px solid silver;
  border-radius: 20px;
`;

export default function Todo({ id, text, category }: ITodoItem) {
  const [todos, setTodos] = useRecoilState(todosState);
  const categories = useRecoilValue(categoriesState);

  const onDeleteTodo = () => {
    setTodos((allTodo) => {
      return allTodo.filter((todo) => todo.id !== id);
    });
  };

  const onModifyCategory = (category: string) => {
    const targetIdx = todos.findIndex((todo) => todo.id === id);
    const frontTodos = todos.slice(0, targetIdx);
    const backTodos = todos.slice(targetIdx + 1);
    const newTodo = {
      id,
      text,
      category,
    };

    setTodos([...frontTodos, newTodo, ...backTodos]);
  };

  return (
    <TodoItem>
      <Text>{text}</Text>
      {categories.map((cate) => {
        return (
          cate !== category && (
            <StateBtn key={cate} onClick={() => onModifyCategory(cate)}>
              {cate}
            </StateBtn>
          )
        );
      })}
      <DeleteItem onClick={onDeleteTodo}>X</DeleteItem>
    </TodoItem>
  );
}
