// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
/* Dependencies */
const [express, bodyParser, cors, port] = [require('express'), require('body-parser'), require('cors'), 3000];

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const server = app.listen(port, () => {
  console.log(`Hashim Hossam <computetional.h@gmail.com>: welcome to my server;\nserver: i am running on localhost:${port}`);
});

/**
 * @description get the last entry which is the projectData itself
 */
app.get('/getLastEntry', (req, res) => {
  console.log(projectData)
  res.send(projectData);
});

/**
 * @description handle POST request on the server by /addEntry
 */
app.post('/addEntry', (req, res) => {
  projectData = req.body;
  console.log(req.body)
  res.status(200).send(req.body);
});
