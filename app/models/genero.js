export default (sequelize, DataType) => {
  const Generos = sequelize.define('generos', {
    nome: {
      type: DataType.STRING
    }
  })

  return Generos;
}

