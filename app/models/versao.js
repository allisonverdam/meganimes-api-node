export default (sequelize, DataType) => {
  const Versoes = sequelize.define('versoes', {
    nome: {
      type: DataType.STRING
    },
    link: {
        type: DataType.STRING
    }
  })

  return Versoes;
}

