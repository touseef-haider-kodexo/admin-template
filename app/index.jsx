import "core-js/stable";
import "regenerator-runtime/runtime";
import { hot } from "react-hot-loader/root";
import React from "react";
import ReactDOM from "@hot-loader/react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { QueryClientProvider, QueryClient } from "react-query";
// import { useDispatch } from "react-redux";

import theme from "@/styles/theme";
import GlobalStyle from "@/styles/global-style";
import store from "@/redux/store";
import history from "@/utils/history";
import Routes from "@/routes";

const client = new QueryClient();

const App = hot(() => (
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  </QueryClientProvider>
));

ReactDOM.render(<App />, document.getElementById("app"));
