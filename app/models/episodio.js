export default (sequelize, DataType) => {
    const Episodios = sequelize.define('episodios', {
        anime_id: {
            type: DataType.INTEGER
        },
        nome: {
            type: DataType.STRING
        },
        sub_titulo: {
            type: DataType.STRING
        },
        temporada: {
            type: DataType.INTEGER
        },
        imagem: {
            type: DataType.STRING
        },
        video: {
            type: DataType.STRING
        }
    })

    Episodios.getEpisodioById = (id, callback) => {
        Episodios.find(
            { where: {id: id} }
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

    Episodios.createEpisodio = (body, callback) => {
        console.log(body)
        Episodios.create({
            anime_id: body.anime_id,
            nome: body.nome,
            sub_titulo: body.sub_titulo,
            temporada: body.temporada,
            imagem: body.imagem,
            video: body.video            
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

    Episodios.updateEpisodio = (id, body, callback) => {
        Episodios.findById(id).then(episodio => {
            episodio.updateAttributes({
                    nome: body.nome,
                    sub_titulo: body.sub_titulo,
                    video: body.video,
                    temporada: body.temporada,
                    imagem: body.imagem,
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

    Episodios.deleteEpisodio = (id, callback) => {
        Episodios.destroy({
            where: { id: id }
        }).then(result => {
            if(result == 1)
                result = {'mensagem': 'episodio deletado com sucesso'}
            else
                result = {'mensagem': 'nenhum episodio encontrado'}
            callback(result)
        })
    }

    return Episodios;
}