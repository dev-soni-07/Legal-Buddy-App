import Alert from "@/components/Alert";
import { StateContext } from "@/context/Statecontext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Alert />
      <Component {...pageProps} />
    </StateContext>
  );
}
