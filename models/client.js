const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const client = db.define("client", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contato: {
    type: DataTypes.STRING,
  },
  end: {
    type: DataTypes.STRING,
  },
  bairro: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
  },
  queixa: {
    type: DataTypes.STRING,
  },
});

//CONTINUAR

module.exports = client