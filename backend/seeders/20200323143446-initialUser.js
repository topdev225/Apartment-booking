'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [
      {
        userName: 'admin',
        email: 'admin@gmail.com',
        password: '$2a$10$WeEQZC0kKKgnMHVk0XnDSevRSJdFIuR29wJkMcaeMt6hkTWRPAtMO', // TestAdmin
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    // return queryInterface.bulkInsert('Apartments', [
    //   {
    //     name: "single economy",
    //     slug: "single-economy",
    //     price: parseFloat(100),
    //     size: parseFloat(200),
    //     roomCount: 1,
    //     imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585149031933ourRooms.jpeg?alt=media&token=2575d3f7-53ab-4093-ae8a-703cdc9feb8a",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userID: "2",
    //     status: 0,
    //     description: "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
    //     latitude: 30.251400,
    //     longitude: -97.749380,
    //   },
    //   {
    //     name: "single basic",
    //     slug: "single-basic",
    //     price: parseFloat(150),
    //     size: parseFloat(250),
    //     roomCount: 1,
    //     imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585149031933ourRooms.jpeg?alt=media&token=2575d3f7-53ab-4093-ae8a-703cdc9feb8a",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userID: "2",
    //     status: 0,
    //     description: "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
    //     latitude: 30.247366,
    //     longitude: -97.750114,
    //   },
    //   {
    //     name: "single standard",
    //     slug: "single-standard",
    //     price: parseFloat(250),
    //     size: parseFloat(300),
    //     roomCount: 1,
    //     imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585149031933ourRooms.jpeg?alt=media&token=2575d3f7-53ab-4093-ae8a-703cdc9feb8a",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userID: "2",
    //     status: 0,
    //     description: "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
    //     latitude: 30.261130,
    //     longitude: -97.786660
    //   },
    //   {
    //     name: "single deluxe",
    //     slug: "single-deluxe",
    //     price: parseFloat(300),
    //     size: parseFloat(400),
    //     roomCount: 1,
    //     imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585149031933ourRooms.jpeg?alt=media&token=2575d3f7-53ab-4093-ae8a-703cdc9feb8a",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userID: "2",
    //     status: 0,
    //     description: "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
    //     latitude: 30.235650,
    //     longitude: -97.740640
    //   },
    //   {
    //     name: "double economy",
    //     slug: "double-economy",
    //     price: parseFloat(200),
    //     size: parseFloat(300),
    //     roomCount: 2,
    //     imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585149031933ourRooms.jpeg?alt=media&token=2575d3f7-53ab-4093-ae8a-703cdc9feb8a",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userID: "2",
    //     status: 0,
    //     description: "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
    //     latitude: 30.265820,
    //     longitude: -97.746887
    //   },
    //   {
    //     name: "double basic",
    //     slug: "double-basic",
    //     price: parseFloat(250),
    //     size: parseFloat(300),
    //     roomCount: 2,
    //     imageUrl: "https://firebasestorage.googleapis.com/v0/b/apartmentbook-6fc13.appspot.com/o/images%2F1585149031933ourRooms.jpeg?alt=media&token=2575d3f7-53ab-4093-ae8a-703cdc9feb8a",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     userID: "2",
    //     status: 0,
    //     description: "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray. Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo. Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.",
    //     latitude: 30.2627887,
    //     longitude: -97.7439651
    //   }
    // ], {});
  },
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
