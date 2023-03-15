import { ITheme, themeState } from "../atoms";

import styled from "styled-components";
import { useRecoilState } from "recoil";

const HeaderWrapper = styled.header`
  position: relative;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  line-height: 40px;
  font-weight: 600;
`;

const ThemeBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 30px;
  background: #fff;
  border: 1px solid #000;
`;

export default function Header() {
  const [theme, setTheme] = useRecoilState(themeState);

  const onToggleTheme = () => {
    setTheme((theme) => {
      if (theme === ITheme.Light) return ITheme.Dark;
      return ITheme.Light;
    });
  };

  return (
    <HeaderWrapper>
      <Title>Todo List</Title>
      <ThemeBtn onClick={onToggleTheme}>
        {theme === ITheme.Light ? ITheme.Dark : ITheme.Light}
      </ThemeBtn>
    </HeaderWrapper>
  );
}
