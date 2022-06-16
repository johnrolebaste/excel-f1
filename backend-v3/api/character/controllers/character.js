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
    const file = ctx.request.files.files;
    const workbook = XLSX.readFile(file.path);
    const wsname = workbook.SheetNames[0];
    const wsdata = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
    const array = [];
    try {
      for (let i = 0; i <= wsdata.length; i++) {
        let firstName = wsdata[i]["First Name"];
        let lastName = wsdata[i]["Last Name"];
        let age = wsdata[i].Age;
        let response = {
          firstName: firstName,
          lastName: lastName,
          age: age,
        };
        await array.push(response);
        await strapi.services.character.create(response);
      }
    } catch (error) {
      return error;
    }
  },
};
