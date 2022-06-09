import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

export default function Display() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/characters", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data.data.map((details) => details.attributes)));
  }, []);

  const onChange = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      for (let i = 2; i < 99; i++) {
        const firstName = ws[`A${i}`].v;
        const lastName = ws[`B${i}`].v;
        const age = ws[`C${i}`].v;

        fetch("http://localhost:1337/api/characters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              firstName: firstName,
              lastName: lastName,
              age: age,
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => data);
      }
    };
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
