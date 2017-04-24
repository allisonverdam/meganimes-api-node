export default (app) => {
    //carrega os models que precisam fazer associação
    const 
    Animes  		= app.datasource.models.animes,
    Generos 		= app.datasource.models.generos,
    Episodios       = app.datasource.models.episodios;
    //Generos.belongsToMany(Animes, { through: 'anime_genero', foreignKey: 'genero_id'});


    //Animes.belongsToMany(Generos, { through: 'anime_genero', foreignKey: 'anime_id'});
    //Episodios.belongsTo(Animes);
    //Animes.hasMany(Episodios, {foreignKey: 'anime_id'});

    return app;
}