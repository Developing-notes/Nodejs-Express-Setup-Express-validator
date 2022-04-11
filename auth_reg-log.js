//customise function//
const Schema1 = require('../models/user')
const bcrypt = require('bcryptjs')
const saltRound = 10
var jwt = require('jsonwebtoken');
const product = require("../models/product");

// passwordhashmethod
const hashgenerate = async (plainpassword) => {
    const saltel = await bcrypt.genSalt(saltRound)
    const hash = await bcrypt.hash(plainpassword, saltel)
    return hash
}
const hashvalidator = async (plainpassword, hashedpassword) => {
    const result = await bcrypt.compare(plainpassword, hashedpassword)
    return result
}

// user_signup
exports.signup = async function (req, res) {
    const hashpassword = await hashgenerate(req.body.password)
    const us = new Schema1
    us.username = req.body.username,
        us.email = req.body.email,
        us.password = hashpassword
    us.save
        (function (err, data) {
            if (err) {
                res.send('error')

            }
            else {
                res.send('registration ')
            }
        })
}
// user_signin
exports.signin = async function (req, res) {
    try {
        const existinguser = await Schema1.findOne({ email: req.body.email })
        if (!existinguser) {
            res.send('email invalid')
        }
        else {
            const checkuser = await hashvalidator(req.body.password, existinguser.password)
            if (!checkuser) {
                res('password is invalid ')
            }
            else {
                const token = jwt.sign({ email: req.body.email }, "secret", { expiresIn: '1hr' })
                res.json({ success: true, message: "successfully login", token: token })
            }
        }
    }
    catch (error) {
        console.log(error)

    }
}
// add_product
exports.Addproduct = async (req, res) => {
    const bearerHeader = req.headers['authorization'];

    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            // res.send('valid')
            const decodedToken = jwt.verify(bearerToken, "secret");
            const stores = product();
            const { ProductId, Name, Description, Price } = req.body;
            // try {
            const productlist = await product.findOne({ Name });
            if (productlist) {
                return res.json({
                    success: false,
                    message: 'This product is already in use, try another product!',
                });
            }
            else {
                stores.ProductId = ProductId;
                stores.Name = Name;
                stores.Description = Description;
                stores.Price = Price;
                stores.save();
                res.json({ success: true, msg: "Product insert successfully!!", stores });
                //res.json(user);
                // }
                // } catch (error) {
                //     res.send('error inside viewstores method', error.message);
                //     return false;
            }
        }
        else {
            res.send('not valid')
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}
//find_product
exports.findProduct = (req, res) => {
    const bearerHeader = req.headers['authorization'];
    //if the header is not undefine we split the bearer
    try {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;

            // res.send('valid')
            const decodedToken = jwt.verify(bearerToken, "secret");
            product.find(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });


        }
        else {
            res.send('not valid')
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}

// remove_product
exports.remove = async (req, res) => {
    const bearerHeader = req.headers['authorization'];
    //if the header is not undefine we split the bearer
    try {

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            // res.send('valid')
            const decodedToken = jwt.verify(bearerToken, "secret");

            if (req.body.id == "") {
                res.send("Please enter product id")
            }
            else {
                const id = req.body._id;

                const productlist = await product.findOne({ id });
                if (productlist) {

                    product.findByIdAndDelete((req.body._id),
                        function (err, data) {
                            if (err) {
                                res.json({ success: false, msg: "Product not available!!", data: data })
                            }
                            else {
                                res.json({ success: true, msg: "Product deleted successfully!!", data: data })
                            }
                        });
                }

                else {
                    res.json({ success: false, msg: "Product not available!!", data: data })
                }
            }
        }
        else {
            res.send('not valid')
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}

exports.update = async (req, res) => {
    const bearerHeader = req.headers['authorization'];
    //if the header is not undefine we split the bearer
    try {

        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            // res.send('valid')
            const decodedToken = jwt.verify(bearerToken, "secret");

            if (req.body.id == "") {
                res.send("please enter product id")
            }
            product.findByIdAndUpdate(req.body._id,
                {
                    ProductId: req.body.ProductId,
                    Name: req.body.Name, Description: req.body.Description, Price: req.body.Price
                },
                function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.send(data);
                    }
                })
        }
    }
    catch (error) {
        res.json({ success: false, msg: "Unauthorized access!!" })
    }
}



