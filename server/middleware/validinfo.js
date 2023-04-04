// we are using express validator in case of project going big
const { check, validationResult } = require('express-validator');

module.exports = async (req, res, next) => {

    // '/register' path name email password validation

    console.log(req.headers)

    console.log(req.body.name)

  if (req.path === '/register') {
      await check('name')
          .notEmpty()
          .withMessage('Name is required')
          .run(req);
      await check('email')
          .isEmail()
          .withMessage('Email is invalid')
          .run(req);
      await check('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long')
          .run(req);

    // '/login' path name email password validation

  } else if (req.path === '/login') {
      await check('email')
          .isEmail()
          .withMessage('Email is invalid')
          .run(req);
      await check('password')
          .isLength({ min: 6 })
          .withMessage('Password must be at least 6 characters long')
          .run(req);
  }

    // Check if error and return error to user

  const errors = validationResult(req);
    console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

