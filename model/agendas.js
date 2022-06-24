const { Sequelize } = require('sequelize');

const database = require('../db')
const Salas = require('./salas')

const Agendas = database.define('agendas', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    dia:{
        type:Sequelize.STRING,
        allowNull: false
    },
    periodo :{
        type:Sequelize.STRING,
        allowNull: false
    },
    status:{
        type:Sequelize.STRING,
        allowNull: false
    }
    
}) 

Agendas.belongsTo(Salas,{
    constraints:true,
    foreignKey: 'idSala'
})

module.exports = Agendas;