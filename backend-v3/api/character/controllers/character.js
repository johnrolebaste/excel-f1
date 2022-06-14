"use strict";

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
};
