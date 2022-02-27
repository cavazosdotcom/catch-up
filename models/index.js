const User = require("./User");
const List = require("./List");
const Media = require("./Media");
const MediaList = require("./MediaList");
const Image = require("./Image");

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
List.belongsToMany(Media, {through: "media_list"});

Media.hasOne(Image, {
    foreignKey: "medium_id"
})

Image.belongsTo(Media, {
    foreignKey: "medium_id"
})



module.exports = {User, List, Media, MediaList, Image}; 