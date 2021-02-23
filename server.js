const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');

require('dotenv').config({ path: '.env' });

const User = require('./models/User');
const Post = require('./models/Post');

const server = new ApolloServer({
    typeDefs,
    context: {
        User,
        Post
    }
});

mongoose
    .connect(process.env.MONGO_URI,  {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('DB Connected...');
        server.listen().then(({ url }) => {
            console.log(`Server listening on ${url}`);
        });
    })
    .catch(err => console.error(err));
