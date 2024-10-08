import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import ChannelHome from "./pages/ChannelHome/ChannelHome.jsx"
import Counter from "./pages/ReduxCounter";



const Container = styled.div`
  display: flex;
  // width: 100%;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
// const Wrapper = styled.div`
//   padding: 22px 96px;
// `;
const Wrapper = styled.div;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            {/* <Wrapper> */}
            <div>
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video" element={<Video />} />
                    {/* <Route path=":id" element={<Video />} /> */}
                  <Route path="channelHome" element={<ChannelHome />} />
                  <Route path="counter" element={<Counter/>} />
                </Route>
              </Routes>
            {/* </Wrapper> */}
            </div>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
