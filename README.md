# Challenge-Module18-BC

## NoSQL Challenge: Social Network API
      
![](https://img.shields.io/badge/Created%20by-Maxamed%20-Noor%20Xassan-blue?style=for-the-badge)  
![](https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square&logo=mongoDB)  ![](https://img.shields.io/badge/npm%20package-express-orange?style=flat-square&logo=npm) ![](https://img.shields.io/badge/npm%20package-mongoose-cyan?style=flat-square&logo=npm) ![](https://img.shields.io/badge/npm%20package-moment-%3CCOLOR%3E?style=flat-square&logo=npm)
 ## Table of Contents:  
[1. Description](#Description)  
[2. Acceptance Criteria](#Acceptance-Criteria)  
[3. Walkthrough Videos](#Walkthrough-Videos)  
[4. Installation](#Installation)  
[5. Tests](#Tests)  
[6. License Details](#License)  
[7. Questions](#Questions) 
   
   
### Description

*It's an API for a social network website application where users can share their thoughts and reactions to friends’ and comment on thoughts and recation as well as creating and delete a friend list.*


## Acceptance Criteria
### User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

### Acceptance Criteria

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation
### Installation Guidelines
This repo is not to be deployed, if you wanted to, you could by doing the following:  
1. Clone the repo files from the link below
2. Must have mongoDB installed
3. Run the following at the command line


To run this project, install it locally using npm:

```
npm install
    - npm init -y
    - npm install express
    - npm install mongoose
    - npm install moment
```
4. Start the server
```
    $ npm start
```
5. Open Insomnia or PostMan to test API routes


## Usage

After installing npm packages, the application will be invoked by using the following command:

```
npm start
```

### Tests:  

Test  API  with Insomnia or PostMan  

---
**`/api/users`**
* `GET` all users
* `POST` a new user:
    ```json
    // example data
    {
        "username": "SpongeBob",
        "email": "spongebob@squarepants.com"
    }
    ```
---
**`/api/users/:userid`**
* `GET` a single user by its `_id` 
* `PUT` to update a user by its `_id`
* `DELETE` to remove user by its `_id`
---
**`/api/users/:userId/friends/:friendId`**
* `POST` to add a new friend to a user's friend list
* `DELETE` to remove a friend from a user's friend list
---
**`/api/thoughts`** 
* `GET` to get all thoughts
* `POST` to create a new thought
    ```json
    // example data
    {
    "thoughtText": "Here's a cool thought...",
    "username": "SpongeBob",
    "userId": "5edff2yrtdcb77943ara7df18b"
    }
    ```
---
**`/api/thoughts/:thoughtId`**
* `GET` to get a single thought by its `_id`
* `PUT` to update a thought by its `_id`
* `DELETE` to remove a thought by its `_id`
---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction 
    ```json
    // example data
    {
    "reactionBody":"Are you Ready?!",
    "username":"SpongeBob"
    }
    ```
---
**`/api/thoughts/:thoughtId/reactions/:reactionId`**
* `DELETE` remove a reaction by the `reactionId` 


## Walkthrough Videos
####  Video

[Click me to see the demo video!]()

#### Insomnia Screenshot

![Screenshot](.)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) <br>
This project is licensed under MIT, for more information please visit [this website](https://opensource.org/licenses/MIT)

## Contribution

Made by MCX

## Questions

Please feel free to contact me if you need any further information:

- [Email](mcnoor@gmail.com)
- [Github Profile](https://github.com/mcnoor)
