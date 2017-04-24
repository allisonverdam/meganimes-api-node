export default (sequelize, DataType) => {
  const Generos = sequelize.import('./genero');
  const Classificacoes = sequelize.import('./classificacao');
  const Episodios = sequelize.import('./episodio');
  const Animes    = sequelize.define('animes', {
    nome: {
      type: DataType.STRING
    },
    sinopse: {
      type: DataType.TEXT
    },
    estudio: {
      type: DataType.STRING
    },
    status: {
      type: DataType.STRING
    },
    ano_lancamento: {
      type: DataType.STRING
    },
    temporadas: {
      type: DataType.INTEGER
    },
    classificacao: {
      type: DataType.INTEGER
    },
    imagem: {
      type: DataType.STRING
    },
    season: {
      type: DataType.FLOAT
    }
  });

  //Associações das tabelas
  Animes.belongsToMany(Generos, { through: 'anime_genero', foreignKey: 'anime_id'});
  Generos.belongsToMany(Animes, { through: 'anime_genero', foreignKey: 'genero_id'});
  Episodios.belongsTo(Animes, {foreignKey: 'anime_id'});
  Classificacoes.belongsTo(Animes, {foreignKey: 'anime_id'});
  Animes.hasMany(Episodios, {foreignKey: 'anime_id'});
  Animes.hasMany(Classificacoes, {foreignKey: 'anime_id'});

  Animes.animesCompletos = (Generos, page, limit, callback) => {
    if(isNaN(page)) return callback({status: 'página inválida!'});
    if(page <= 0) page = 1;

     Animes.findAll({where: {status: 'Completo'}, offset: (page * limit) - limit, limit: limit, order: 'createdAt DESC', include: Generos})
        .then(result => {
          if(result == null)
            return callback([])

            callback(result);
        })
        .catch(err => {
          console.log(err)
          callback(err);
        })
  }

  Animes.animesLancamento = (Generos, page, limit, callback) => {
    if(isNaN(page)) return callback({status: 'página inválida!'});
    if(page <= 0) page = 1;

     Animes.findAll({where: {status: 'Lançando'}, offset: (page * limit) - limit, limit: limit, order: 'createdAt DESC', include:  Generos})
        .then(result => {
          if(result == null)
            return callback([])

            callback(result);
        })
        .catch(err => {
          console.log(err)
          callback(err);
        })
  }

  Animes.epsTemporada = (id, temp, callback) => {
    if(isNaN(temp)) return callback({status: 'temporada inválida!'});
    if(isNaN(id)) return callback({status: 'id inválido!'});
    
    Animes.find({where: {id: id}, order: 'episodios.createdAt ASC', include: {model: Episodios, where: {temporada: temp}}})
        .then(result => {
          if(result == null)
            return callback([])

          callback(result.episodios);            
        })
        .catch(err => {
          console.log(err)
          callback(err);
        })
  }

  Animes.getAnimeById = (id, callback) => {
    Animes.find(
      {
        where: {id: id},
        include: Generos  
      }
    )
    .then(result => {
          if(result == null)
            return callback([])

          callback(result);            
        })
        .catch(err => {
          callback(err);
        })
  }

  Animes.createAnime = (body, callback) => {
    Animes.create({
      nome: body.nome,
      sinopse: body.sinopse,
      estudio: body.estudio,
      status: body.status,
      ano_lancamento: body.ano_lancamento,
      temporadas: body.temporadas,
      classificacao: body.classificacao,
      imagem: body.imagem,
      season: body.season
    })
    .then(result => {
      callback(result);
    })
    .catch(err => {
      let errors = err.errors;
      let codeError = err.original.code;
      callback({errors, codeError});
    })
  }

  Animes.updateAnime = (id, body, callback) => {
    Animes.findById(id).then(anime => {
      anime.updateAttributes({
        nome: body.nome,
        sinopse: body.sinopse,
        estudio: body.estudio,
        status: body.status,
        ano_lancamento: body.ano_lancamento,
        temporadas: body.temporadas,
        classificacao: body.classificacao,
        imagem: body.imagem,
        season: body.season
      })
      .then(result => {
        callback(result);
      })
      .catch(err => {
        let errors = err.errors;
        let codeError = err.original.code;
        callback({errors, codeError});
      })    
    })
  }

  Animes.deleteAnime = (id, callback) => {
    Animes.destroy({
      where: {
        id: id
      }
    }).then(result => {
      if(result == 1)
        result = {'mensagem': 'anime deletado com sucesso'}
      else
        result = {'mensagem': 'nenhum anime encontrado'}
      callback(result)
    })
  }

  Animes.searchAnimes = (nome, limit, callback) => {
    Animes.findAll({where: {nome: { $like: '%'+nome+'%' }}, limit: limit, order: 'nome ASC', include: Generos})
      .then(result => {
        if(result == null)
          return callback([])

        callback(result);            
      })
      .catch(err => {
        console.log(err)
        callback(err);
      })
  }

  Animes.searchAnimesWithGenre = (nome, status, limit, callback) => {
    Animes.findAll({where: {nome: { $like: '%'+nome+'%' }, status: { $like: status }}, limit: limit, order: 'nome ASC', include: Generos})
      .then(result => {
        if(result == null)
          return callback([])

        callback(result);            
      })
      .catch(err => {
        console.log(err)
        callback(err);
      })
  }

  Animes.searchAnimesSeason = (season, limit, callback) => {
    Animes.findAll({where: {season: { $like: '%'+season+'%' }}, limit: limit, order: 'nome ASC', include: Generos})
      .then(result => {
        if(result == null)
          return callback([])

        callback(result);            
      })
      .catch(err => {
        console.log(err)
        callback(err);
      })
  }

  Animes.searchAnimesPorGenero = (idGenero, limit, callback) => {
    Generos.find({where: {id: idGenero}, include: [{model: Animes}], order: 'animes.nome ASC'})
      .then(result => {
        if(result == null || result.animes == null)
          return callback([])

        callback(result.animes);            
      })
      .catch(err => {
        console.log(err)
        callback(err);
      })
  }

  return Animes;
}
