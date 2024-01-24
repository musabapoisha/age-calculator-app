import "./App.css";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <div className="section">
          <InputForm />
          <Result />
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
