export default (route) => {
    const Animes  = route.datasource.models.animes;
    const Generos = route.datasource.models.generos;
    const limit = 21;

    route.get('/animesCompletos/page/:page', (req, res) => {
        Animes.animesCompletos(Generos, req.params.page, limit, (result) => {
            res.json(result)
        })
    })

    route.get('/animes/page/:page', (req, res) => {
        Animes.animesLancamento(Generos, req.params.page, limit, (result) => {             
            res.json(result)
        })
    })

    route.get('/anime/:id',(req, res) => {
		Animes.getAnimeById(req.params.id, result =>{
            res.json(result)
        })		
	})

    route.get('/anime/:id/:temp',(req, res) => {
		Animes.epsTemporada(req.params.id, req.params.temp, (result) => {
            res.json(result)
        })
	})

    route.post('/anime', (req, res) => {
        Animes.createAnime(req.body, result => {
            res.json(result)
        })
    })

    route.put('/anime/:id', (req, res) => {
        Animes.updateAnime(req.params.id, req.body, (result) => {
            res.json(result)
        })
    })

    route.delete('/anime/:id', (req, res) => {
        Animes.deleteAnime(req.params.id, result => {
            res.json(result)
        })
    })

    route.get('/animes/buscar/:nome' || '/animes/buscar/:nome/page/:page', (req, res) => {
        console.log('rota de busca de animes')
        Animes.searchAnimes(req.params.nome, req.params.page, limit, result => {
            res.json(result);
        })
    })

    route.get('/animes/buscar/:status/:nome/page=:page', (req, res) => {
        console.log('rota de busca com genero', req.params.page)
        Animes.searchAnimesWithGenre(req.params.nome, req.params.status, req.params.page, limit, result => {
            res.json(result);
        })
    })

    route.get('/animes/genero/:idGenero', (req, res) => {
        console.log('rota de busca por genero')
        Animes.searchAnimesPorGenero(req.params.idGenero, result => {
            res.json(result);
        })
    })

    return route;
}