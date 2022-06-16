"use strict";
const XLSX = require("xlsx");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async upload(ctx) {
    let body = ctx.request.body;
    let array = [];
    try {
      for (let i = 0; i < body.length; i++) {
        let firstName = body[i].firstName;
        let lastName = body[i].lastName;
        let age = body[i].age;

        let response = {
          firstName: firstName,
          lastName: lastName,
          age: age,
        };
        array.push(response);
        await strapi.services.character.create(response);
      }
      return array;
    } catch (error) {
      return error;
    }
  },

  async excel(ctx) {
    const file = ctx.request.files.file;
    console.log(file);
    // const reader = new FileReader();
    // reader.readAsBinaryString(file);

    // reader.onload = async (evt) => {
    //   const bstr = evt.target.result;
    //   const wb = XLSX.read(bstr, { type: "binary" });
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   let excelRowsObjArr = XLSX.utils.sheet_to_row_object_array(ws);
    //   let array = [];

    //   try {
    //     for (let i = 2; i <= excelRowsObjArr.length + 1; i++) {
    //       let firstName = ws[`A${i}`].v;
    //       let lastName = ws[`B${i}`].v;
    //       let age = ws[`C${i}`].v;
    //       let response = {
    //         firstName: firstName,
    //         lastName: lastName,
    //         age: age,
    //       };
    //       array.push(response);
    //       await strapi.services.character.create(response);
    //     }
    //     return array;
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };
    return file;
  },
};
