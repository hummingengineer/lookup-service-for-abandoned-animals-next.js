import dynamic from 'next/dynamic';
import useTheme from '@material-ui/core/styles/useTheme';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import useChart from '../../hooks/useChart';

const Title = dynamic(() => import('../Title'));
const Loading = dynamic<{}>(() => import('../Loading').then((mod) => mod.LoadingWithTitle));
const Error = dynamic(() => import('../Error'));

export default function Chart() {
  const theme = useTheme();
  const { chartData, isLoading, isError } = useChart(7, false);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Title>최근 일주일</Title>
      <ResponsiveContainer height="80%">
        <LineChart data={chartData} margin={{ top: 16, right: 16, bottom: 0, left: 24 }}>
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              유기동물 수 (마리)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="count" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
