import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "pages/Home";
import Donation from "pages/Donation";
import Header from "components/Header";
import Footer from "components/Footer";
import GlobalStyle from "./globalStyles";
import { FlexGrowDiv } from "./styles";

function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Weather App" defaultTitle="">
        <meta
          name="description"
          content="View and forecast your favourite city weather"
        />
      </Helmet>
      <Header />
      <FlexGrowDiv>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/donation/:busstopid" component={Donation} />
        </Switch>
      </FlexGrowDiv>
      <Footer />
      <GlobalStyle />
    </>
  );
}

App.propTypes = {};

export default App;
