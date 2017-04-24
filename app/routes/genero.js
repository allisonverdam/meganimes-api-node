export default (route) => {
    const Generos = route.datasource.models.generos;
    const limit = 21;

    route.get('/generos', (req, res) => {
        res.json('Generos')
    })

    return route;
}