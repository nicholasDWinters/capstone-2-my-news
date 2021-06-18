#### 'My News' will be a minimalist news website created using React and Node. Navbar will display search functionality for stories, different news topics (sports, tech, etc), as well as login, signup features. Non registered users will be able to navigate stories and read them, while registered users will be able to save stories to a read list, where they can save them to read later.


##### These are responses to the questions asked in the Project Proposal step of Capstone 2

**#1** I will be using React and Node to complete this project. 

**#2** The focus will be somewhat even between front and back end, but since I enjoy using React, I'd really like to create a cool user interface for this project.

**#3** A news website.

**#4** The goal of this project will be to showcase my skill will React, Redux, and UX. I will be using Material UI to create a pleasant interface.

**#5** The demographic of our users will be anyone interested in reading news. Considering most younger people seem to seem to learn about news stories organically thru browsing Facebook or Twitter, this may be more directed towards millenials and older. Also, people who don't necessarily have time to sit and read stories constantly. Users can save stories to their read list, and read them when it's convenient for them.

**#6** I will gather data from the News API (https://newsapi.org/). API calls will be made to different endpoints to get titles, authors, content, and images from news stories.

**#7** I will be creating the backend first, making the different endpoints for the website. Make the correct API calls when a page is visited, and add helper functions to save info to the database. The database will essentially only have one table, users. This will save name, email, username, and hashed password to database, as well as an array of stories. As users add stories to their read list, each story object will be added to their stories array. Really the only sensitive information I'll be storing will be the user's password, but it will be hashed using JWTs.

Once I have the backend and database functions all set up, I will begin work on the frontend using React, Redux, and Material UI to create a minimalist design. A loggedIn boolean will be saved in localStorage to keep a user signed in. State will keep track of the user and their 'read list' stories, as well as the list of stories currently displayed on the page.

Users can navigate the site with the Navbar, showing links for top stories and different genres of storyies. They can then click on an individual story to read it's content. Users will be able to add or remove a story from their 'read list' on both the storylist page as well as their 'read list' page.