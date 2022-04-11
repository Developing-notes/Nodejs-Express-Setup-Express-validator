const { check, validationResult } = require('express-validator')
exports.validatesignup = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .isAlpha()
        .withMessage('alpha only')
        .isLength({ min: 7, max: 15 })
        .withMessage('min 7 and max 15'),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('It is not Email pattern'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password Empty')
        .matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9 !@#$%^&*]{8,16}$/)
        .withMessage("must be one special character")
        // .isNumeric()
        // .withMessage('Numberic only')
        // .isLength({ min: 5, max: 10 })
        // .withMessage('Password must be 5 to 10 characters')
];
exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();
    const error = result[0].msg;
    res.json({ success: false, message: error });
};