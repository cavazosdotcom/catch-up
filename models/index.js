const User = require("./User");
const List = require("./List");
const Media = require("./Media");

// Define table relationships

List.belongsTo(User, {
    foreignKey: 'user_id'
});

List.hasMany(Media, {
    foreignKey: 'media_id',
    onDelete: 'Cascade'
})

// Media.belongsToMany(List);

module.exports = {User, List, Media}; 