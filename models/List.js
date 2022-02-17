const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const MediaList = require("./MediaList")

class List extends Model{

    async addMedia(medium_id){
        return await MediaList.create({
            list_id: this.id,
            medium_id 
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
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "list"
    }
)

module.exports = List;