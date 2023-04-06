const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
     },
    name: DataTypes.STRING
  },
    {
      tableName: 'categories',
      underscored: true,
      timestamps: false
    });

    Category.associate = (model) => {
  }

  // HasOne -> Tem Um
  // belongsTo -> Pertence a
  // hasMany -> Tem muitos
  // BelongsToMany -> Pertence a muitos

  return Category;
};

module.exports = Category;