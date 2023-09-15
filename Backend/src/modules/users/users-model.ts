module.exports = function (sequelize: any, DataTypes: any) {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      app_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      privileges: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      package_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },// from package model
      org_name: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      org_type: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      subscribed_date: {
        type: DataTypes.DATE(),
        allowNull: true,
      },
      expiry_date: {
        type: DataTypes.DATE(),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      tableName: "users",
      timestamps: false,
      underscored: true,
    }

    );
    users.associate = function(models:any){
      users.belongsTo(models.packages,{
        foreignKey:'package_id',
        as:"package",
      })
    }
  return users;
};
