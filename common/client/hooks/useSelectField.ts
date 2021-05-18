import useSWR from 'swr';

import { selectFieldFetcher } from '../utils/fetcher';

export default function useSelectField(id: string, parentValues: Array<string>) {
  const { data, error } = useSWR([id, parentValues], selectFieldFetcher);

  return {
    items: data,
    isLoading: !error && !data,
    isError: error,
  };
}
