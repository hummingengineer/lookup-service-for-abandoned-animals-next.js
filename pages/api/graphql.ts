import { ApolloServer } from 'apollo-server-micro';

import typeDefs from '../../common/server/schema';
import resolvers from '../../common/server/resolvers';
import AbandonedAnimalAPI from '../../common/server/datasources/abandoned-animal-api';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      abandonedAnimalAPI: new AbandonedAnimalAPI(),
    };
  },
  debug: false,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
