import useSWR from 'swr';

import fetcher from '../utils/fetcher';

export default function useQuery(query: string) {
  const { data, error } = useSWR(query, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
