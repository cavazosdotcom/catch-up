const User = require("./User");
const List = require("./List");
const Media = require("./Media");

// Define table relationships
// List.belongsTo(User);
Media.belongsToMany(List);

module.exports = {User, List, Media}; 