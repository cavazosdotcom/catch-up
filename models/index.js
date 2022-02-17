const User = require("./User");
const List = require("./List");
const Media = require("./Media");

// Define table relationships
List.belongsTo(User, {
    foreignKey: 'user_id'
});
Media.belongsToMany(List, {through: "media_list"});


module.exports = {User, List, Media}; 