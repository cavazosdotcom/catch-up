const sequelize = require('../config/connection');
const { User, List, Media } = require('../models');

const userData = require('./userData.json');
const mediaData = require('./mediaData.json');
const maxID = userData.length;

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  const media = await Media.bulkCreate(mediaData, {
      returning: true
  });

  for(let i = 1; i < maxID; i++){
    let list = await List.create({user_id: i});
    console.log(list.id);
    for(let j = Math.floor(Math.random() * 4) + 2; j > 0; j--){ //List 2 to 6 random media.
      await list.addMedia(Math.floor(Math.random * mediaData.length) + 1);
    }
  }
  
  process.exit(0);
};

seedDatabase();