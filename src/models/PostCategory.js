const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  },
    {
      tableName: 'posts_categories',
      underscored: true,
      timestamps: false
    });

    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost,{
        foreignKey: 'categoryId',
        as: 'categories',
        through: PostCategory,
      });
      models.BlogPost.belongsToMany(models.Category,{
        foreignKey: 'postId',
        as: 'BlogPosts',
        through: PostCategory,
      });
  }

  // HasOne -> Tem Um
  // belongsTo -> Pertence a
  // hasMany -> Tem muitos
  // BelongsToMany -> Pertence a muitos

  return PostCategory;
};

module.exports = PostCategory;