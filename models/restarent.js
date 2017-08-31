'use strict';
const Sequalize = require('sequelize')
const sequalize = require('../utilities/db');
const restarent= sequalize.define('restarent',{
    restarent_id:{
        type:Sequalize.STRING,
        primaryKey:true,
        defaultValue:Sequalize.UUIDV4
    },
    restarent_name:{
        type:Sequalize.STRING,
        defaultValue:""
    },
    average_cash:{
        type:Sequalize.INTEGER
    },
    payment_acceptable:{
        type:Sequalize.STRING
    },
    product_list:{
        type:Sequalize.STRING,
        defaultValue:""
    },
    address:{
        type:Sequalize.STRING,
        defaultValue:""
    },
    city:{
        type:Sequalize.STRING
    },
    phone_no:{
        type:Sequalize.STRING,
        defaultValue:""
    },
    time:{
        type:Sequalize.STRING
    }
});
sequalize.sync();
module.exports=restarent;