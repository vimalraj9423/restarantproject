const Sequalize = require('sequelize')
const sequalize = require('../utilities/db');
const restarent =require("./restarent");

const review = sequalize.define('review',{
    restarent_id:{
        type:Sequalize.STRING,
        references:{
            model:restarent,
            key:'restarent_id'
        }
    },
    name:{
        type:Sequalize.STRING,
        defaultValue:""
    },
    review:{
        type:Sequalize.STRING,
        defaultValue:""
    },
    star:{
        type:Sequalize.INTEGER
    }
})
module.exports=review;