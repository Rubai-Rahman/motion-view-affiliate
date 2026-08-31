import { Metadata } from 'next';
import LeaderboardContainer from './leadderboard-container';

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'Leaderboard page',
};

const LeaderboardPage = () => {
  return <LeaderboardContainer />;
};

export default LeaderboardPage;
