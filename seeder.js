const path = require('path');
const async = require('async');
const description = require('./utils');

const init = async () => {
    try {
        const config = require('./src/config');
        config.initEnviromentVariables();

        const sequelize = require('./src/config/lib/sequelize');

        await sequelize.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
        );

        const User = require("./src/modules/user/user.model");
        const Product = require("./src/modules/product/product.model");
        const ProductDescription = require("./src/modules/product/product-description.model");

        const userSeeder = (callback) => {
            User.findOrCreate({
                where: { email: "admin@commerce.com" },
                defaults: {
                    firstName: "System",
                    lastName: "Admin",
                    dob: '08/11/1998',
                    address: 'k14/10,kalachadpur,Dhaka',
                    gender: 'Male',
                    password: "P@ssword123",
                },
            }).then((users) => {
                callback(null, users[0].id);
            });
        };


        const productSeeder = (userId, callback) => {
            const products = [
                {
                    productName: "Sunflower Seed",
                    productImage: "https://post.healthline.com/wp-content/uploads/2020/08/766x415_THUMBNAIL_how-many-calories-in-sunflower-seeds-732x415.jpg",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Sesame Seed",
                    productImage: "https://plus.unsplash.com/premium_photo-1674654419404-667fcdd0fe13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VzYW1lJTIwc2VlZHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Mustard Seed",
                    productImage: "https://media.istockphoto.com/id/1345505588/photo/closeup-of-dry-brown-mustard-seeds-macro.jpg?s=612x612&w=0&k=20&c=kihHsQhb0G5Ktx185inqhKyjS_0L972E9C6lZHbYgV8=",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Rice Seed",
                    productImage: "https://www.ricefarming.com/wp-content/uploads/2017/02/rice-seed-1.jpg",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Corn Seed",
                    productImage: "https://img.ehowcdn.com/640/cppd/55/167/fotolia_2599913_XS.jpg",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Wheat Seed",
                    productImage: "https://cdn.shopify.com/s/files/1/1548/8393/products/wheat-grain_480x480.jpg?v=1540320825",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Spinach Seed",
                    productImage: "https://ark.wiki.gg/images/8/85/Spinach_Seed_%28Primitive_Plus%29.png",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Coriander",
                    productImage: "https://w7.pngwing.com/pngs/677/894/png-transparent-coriander-seed-gin-food-coriander-seed-food-superfood-bean-thumbnail.png",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Onion Seed",
                    productImage: "https://welldales.co.uk/wp-content/uploads/2020/11/50-Large-Brown-Onion-Seeds-Easy-Peel-Sweet-Spicy-Dutch-Rijnsburger-Vegetable-seed.png",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Garlic Seed",
                    productImage: "https://i1.wp.com/practicalselfreliance.com/wp-content/uploads/2018/10/How-to-Start-Garlic-from-Seed-1-of-4.jpg?resize=600%2C400&ssl=1",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Pumpkin Seed",
                    productImage: "https://usercontent.one/wp/wholesomeweigh.co.uk/wp-content/uploads/2020/03/UPA-0655-2-500x500.jpg",
                    createdBy: userId,
                    updatedBy: userId,
                },
                {
                    productName: "Ginger Seed",
                    productImage: "https://gardeningtips.in/wp-content/uploads/2022/08/Grow-Ginge-from-Seed2.jpg",
                    createdBy: userId,
                    updatedBy: userId,
                },

            ];

            Product.destroy({ truncate: { cascade: true } }).then(() => {
                Product.bulkCreate(products, {
                    returning: true,
                    ignoreDuplicates: false,
                }).then(() => {
                    callback(null);
                });
            });
        };

        const productDescriptionSeeder = (callback) => {
            Product.findAll().then((products) => {
                const descriptions = require('./utils');
                descriptions.forEach((description, idx) => {
                    description.productId = products[idx].id;
                });

                ProductDescription.destroy({ truncate: { cascade: true } }).then(() => {
                    ProductDescription.bulkCreate(descriptions, {
                        returning: true,
                        ignoreDuplicates: false,
                    }).then(() => {
                        callback(null);
                    });
                });
            }).catch(err => {
                console.log(err);
            });
        };

        await sequelize.sync();

        async.waterfall(
            [
                userSeeder,
                productSeeder,
                productDescriptionSeeder
            ],
            (err) => {
                if (err) console.error(err);
                else console.log("DB seed completed");
                process.exit();
            }
        );

    } catch (err) {
        console.log(err);
    }
}

init();
