import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const loadModels = (sequelize) => {
    const dir = path.join(__dirname, '../models');
    let models = [];
    fs.readdirSync(dir).forEach(file => {
        console.log('achou')
        const modelDir = path.join(dir, file),
        model = sequelize.import(modelDir);
        models[model.name] = model;
    })
    return models;
}

export default (app) =>{
    if(!database){
        const config = app.config.dev,
        sequelize = new Sequelize(config.database, config.username, config.password, config.params);

        database = {
            sequelize,
            Sequelize,
            models: {}
        };

        //carrega os models na pasta
        database.models = loadModels(sequelize);
        console.log(database.models)

        //retorna o database depois de sincronizar
        sequelize.sync().done(() =>{
            return database;
        });
    }
    return database;
}