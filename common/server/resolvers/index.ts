import { IResolvers } from 'apollo-server-micro';

import { QueryArgs } from '../types';

const resolvers: IResolvers = {
  Query: {
    sido: async (_source, _args, { dataSources }) => {
      return await dataSources.abandonedAnimalAPI.getSidoResponse();
    },
    sigungu: async (_source, args: QueryArgs, { dataSources }) => {
      return await dataSources.abandonedAnimalAPI.getSigunguResponse(args);
    },
    shelter: async (_source, args: QueryArgs, { dataSources }) => {
      return await dataSources.abandonedAnimalAPI.getShelterResponse(args);
    },
    kind: async (_source, args: QueryArgs, { dataSources }) => {
      return await dataSources.abandonedAnimalAPI.getKindResponse(args);
    },
    abandonmentPublic: async (_source, args: QueryArgs, { dataSources }) => {
      return await dataSources.abandonedAnimalAPI.getAbandonmentPublicResponse(args);
    },
  },
};

export default resolvers;
