// we are using express validator in case of project going big
const { body, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {

    // '/register' path name email password validation

  if (req.path === '/register') {
      await body('name')
          .notEmpty()
          .withMessage('Name is required')
          .run(req);
      await body('email')
          .isEmail()
          .withMessage('Email is invalid')
          .run(req);
      await body('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long')
          .run(req);

    // '/login' path name email password validation

  } else if (req.path === '/login') {
      await body('email')
          .isEmail()
          .withMessage('Email is invalid')
          .run(req);
      await body('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long')
          .run(req);
  }

    // Check if error and return error to user

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

