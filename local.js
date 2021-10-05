const app = require('./src/index');
const PORT = 8000;

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})