import { categoriesState } from "../atoms";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  padding: 10px;
  background: rgba(223, 230, 233, 0.3);
  border-radius: 5px;
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

export default function CreateCategory() {
  const setCategories = useSetRecoilState(categoriesState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onValid = ({ category }: any) => {
    setCategories((allCategories) => {
      return [...allCategories, category];
    });
    setValue("category", "");
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            type="text"
            placeholder="category 추가해주세요"
            {...register("category", { required: "카테고리를 입력해주세요" })}
          />
          <SubmitBtn>+</SubmitBtn>
        </Form>
      </Wrapper>
      {errors?.category?.message && <ErrorText>{errors?.category?.message + ""}</ErrorText>}
    </>
  );
}
