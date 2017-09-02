const Sequelize =require('sequelize')
const sequelize = new Sequelize('restarent', 'softsetuser', 'softset123', {
  host: "softset.cnjmcywhbcvu.us-west-2.rds.amazonaws.com",
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
// console.log(process.env.DB_HOST)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports=sequelize;
