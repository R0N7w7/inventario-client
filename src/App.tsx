import { useState } from "react";
import ArticuloForm from "./Articulo/Form";
import ArticuloTable from "./Articulo/Table";

function App() {

  const [isLoading, setIsLoading] = useState(true);


  return (
    <>
      <ArticuloForm
        setLoading={setIsLoading}
      />
      <ArticuloTable
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  )
}

export default App
