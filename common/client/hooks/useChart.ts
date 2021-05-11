import useSWR from 'swr';

import { chartFetcher } from '../utils/fetcher';

export default function useChart(numOfDays: number, includeToday: boolean = false) {
  const { data, error } = useSWR([numOfDays, includeToday], chartFetcher);

  return {
    chartData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
