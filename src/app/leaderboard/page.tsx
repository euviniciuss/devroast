'use client';

import { LeaderboardRow } from '@/components/ui/leaderboard-row';

export default function LeaderboardPage() {
  const leaderboardData = [
    {
      rank: 1,
      score: 2.1,
      codePreview: 'function calculateTotal(items) { var total = 0; ...',
      language: 'javascript',
    },
    {
      rank: 2,
      score: 2.8,
      codePreview: 'const x = 1; var y = 2; var z = 3; ...',
      language: 'javascript',
    },
    {
      rank: 3,
      score: 3.5,
      codePreview: 'if(condition) { return true } else { return false }',
      language: 'python',
    },
    {
      rank: 4,
      score: 4.2,
      codePreview: 'for(let i=0; i<10; i++) { console.log(i); }',
      language: 'javascript',
    },
    {
      rank: 5,
      score: 5.0,
      codePreview: 'def foo(): return None',
      language: 'python',
    },
  ];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-mono text-2xl font-bold mb-8">
          <span className="text-accent-green">{'//'}</span>
          shame_leaderboard
        </h1>

        <p className="font-mono text-sm text-text-secondary mb-6">
          {'//'} the worst code on the internet, ranked by shame
        </p>

        <div className="border border-border rounded-md overflow-hidden">
          {leaderboardData.map((item) => (
            <LeaderboardRow.Root key={item.rank}>
              <LeaderboardRow.Rank>#{item.rank}</LeaderboardRow.Rank>
              <LeaderboardRow.Score score={item.score}>
                {item.score.toFixed(1)}
              </LeaderboardRow.Score>
              <LeaderboardRow.Code>{item.codePreview}</LeaderboardRow.Code>
              <LeaderboardRow.Language>{item.language}</LeaderboardRow.Language>
            </LeaderboardRow.Root>
          ))}
        </div>
      </div>
    </main>
  );
}
