import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cities from "../reducers/cities";
const store = configureStore({
  reducer: { cities },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Best friends</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
