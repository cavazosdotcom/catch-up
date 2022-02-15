const User = require("./User");
const List = require("./List");
const Media = require("./Media");

// Define table relationships
List.belongsTo(User);
List.hasMany(Media); // May not be correct? Since List just has an array of media(id)

module.exports = {User, List, Media}; 