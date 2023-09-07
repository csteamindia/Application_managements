"use strict";
module.exports = function (sequelize, DataTypes) {
    const DemoCreds = sequelize.define('demo_creds', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    }, {
        tableName: "demo_creds",
        timestamps: false,
        underscored: true,
    });
    return DemoCreds;
};
