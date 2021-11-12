import { Header } from "./Header";
import { SearchBox } from "./SearchBox";
import { Bottom } from "./Bottom";
import { useState, useEffect } from "react";
// import axios from "axios";
export const Search = () => {
  const [dataa, setData] = useState([]);
  const handleSelect = async (select) => {
    let isMount = true;
    if (isMount) {
      let promise = async () => {
        const data = await fetch(
          `http://api.aviationstack.com/v1/flights?limit=100&dep_iata=${select.from}&arr_iata=${select.to}&access_key=c005940e7115ec7707becad3f0008052
          `
        );
        let ans = await data.json();
        ans = ans.data;
        if (ans.length === 0) {
          alert("No planes are available");
        } else {
          setData(ans);
        }
      };
      promise();
    }
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let x = localStorage.getItem("myKey");
      let y = JSON.parse(x);
      let promise = async () => {
        const data = await fetch(
          `http://api.aviationstack.com/v1/flights?limit=100&dep_iata=${y.from}&arr_iata=${y.to}&access_key=c005940e7115ec7707becad3f0008052
          `
        );
        let ans = await data.json();
        ans = ans.data;
        if (ans.length === 0) {
          alert("No planes are available");
        } else {
          setData(ans);
        }
      };
      promise();
    }
  }, []);

  const bookData = (e) => {
    localStorage.setItem("buy", JSON.stringify(e));
  };
  return (
    <>
      <Header />
      <SearchBox handle={handleSelect} />
      <Bottom data={dataa} bookData={bookData} />
    </>
  );
};
