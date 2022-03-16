
## Image upload (section 54)
- Middleware Multer is used for uploading image files. More about [Multer](https://github.com/expressjs/multer)
    - Install multer: 
        ```
        npm i multer
        ```
    - In the views -> campgrounds -> news: Edit the enctype of the form to ```multipart/form-data```
        ```
        <form action="/campgrounds" method ="POST" novalidate class = "validated-form" enctype="multipart/form-data">
        ```
- [Cloudinary registration](https://cloudinary.com/)
    - When using cloudinary, to avoid directly embedding the API credentials or secret keys inside our application, save things in a secret file [dotenv](https://github.com/motdotla/dotenv)
    - Set up .env file
        ```
        CLOUDINARY_CLOUD_NAME = 123456
        CLOUDINARY_KEY = 123456
        CLOUDINARY_SECRET = 123456
        ```
    - Install
        ```
        npm i dotenv
        ```
    - When uploading the files to github, the .env file will not shown.
- [Multer Storage Cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
    - install:
        ```
        npm i cloudinary multer-storage-cloudinary
        ```
    - build a cloudinary folder and start working on this (index.js under cloudinary)
    

## Adding maps
- Using the[MapBox](https://www.mapbox.com/)
- Copy the default ```public token``` (under the Access tokens section) into the ```.env``` file.
    WE can also create a new token and copy the ```public token``` into ```.env``` file

- Geocoding the location 
    - install [mapbox-sdk](https://github.com/mapbox/mapbox-sdk-js)
        ```
        npm install @mapbox/mapbox-sdk
        ```
    - add code in controller -> campgrounds.js
    - **GeoJSON** to store data
        - store teh data as geoJson. Learn more about [MongoDB geospatical](https://docs.mongodb.com/manual/geospatial-queries/) data.
        - update file: model -> campground.
    - add map onto the webpage: [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/)
        - see page [quickstart](https://docs.mapbox.com/mapbox-gl-js/guides/install/#quickstart)
        - update file boilerplate.ejs
        - add map
        - add marker

## About Security (section 566)
- How to avoid things like [SQL Injection](https://en.wikipedia.org/wiki/SQL_injection)
    - Things like sql injection can happen to mongoose db as well. For example, when user input their user name and we find its info:
    ```
    db.users.find({username: req.body.username});

    # if user input name 'colt', good
    db.users.find({username: 'colt'});

    # whatif use input {"$gt": ""}
    db.users.find({username: {"$gt": ""}});
    # find username greater than nothing (so this means find all users)
    ```
    - How to avoid: don't let user input things like "$" or "."
        - Install [Express MOngoose Sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
        ```
        npm install express-mongo-sanitize
        ```
- [Cross-site scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)
    - [senitize-html](https://www.npmjs.com/package/sanitize-html)
- [Helmet](https://github.com/helmetjs/helmet)


## Deploying app
- [Mongo Atlas](https://www.mongodb.com/atlas/database)
    - here to [login](https://account.mongodb.com/account/login)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- Use [heroku](https://www.heroku.com/) to deploy the app