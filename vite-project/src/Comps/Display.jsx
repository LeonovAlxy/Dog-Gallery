import { useEffect, useState } from "react";
import "./dogArrComp.css";
import "./spinner.css";

const Display = () => {
  const [dogCount, setDogCount] = useState(3);
  const [dogInputCount, setDogInputCount] = useState("");
  const [dogList, setDogList] = useState([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function dataRequest() {
    setLoading(true); //
    try {
      const data = await fetch(
        `https://dog.ceo/api/breeds/image/random/${dogCount}`
      );
      const response = await data.json();
      setDogList(response.message);
    } catch (err) {
      console.error("Ошибка при загрузке данных", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    dataRequest();
  }, []);

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
  useEffect(() => {
    dataRequest();
  }, [dogCount]);

  return (
    <div>
      <h1>Галерея собак</h1>
      {loading ? (
        <div class="loaderDiv">
          <div class="loader"></div>
        </div>
      ) : (
        <>
          <div className="reloadCountComp">
            <h3>Картинки обновленые: {reloadCount} раз/а</h3>
          </div>
          <div className="inputComp">
            <label>Показать:</label>
            <input
              id="nameInput"
              type="text"
              placeholder="От 1 до 50 себеков "
              onChange={handleInputChange}
              style={{
                border: "1px solid black",
                padding: "5px",
                textAlign: "center",
                borderRadius: "20px",
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleClickDogCount}>Обновить</button>
          </div>
          <div className="dogArrComp">
            {dogList.length > 0 ? (
              dogList.map((item) => (
                <div>
                  <img src={item} alt="Dog" width="200" />
                </div>
              ))
            ) : (
              <p>Загрузка...</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Display;
