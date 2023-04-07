 const validateTitle = (req, res, next) => {
  const { title } = req.body;
  if (!title || title.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
 };
 const validateIdField = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds || categoryIds.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
 };
 const validateContent = (req, res, next) => {
  const { content } = req.body;
  if (!content || content.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
 };

module.exports = {
  validateTitle,
  validateContent,
  validateIdField,
};