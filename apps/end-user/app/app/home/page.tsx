import WhiteCard from '@repo/ui/WhiteCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth/auth';
import PortfolioGraph from '../../../components/PortfolioGraph';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const sampleData = [
    { balance: 1500, date: new Date('2024-01-01') },
    { balance: 1700, date: new Date('2024-02-01') },
    { balance: 1400, date: new Date('2024-03-01') },
    { balance: 1800, date: new Date('2024-04-01') },
    { balance: 1600, date: new Date('2024-05-01') },
    { balance: 1900, date: new Date('2024-06-01') },
    { balance: 2000, date: new Date('2024-07-01') },
    { balance: 2200, date: new Date('2024-08-01') },
    { balance: 2100, date: new Date('2024-09-01') },
    { balance: 2300, date: new Date('2024-10-01') },
  ];

  return <div className="px-5 pt-8 w-full h-96">
    <h2 className="text-purple-700 font-bold text-2xl mb-3">Good Afternoon, {session?.user?.name}</h2>
    <WhiteCard>
      {/* <PortfolioGraph portfolioData={sampleData} /> */}
    </WhiteCard>
  </div>
}