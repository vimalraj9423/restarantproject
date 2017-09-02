'use strict';
const restarantModel = require('../models/restarent');
const reviewModel = require('../models/review');
restarantModel.hasMany(reviewModel,{foreignKey:'restarent_id'});
reviewModel.belongsTo(restarantModel,{foreignKey:'restarent_id'})
const Joi = require('joi');
const restarant={
    register: function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/{name}',
        config:{
            tags:['api'],
            handler: function (request, reply) {
                reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
            }
        }
        
    });
    server.route({
        method:'POST',
        path:'/restarent/create',
        config:{
            tags:['api'],
            handler:(request,reply)=>{
                var data = request.payload;
                var insertObject={
                    restarent_name:request.payload.restarent_name,
                    average_cash:request.payload.average_cash,
                    payment_acceptable:data.payment_acceptable.join(),
                    product_list:JSON.stringify(data.product_list),
                    address:data.address,
                    city:data.city,
                    phone_no:data.phone_no,
                    time:JSON.stringify(data.time)
                }
                restarantModel.create(insertObject).then(Response=>{

                reply(Response)
                })
            },
            validate:{
                payload:Joi.object({
                    restarent_name:Joi.string(),
                    average_cash:Joi.number(),
                    payment_acceptable:Joi.array(),
                    product_list:Joi.array().items(Joi.object({
                        name:Joi.string(),
                        cash:Joi.string()
                    })),
                    address:Joi.string(),
                    city:Joi.string(),
                    phone_no:Joi.number(),
                    time:Joi.object({
                        start:Joi.string(),
                        end:Joi.string()
                    })
                })
            }
            
        }
    })
    server.route({
        path:'/restarant/review',
        method:'POST',
        config:{
            tags:['api'],
            handler:(request,reply)=>{
                var data =request.payload;
                reviewModel.create({
                    name:data.name,
                    restarent_id:data.restarent_id,
                    review:data.review,
                    star:data.star
                }).then(response=>{
                    reply(response)
                })

            },
            validate:{
                payload:Joi.object({
                    name:Joi.string().required(),
                    restarent_id:Joi.string().required(),
                    review:Joi.string().required(),
                    star:Joi.number().max(5).min(0).required()
                })
            }
        }
    })
    server.route({
        method:'POST',
        path:'/restarent/filter',
        config:{
        tags:['api'],
            handler:(request,reply)=>{
                var data=request.payload;
                var filterObject={}
                if(data.city){
                    filterObject["city"]=data.city
                }
                if(data.restarent_name){
                    filterObject["restarent_name"]={
                        $like:"%"+data.restarent_name+"%"
                    }
                }
                restarantModel.findAll({
                    where:filterObject
                }).then(response=>{
                    reply(response)
                })

            },
            validate:{
                payload:Joi.object({
                    city:Joi.string().allow(""),
                    restarent_name:Joi.string().allow("")
                })
            }

        }
    })
    server.route({
        method:'POST',
        path:'/getRestarentDetails',
        config:{
            tags:['api'],
            handler:(request,reply)=>{
                restarantModel.findAll({
                    include:[{
                        model:reviewModel
                    }],
                    where:{
                        restarent_id:request.payload.restarent_id
                    }
                }).then(response=>{
                    console.log(response)
                    reply(response)
                })
            },
            validate:{
                payload:Joi.object({
                    restarent_id:Joi.string().required()
                })
            }
        }
    })
    server.route({
        method:'get',
        path:'/getCity',
        config:{
            tags:['api'],
            handler:(request,reply)=>{
                restarantModel.findAll({
                    attributes:['city'],
                    group:['city']
                }).then(response=>{
                    var v=[];
                    response.find(value=>{
                        v.push(value.city)
                    })
                    reply(v)
                })
            }
        }
    })
        next();
    }

}
restarant.register.attributes={
    name:'restarent',
    version:'1.0.0'
}
module.exports=restarant;