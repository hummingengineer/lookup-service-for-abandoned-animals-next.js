import { RESTDataSource } from 'apollo-datasource-rest';

import { QueryArgs } from '../types';
import fetchData from '../utils/fetchData';

class AbandonedAnimalAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getSidoResponse() {
    return await fetchData('/sido');
  }

  async getSigunguResponse(args: QueryArgs) {
    return await fetchData('/sigungu', args);
  }

  async getShelterResponse(args: QueryArgs) {
    return await fetchData('/shelter', args);
  }

  async getKindResponse(args: QueryArgs) {
    return await fetchData('/kind', args);
  }

  async getAbandonmentPublicResponse(args: QueryArgs) {
    return await fetchData('/abandonmentPublic', args);
  }
}

export default AbandonedAnimalAPI;
