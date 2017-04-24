import express 		from 'express';
import morgan 		from 'morgan';
import bodyParser 	from 'body-parser';
import config 		from './app/config/config'
import datasource 	from './app/config/datasource'

//import das rotas
import anime from './app/routes/anime'
import genero from './app/routes/genero'
import episodio from './app/routes/episodio'
import cors from './app/routes/x-cors'
import association from './app/util/table_association'

const app = express();
app.config = config();
app.datasource = datasource(app);
app.association = association(app);

app.set('port', 8080)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


//rotas
app.route(cors(app))
app.route(anime(app))
app.route(genero(app))
app.route(episodio(app))


export default app;
