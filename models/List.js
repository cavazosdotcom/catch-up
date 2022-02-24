const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const MediaList = require("./MediaList")

class List extends Model{

    async addMedia(medium_id){
        const inList = await MediaList.findOne({
            where: {
                list_id: this.id,
                medium_id
            }
        });
        if(!inList){
            return await MediaList.create({
                list_id: this.id,
                medium_id 
            });
        }
        return null;
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