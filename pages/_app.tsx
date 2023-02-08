import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav />

      <ToastContainer limit={1} />
      <Component {...pageProps} />

      <Footer />
    </div>
  );
}
