import req from '../libs/req';
import { QueryArgs } from '../types';

export default async function fetchData(path: string, args: QueryArgs = {}) {
  const {
    data: {
      response: {
        header: { resultCode, resultMsg },
        body: {
          items: { item: itemData },
          numOfRows,
          pageNo,
          totalCount,
        },
      },
    },
  } = await req.get(path, { params: { ...args } });

  const item = Array.isArray(itemData) ? itemData : itemData ? [itemData] : [];

  if (path === '/abandonmentPublic')
    return { resultCode, resultMsg, item, numOfRows, pageNo, totalCount };
  else return { resultCode, resultMsg, item };
}
