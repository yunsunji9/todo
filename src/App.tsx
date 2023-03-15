import { ITheme, categoriesState, themeState } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

import Board from "./components/Board";
import CreateCategory from "./components/CreateCategory";
import CreateTodo from "./components/CreateTodo";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

const Wrapper = styled.div`
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
`;

const Inner = styled.div`
  max-width: 750px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
`;

function App() {
  const theme = useRecoilValue(themeState);
  const categories = useRecoilValue(categoriesState);

  return (
    <ThemeProvider theme={theme === ITheme.Dark ? darkTheme : lightTheme}>
      <Wrapper>
        <Inner>
          <Header />
          <CreateCategory />
          <CreateTodo />
          {categories.map((category) => (
            <Board key={category} category={category} />
          ))}
        </Inner>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
