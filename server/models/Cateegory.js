export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        Category.BelongsTo(models.Book, {
          foreignKey: 'catId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Category;
};
