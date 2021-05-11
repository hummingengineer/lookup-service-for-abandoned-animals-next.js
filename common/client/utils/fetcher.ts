import { AxiosResponse } from 'axios';
import { ApolloError } from 'apollo-server-micro';

import req from '../libs/req';
import getDates from './getDates';

export default async function fetcher(query: string) {
  const {
    data: { data, errors },
  }: AxiosResponse<{ data: any; errors: Array<ApolloError> }> = await req.post(
    '/graphql',
    JSON.stringify({ query }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (Array.isArray(errors) && errors.length) {
    throw new Error(errors[0].extensions.code);
  }

  return data;
}

export async function chartFetcher(numOfDays: number, includeToday: boolean) {
  const today = new Date();
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

  const end: Date = includeToday ? today : yesterday;
  const start: Date = new Date(end.getFullYear(), end.getMonth(), end.getDate() - (numOfDays - 1));

  const fetchers = getDates(start, end, '').map((date) =>
    fetcher(`{ abandonmentPublic(bgnde: "${date}" endde: "${date}") { totalCount } }`)
  );

  const datas = await Promise.all(fetchers);
  const totalCounts = datas.map((data) => data.abandonmentPublic.totalCount);

  return getDates(start, end, '-').map((date, i) => ({
    date,
    count: parseInt(totalCounts[i]),
  }));
}
