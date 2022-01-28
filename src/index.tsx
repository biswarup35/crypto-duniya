import ReactDom from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";

const theme = createTheme({});

ReactDom.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
  document.querySelector("#root")
);
