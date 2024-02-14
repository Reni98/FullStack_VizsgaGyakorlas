const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const port = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Home route");
});


const connection = mysql.createConnection({
    host: 'localhost',
    password: '',
    user: 'root',
    database: 'formapp'
})

connection.connect();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

  
  app.use(cors(corsOptions));
  


app.set('view engine', 'ejs')

app.post('/create-form-data', (req, res) => {
    const { first_name, last_name, message } = req.body;
    const SQL = "INSERT INTO contact (first_name, last_name, message) VALUES (?,?,?)";
    connection.query(SQL, [first_name, last_name, message], (err, row) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/?message=successful');
      }
    });
  });

  app.get('/getFormData', (req, res) => {
    const sqlQuery = 'SELECT * FROM contact';
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
            console.error('Error fetching form data:', error);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(results);
        }
    });
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
} )