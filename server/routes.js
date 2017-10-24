const routes = require('express').Router();
const handleSignup = require('./controllers/signupHandler.js');
const handleLogin = require('./controllers/loginHandler.js');
const handlenNewTask = require('./controllers/newTaskHandler.js');
const {handleCategories, handleNewCategories} = require('./controllers/categoriesHandler');
const handleMarkers = require('./controllers/markerHandler.js');
const handleNewLocation = require('./controllers/newLocationHandler.js')
const getMapMarkers = require('./controllers/getMapMarkers');
const handleTasks = require('./controllers/taskHandler');
const handleDeleteTasks = require('./controllers/deleteTaskHandler');
const handlePicture = require('./controllers/pictureHandler.js');
const handleGetPicture = require('./controllers/getPictureHandler.js');
const { handleToken, handleAuth } = require('./controllers/handleToken');
const handleEditTasks = require('./controllers/editTaskHandler.js');
const getColors = require('./controllers/getColors');
const handleYayTask = require('./controllers/yayTaskHandler.js');
const handleNayTask = require('./controllers/nayTaskHandler.js');

routes.post('/signup', handleSignup);
routes.get('/login', handleLogin);
routes.post('/newTask', handlenNewTask);
routes.get('/categories', handleCategories);
routes.post('/categories', handleNewCategories);
routes.get('/markers', handleMarkers);
routes.post('/newLocation', handleNewLocation);
routes.get('/mapMarkers', getMapMarkers);
routes.get('/tasks', handleTasks)
routes.delete('/deleteTask', handleDeleteTasks);
routes.get('/tasks', handleTasks);
routes.post('/pictures', handlePicture);
routes.get('/pictures', handleGetPicture);
routes.get('/token', handleToken);
routes.post('/token', handleAuth);
routes.put('/editTask', handleEditTasks);
routes.get('/colors', getColors);
routes.put('/yayTask', handleYayTask);
routes.put('/nayTask', handleNayTask);

module.exports = routes;
