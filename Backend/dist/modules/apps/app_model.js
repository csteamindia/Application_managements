"use strict";
module.exports = function (sequelize, DataTypes) {
    const apps = sequelize.define("apps", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        app_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        admin_url: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        domain_expiry_date: {
            type: DataTypes.DATE(),
            allowNull: false,
        },
        database: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        database_host: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        database_username: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        database_password: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        last_backup: {
            type: DataTypes.DATE(),
            allowNull: false,
        },
        app_status: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
    }, {
        tableName: "apps",
        timestamps: false,
        underscored: true,
    });
    apps.associate = function (models) {
        apps.hasMany(models.users, {
            targetKey: "app_id",
        });
    };
    return apps;
};
