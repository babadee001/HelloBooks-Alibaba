export default (sequelize, DataTypes) => {
  const Borrowed = sequelize.define('Borrowed', {
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    expires: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: () => {
        // None
      }
    }
  });
  return Borrowed;
};
