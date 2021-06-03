var mysql = require('mysql');
module.exports = {
    port: process.env.PORT || 3002,
    env: process.env.NODE_ENV || 'development',
    mediane: 6,



    // Initialize pool
    pool: mysql.createPool({
        connectionLimit: 100,
        //host:'http://3.134.116.167',
        host: 'localhost',
        port: 3306,
        user: 'root',
        //password: '',
        password: "HHHHHAAAAA5555511111@",
        database: 'media_item',
        debug: false,
        insecureAuth: true
    }),

    //connection postgress



    /*TEST_ID: 236,
    ORGANIZATION_TYPE: 'global',
    CATEGORY_ID: 22*/
};