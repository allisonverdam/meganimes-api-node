export default (route) => {
    const Episodios  = route.datasource.models.episodios;
    const limit = 1;
    route.get('/episodios', (req, res) => {
        res.json('Episodios')
    })

    route.get('/episodio/:id',(req, res) => {
		Episodios.getEpisodioById(req.params.id, result =>{
            res.json(result)
        })		
	})

    route.post('/episodio', (req, res) => {
        console.log(req)
        Episodios.createEpisodio(req.body, result => {
            res.json(result)
        })
    })

    route.put('/episodio/:id', (req, res) => {
        Episodios.updateEpisodio(req.params.id, req.body, (result) => {
            res.json(result)
        })
    })

    route.delete('/episodio/:id', (req, res) => {
        Episodios.deleteEpisodio(req.params.id, result => {
            res.json(result)
        })
    })

    route.get('/episodio/buscar/:idAnime/:temp/:nome', (req, res) => {
        console.log('rota de busca de episodios')
        Episodios.searchEpisodios(req.params.idAnime, req.params.temp, req.params.nome, limit, result => {
            res.json(result);
        })
    })

    return route;
}