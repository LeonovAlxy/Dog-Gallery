import { useEffect, useState } from "react";
import "./dogArrComp.css";
import "./spinner.css";
import InputComp from "./InputComp";
import BreedsComp from "./BreedsComp";

const Display = () => {
  const [dogCount, setDogCount] = useState(3);
  const [dogList, setDogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [breed, setBreed] = useState("");
  const [reloadCount, setReloadCount] = useState(-1);

  async function dataRequestRandom() {
    setLoading(true);
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

  async function dataRequestByBreed() {
    setLoading(true);
    try {
      const data = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/${dogCount}`
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
    dataRequestRandom();
  }, []);

  useEffect(() => {
    breed === "" || breed === "---Все породы---"
      ? dataRequestRandom()
      : dataRequestByBreed();
  }, [dogCount, breed]);
  useEffect(() => setReloadCount((prev) => prev + 1), [breed]);

  return (
    <div>
      <InputComp
        setDogCount={setDogCount}
        setReloadCount={setReloadCount}
        reloadCount={reloadCount}
      />
      <BreedsComp setLoading={setLoading} setBreed={setBreed} />
      <>
        {loading ? (
          <div className="loaderDiv">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="dogArrComp">
            {dogList.map((item) => (
              <div>
                <img src={item} alt="Dog" width="200" />
              </div>
            ))}
          </div>
        )}
      </>
    </div>
  );
};
export default Display;
