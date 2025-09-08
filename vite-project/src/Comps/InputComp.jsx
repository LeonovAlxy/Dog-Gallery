import { useState } from "react";
import "./input.css";
const InputComp = ({ setDogCount, reloadCount, setReloadCount }) => {
  const [dogInputCount, setDogInputCount] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    const num = parseInt(value);
    if (isNaN(num)) {
      setError("Пожалуйста, введите число");
      return;
    }
    if (num < 1 || num > 50) {
      setError("Введите число от 1 до 50");
      return;
    }
    setError("");
    setDogInputCount(value);
  };
  const handleClickDogCount = () => {
    if (error || dogInputCount === "") {
      alert("Введите корректное число от 1 до 50");
      return;
    }
    setDogCount(dogInputCount);
    setReloadCount((prev) => prev + 1);
  };
  return (
    <>
      <div className="reloadCountComp">
        <h3>Картинки обновлены: {reloadCount} раз/а</h3>
      </div>
      <div className="inputComp">
        <label>Показать:</label>
        <input
          className="nameInput"
          type="text"
          placeholder="От 1 до 50 себеков "
          onChange={handleInputChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="inputBtn" onClick={handleClickDogCount}>
          Обновить
        </button>
      </div>
    </>
  );
};
export default InputComp;
