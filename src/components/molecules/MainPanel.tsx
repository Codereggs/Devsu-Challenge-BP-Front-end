import { useState } from "react";

import { MainPanelProps } from "@src/features/interfaces/pokemons.interface";
import CustomizedButton from "@src/components/atoms/CustomizedButton";
import { savePokemon, updatePokemon } from "@src/features/request/service";

import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";

const MainPanel: React.FC<MainPanelProps> = ({
  showEdit,
  editData,
  setReload,
}) => {
  const [attack, setAttack] = useState(editData?.attack ?? "50");
  const [defense, setDefense] = useState(editData?.defense ?? "50");
  const [name, setName] = useState(editData?.name ?? "");
  const [img, setImg] = useState(editData?.image ?? "");

  const setDisabled: () => boolean = () => {
    if (!attack || !defense || !name || !img) return true;
    return false;
  };

  return (
    <div className="edition-panel">
      <p className="new-pokemon-title">
        {!editData ? "Nuevo Pokemon" : "Editar Pokemon"}
      </p>
      <div className="data-panel">
        <div className="information">
          <div className="name-box">
            <span>Nombre:</span>
            <input
              type="text"
              placeholder="Nombre"
              defaultValue={editData?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="img-box">
            <label>Imagen:</label>
            <input
              type="url"
              placeholder="Url"
              defaultValue={editData?.image}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        </div>
        <div className="stats">
          <div className="attack-box">
            <label htmlFor="attack">Ataque:</label>
            <div className="attack-bar">
              <span>0</span>
              <input
                id="attack"
                type="range"
                min="0"
                max="100"
                step="1"
                defaultValue={attack}
                onChange={(e) => setAttack(e.target.value)}
              />
              <span>100</span>
            </div>
          </div>
          <div className="defense-box">
            <label htmlFor="defense">Defensa:</label>
            <div className="defense-bar">
              <span>0</span>
              <input
                id="defense"
                type="range"
                min="0"
                max="100"
                step="1"
                defaultValue={defense}
                onChange={(e) => setDefense(e.target.value)}
              />
              <span>100</span>
            </div>
          </div>
        </div>
      </div>
      <div className="button-box">
        <CustomizedButton
          text="Guardar"
          icon={<AiOutlineSave />}
          disabled={setDisabled()}
          returnFunction={() => {
            if (editData?.id) {
              updatePokemon(
                {
                  name: name,
                  image: img,
                  type: editData.type,
                  hp: editData.hp,
                  attack: attack,
                  defense: defense,
                  idAuthor: editData.idAuthor,
                },
                editData.id
              );
              setReload(true);
            } else {
              savePokemon({
                name: name,
                image: img,
                type: "normal",
                hp: 100,
                attack: attack,
                defense: defense,
                idAuthor: 1,
              });
              setReload(true);
            }
            showEdit({ show: false, data: undefined });
          }}
        />
        <CustomizedButton
          text="Cancelar"
          icon={<AiOutlineClose />}
          returnFunction={() => showEdit({ show: false, data: undefined })}
        />
      </div>
    </div>
  );
};

export default MainPanel;
