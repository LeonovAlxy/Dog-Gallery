import { useState, useEffect } from "react";
import "./breedsComp.css";
const BreedsComp = ({ setLoading, setBreed }) => {
  const [breedsArr, setBreedsArr] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  async function dataBreedRequest() {
    setLoading(true);
    try {
      const data = await fetch(`https://dog.ceo/api/breeds/list/all`);
      const response = await data.json();
      setBreedsArr(Object.keys(response.message));
    } catch (err) {
      console.error("Ошибка при загрузке данных", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    dataBreedRequest();
  }, []);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  useEffect(() => {
    setBreed(selectedValue);
  }, [selectedValue]);

  return (
    <>
      <form>
        <label>Порода: </label>
        <select
          className="selectBreed"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="---Все породы---"> ---Все породы---</option>
          {breedsArr.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default BreedsComp;
