import { categoryState, todosState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

import SelectCategory from "./SelectCategory";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  padding: 10px;
  background: rgba(223, 230, 233, 0.3);
  border-radius: 5px;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  height: 30px;
  border: 0;
  background: #fff;
  font-size: 14px;
  padding: 0 10px;
`;

const SubmitBtn = styled.button`
  width: 30px;
  height: 30px;
  background: rgba(99, 110, 114, 1);
  border: 0;
  border-radius: 0;
  color: #fff;
  font-size: 20px;
`;

const ErrorText = styled.div`
  margin: 10px 0;
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.errorColor};
`;

export default function CreateTodo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const setTodos = useSetRecoilState(todosState);
  const categoryVal = useRecoilValue(categoryState);

  const onValid = ({ todo }: any) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
      category: categoryVal,
    };

    setTodos((allTodo) => {
      return [newTodo, ...allTodo];
    });
    setValue("todo", "");
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <SelectCategory />
          <Input
            type="text"
            {...register("todo", { required: "todo를 입력해주세요" })}
            placeholder="todo를 추가해주세요."
          />
          <SubmitBtn>+</SubmitBtn>
        </Form>
      </Wrapper>
      {errors?.todo?.message && <ErrorText>{errors?.todo?.message + ""}</ErrorText>}
    </>
  );
}
