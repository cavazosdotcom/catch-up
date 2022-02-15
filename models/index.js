const User = require("./User");
const List = require("./List");
const Media = require("./Media");

// Define table relationships
List.hasMany(Media);

module.exports = {User, List, Media}; 