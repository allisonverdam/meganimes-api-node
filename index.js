import app from './app';

app.listen(process.env.PORT || app.get('port'), () =>{
    console.log(`Api escutando na porta: ${process.env.PORT || app.get('port')}`);
})