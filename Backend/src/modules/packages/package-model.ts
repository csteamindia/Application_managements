module.exports = function (sequelize: any, DataTypes: any) {
    const packages = sequelize.define(
      "packages",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        package_name: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT(),
          allowNull: false,
        },
        price: {
          type: DataTypes.REAL,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING(20),
          defaultValue: "monthly",
        },
      },
      {
        tableName: "packages",
        timestamps: false,
        underscored: true,
      }
    );
    return packages;
  };
  