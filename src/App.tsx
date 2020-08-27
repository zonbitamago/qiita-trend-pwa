import React, { Suspense, lazy } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Main = lazy(() => import("./components/Main"));
const Graph = lazy(() => import("./components/Graph"));

function App() {
  return (
    <Layout>
      <Router>
        <Header />
        <MainContainer>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/graph">
                <Graph />
              </Route>
              <Route exact path="/">
                <Main />
              </Route>
            </Switch>
          </Suspense>
        </MainContainer>
      </Router>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr;
  width: 100vw;
  height: 100vh;
`;

const MainContainer = styled.main`
  background-color: #f0f0f0;
  height: 100%;
`;

export default App;
