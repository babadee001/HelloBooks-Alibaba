module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    membership: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // None
      },
    },
  });
  return User;
};
