# Tasteful Traditions

**Description**

Tasteful Traditions is a collaboratively built MVP that allows users to explore recipes and culinary cultures around the globe, add new recipes, and learn about the background of each dish.

**Future Features**

Future iterations of this project will include fine-tuned location detection features in the homepage Google Map component. Additionally, authorization and authentification will be implemented for user/admin access to private features (recipe deletion/modification, 'favorites', etc.)
  
## Database Schema

![Screenshot 2024-09-16 at 12 12 30 PM](https://github.com/user-attachments/assets/baeefd20-b5a1-4eee-848e-552f8fa9e43d)

## Used Technologies

Back-end: MySQL, Node, Express, bcrypt, JWT

Front-end: React, CSS, HTML, Bootstrap

APIs & Libraries: Google Maps API, Axios

## Prerequisites

* Node.js
* npm
* MySQL

## Dependencies

* Run `npm install` in the project folder to install dependencies related to Express (the server).
* `cd client` and run `npm install` to install dependencies related to React (the client).

## Database Setup

* Create the database in MySQL: 
	`CREATE DATABASE collab_project;`
* Use the provided _new_db.sql_ file to import the initial database 
* Ensure the tables have been correctly created by running the following in MySQL:
	```USE collab_project;
	SHOW TABLES;
	DESCRIBE ingredients;
	DESCRIBE location;
	DESCRIBE recipes;
	DESCRIBE recipes_ingredients;
	DESCRIBE recipes_restrictions;
	DESCRIBE restrictions;
	DESCRIBE users;
* Create the .env file to match your personal credentials

## Running the App in the Terminal

**Back-end**

`cd projectfolder`

`npm start`

Postman: http://localhost:4000/

**Front-end**

`cd projectfolder/client`

`npm run dev`

Browser: http://localhost:5173/

*_Replace “projectfolder” with whatever you’ve locally named the project folder_



