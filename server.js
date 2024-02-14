const  express = require('express');
const routes = require('./routes/routes');
const  app = express();

const PORT = process.env.PORT || 3000;

require('./config/database');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static( './public'));

routes(app);

app.listen(PORT , () => {
    console.log(`Server up and running on http://localhost:${PORT}`);
});
 
module.exports = app;