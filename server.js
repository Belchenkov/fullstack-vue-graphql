const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const User = require('./models/User');
const Post = require('./models/Post');

const typeDefs = gql`
    type Todo {
        task: String
        completed: Boolean
    }

    type Query {
        getTodos: [Todo]
    }
`;

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
