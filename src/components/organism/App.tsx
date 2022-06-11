import { useEffect, useState } from "react";
import "../../assets/App.css";
import SearchBar from "../atoms/SearchBar";
import MainPanel from "../molecules/MainPanel";
import PokemonTable from "../molecules/PokemonTable";
import { getPokemons, getQuantity } from "../../features/request/service";

function App() {
  const [pokemonList, setPokemonList] = useState<any>([]);
  const [showEdit, setShowEdit] = useState({ show: false, data: undefined });
  const [reload, setReload] = useState(false);
  const [quantityOfPokemons, setQuantityOfPokemons] = useState<number>(10);

  const requestData = () => {
    const data = getPokemons();
    data.then((pokemons) => setPokemonList(pokemons));
    const quantityPokemons = getQuantity();
    quantityPokemons.then((quantity) => setQuantityOfPokemons(quantity));
    setReload(false);
  };

  useEffect(() => {
    if (reload) return requestData();
    requestData();
  }, [showEdit, reload]);

  useEffect(() => {
    requestData();
  }, []);

  return (
    <div className="app">
      <div>
        <SearchBar
          showEdit={setShowEdit}
          setPokemonList={setPokemonList}
          setReload={setReload}
        />
      </div>
      <div>
        {!showEdit?.show && (
          <>
            <PokemonTable
              data={pokemonList}
              showEdit={setShowEdit}
              setReload={setReload}
            />
            <div className="quantity" data-testid="quantity">
              Cantidad de Pokemons: {quantityOfPokemons}
            </div>
          </>
        )}
      </div>
      <div>
        {showEdit?.show && (
          <MainPanel
            editData={showEdit?.data}
            showEdit={setShowEdit}
            setReload={setReload}
          />
        )}
      </div>
    </div>
  );
}

export default App;
