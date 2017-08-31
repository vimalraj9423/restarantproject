const Sequelize =require('sequelize')
const sequelize = new Sequelize('restarent', 'softsetuser', 'softset123', {
  host: process.env.DB_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
console.log(process.env.DB_HOST)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports=sequelize;
