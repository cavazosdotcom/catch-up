const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const {MediaList} = require("./MediaList")

class List extends Model{

    async addMedia(media_id){
        return await Model.create({
            list_id: this.id,
            media_id 
        });
    }

}

List.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "list"
    }
)

module.exports = List;