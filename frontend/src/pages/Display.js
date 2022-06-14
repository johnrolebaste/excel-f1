import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function Display() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/characters", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
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
      let excelRowsObjArr = XLSX.utils.sheet_to_row_object_array(ws);

      let array = [];

      try {
        for (let i = 2; i <= excelRowsObjArr.length + 1; i++) {
          let firstName = ws[`A${i}`].v;
          let lastName = ws[`B${i}`].v;
          let age = ws[`C${i}`].v;
          let details = {
            firstName: firstName,
            lastName: lastName,
            age: age,
          };
          array.push(details);
        }
        fetch("http://localhost:1337/characters/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(array),
        })
          .then((res) => res.json())
          .then((data) => data);

        window.location.reload(false);
      } catch (error) {
        console.log("error", error);
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
