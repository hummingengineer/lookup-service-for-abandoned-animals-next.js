import { AxiosResponse } from 'axios';
import { ApolloError } from 'apollo-server-micro';

import req from '../libs/req';
import getDates from './getDates';
import { Sido, Sigungu, Shelter, Kind } from '../types';

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
    fetcher(`{ abandonmentPublic(bgnde: "${date}", endde: "${date}") { totalCount } }`)
  );

  const datas = await Promise.all(fetchers);
  const totalCounts = datas.map((data) => data.abandonmentPublic.totalCount);

  return getDates(start, end, '-').map((date, i) => ({
    date,
    count: parseInt(totalCounts[i]),
  }));
}

export async function selectFieldFetcher(id: string, parentValues: Array<string>) {
  const result = [{ value: '', label: '선택 취소' }];
  let item = null;

  switch (id) {
    case 'sido': {
      const data = await fetcher(`{ sido { item { orgCd orgdownNm } } }`);
      item = data.sido.item.map((d: Sido) => ({ value: d.orgCd, label: d.orgdownNm }));
      break;
    }
    case 'sigungu': {
      const data = await fetcher(
        `{ sigungu(upr_cd: "${parentValues[0]}") { item { orgCd orgdownNm } } }`
      );
      item = data.sigungu.item.map((d: Sigungu) => ({ value: d.orgCd, label: d.orgdownNm }));
      break;
    }
    case 'shelter': {
      const data = await fetcher(
        `{ shelter(upr_cd: "${parentValues[0]}", org_cd: "${parentValues[1]}") { item { careRegNo careNm } } }`
      );
      item = data.shelter.item.map((d: Shelter) => ({ value: d.careRegNo, label: d.careNm }));
      break;
    }
    case 'kind': {
      const data = await fetcher(
        `{ kind(up_kind_cd: "${parentValues[0]}") { item { kindCd KNm } } }`
      );
      item = data.kind.item.map((d: Kind) => ({ value: d.kindCd, label: d.KNm }));
      break;
    }
    default: {
      break;
    }
  }

  return item ? result.concat(item) : result;
}
