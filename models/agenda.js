const {DataTypes} = require("sequelize")

const db = require("../db/conn");

const agenda = db.define ("agenda",{
    cpf:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    procedimento:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    profissional:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    dia:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    horario:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = agenda