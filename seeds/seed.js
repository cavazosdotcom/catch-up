const sequelize = require('../config/connection');
const { User, List, Media } = require('../models');

const userData = require('./userData.json');
const listData = require('./listData.json');
const mediaData = require('./mediaData.json');

/**
 * Leaving for future reference
 */
// const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  /**
   * Leaving for future reference
   */
  
  for (const media of mediaData) {
    const mediaData = {
      ...media,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    };
    console.log(mediaData);
    await Media.create( mediaData );
  }

//   for (const list of listData) {
//     const listData = {
//       ...list,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     };
//     console.log(listData);
//     await List.create( listData );
//   }

  
  process.exit(0);
};

seedDatabase();