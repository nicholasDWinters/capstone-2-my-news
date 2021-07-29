## My News - Backend

### Link to API: https://newsapi.org/

### Link to deployed app: https://nick-my-news-frontend.herokuapp.com/

#### Description
My News is a minimalistic news website that shows recent top headlines in general, sports, tech, business, etc. Users are able to search for a specified topic, and will be shown 20 news stories related to that topic. 

Users have the ability to register, login, and logout. Registered users have additional functionality of being able to save a story to their read list, which allows them to create a list of stories to view and read later. Users are also able to remove articles from their read list.

#### Features & Technologies Used
The frontend application utilizes React and Redux, in combination with Bootstrap and Reactstrap. Redux, dispatch, reducers, and actions were used for state management mainly for me to learn Redux a bit more and get some practice. May have been easier to manage state for a simple app like this with useState and useContext. 

The backend application was create with Node and Express. Bcrypt and jsonwebtoken were used to implement user authentication. Jsonschema was used to create the schemas to validate the login and register forms, as well as articles added to state. The pg module was used to connect to our postgres database, containing simple tables for users, and articles. The articles table was used merely to keep track of a user's saved articles.

#### Testing
Clone both the backend and frontend app to your local environment and install dependencies. Navigate to the backend folder, make sure jest is installed, and type 'jest' to run all backend tests. 

For frontend tests, navigate to frontend folder, and type 'npm test'. Also have the option to test files individually with 'npm test path-to-test'.

#### Note on API
The newsapi module was used to call the API and receive the desired response. Unfortunately, the API itself proved disappointing. The content of each article received was truncated to 200 characters, so rather than displaying the full content of each article on the My News website, I decided to have a simple link to view the article at its own source url. 

The API used was also not set up properly for CORS. To solve this, I set up a CORS proxy, which can be seen at the top of the backend/routes/headlines.js file. While not a perfect solution, I have to give credit to https://thingproxy.freeboard.io/fetch/, which seems to pass the correct CORS headers.

#### Note on API_KEY variable
Need to change API_KEY variable configuration in backend config file if trying to run locally. Current state of API_KEY variable checks for a config variable with heroku, therefore the deployed site is functioning correctly. Comment out line 14, and uncomment lines 2 and 15.