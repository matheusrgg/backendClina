const { Sequelize } = require('sequelize');

const database = require('../db')

const Salas = database.define('salas', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequelize.STRING,
        allowNull: false
    },
    endereco:{
        type:Sequelize.STRING,
        allowNull: false
    },
    disponibilidade:{
        type:Sequelize.STRING,
        allowNull: false
    }
    
}) 

module.exports = Salas;