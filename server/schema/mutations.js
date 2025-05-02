const graphql = require('graphql');
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(_, __, req) {
        const { user } = req;
        if (!user) {
          throw new Error('You must be logged in to log out.');
        }
        req.logout();
        return user;
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
  },
});

module.exports = mutation;