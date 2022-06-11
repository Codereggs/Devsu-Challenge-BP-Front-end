import "../../assets/App.css";

import { useEffect, useState } from "react";

import { getPokemons, getQuantity } from "@src/features/request/service";
import SearchBar from "@components/atoms/SearchBar";
import PokemonTable from "@components/molecules/PokemonTable";
import MainPanel from "@components/molecules/MainPanel";

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
        <SearchBar showEdit={setShowEdit} setPokemonList={setPokemonList} />
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
