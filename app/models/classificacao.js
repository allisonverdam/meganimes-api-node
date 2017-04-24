export default (sequelize, DataType) => {
  const Classificacoes = sequelize.define('classificacoes', {
    user_id: {
      type: DataType.INTEGER
    },
    classificacao: {
      type: DataType.STRING
    }
  })

  return Classificacoes;
}

