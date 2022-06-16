import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Display() {
  const [data, setData] = useState([]);

  const percent = (value, total) => Math.round((value / total) * 100);

  useEffect(() => {
    fetch("http://localhost:1337/characters", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const onChange = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);

    const data = new FormData();
    data.append("files", e.target.files[0]);

    await fetch("http://localhost:1337/characters/excel", {
      method: "POST",
      body: data,
    });
  };

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <input type="file" onChange={onChange} />
    </>
  );
}
