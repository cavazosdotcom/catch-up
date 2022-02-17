const User = require("./User");
const List = require("./List");
const Media = require("./Media");

// Define table relationships

User.hasMany(List, {
    foreignKey: 'user_id'
});

List.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Media, {
    foreignKey: 'user_id'
});

Media.belongsTo(User, {
    foreignKey: 'user_id'
});

Media.belongsToMany(List, {through: "media_list"});

// List.belongsToMany(Media, {through: "media_list"});
List.hasMany(Media, {through: "media_list"});



module.exports = {User, List, Media}; 