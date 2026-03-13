'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CodeInput } from '@/components/ui/code-input';
import { LeaderboardRow } from '@/components/ui/leaderboard-row';
import { Toggle } from '@/components/ui/toggle-example';

export default function HomePage() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState('');

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
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-10 pt-20">
        {/* Hero Title */}
        <div className="text-center mb-8">
          <h1 className="font-mono text-[36px] font-bold leading-tight mb-3">
            <span className="text-accent-green">$ </span>
            <span className="text-foreground">
              paste your code. get roasted.
            </span>
          </h1>
          <p className="font-mono text-sm text-text-secondary">
            {'//'} drop your code below and we&apos;ll rate it — brutally honest
            or full roast mode
          </p>
        </div>

        {/* Code Input */}
        <div className="mb-6">
          <CodeInput
            rows={15}
            placeholder="// paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-8 w-full max-w-[780px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Toggle pressed={roastMode} onPressedChange={setRoastMode} />
              <span
                className={
                  roastMode ? 'text-accent-green' : 'text-text-secondary'
                }
              >
                roast mode
              </span>
            </div>
            <span className="text-xs text-text-tertiary font-mono">
              {'//'} maximum sarcasm enabled
            </span>
          </div>
          <Button variant="primary" disabled={!code.trim()}>
            $ roast_my_code
          </Button>
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-center gap-6 mb-[60px]">
          <span className="text-xs text-text-tertiary font-mono">
            2,847 codes roasted
          </span>
          <span className="text-xs text-text-tertiary font-mono">·</span>
          <span className="text-xs text-text-tertiary font-mono">
            avg score: 4.2/10
          </span>
        </div>

        {/* Leaderboard Preview */}
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-mono text-sm font-bold">
              <span className="text-accent-green">{'//'}</span>
              <span className="text-foreground">shame_leaderboard</span>
            </h2>
            <Link href="/leaderboard">
              <Button variant="ghost" size="sm">
                $ view_all &gt;&gt;
              </Button>
            </Link>
          </div>

          <p className="font-mono text-xs text-text-tertiary mb-4">
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
                <LeaderboardRow.Language>
                  {item.language}
                </LeaderboardRow.Language>
              </LeaderboardRow.Root>
            ))}
          </div>

          <div className="font-mono text-xs text-text-tertiary text-center py-4">
            showing top 3 of 2,847 ·{' '}
            <Link href="/leaderboard" className="hover:underline">
              view full leaderboard &gt;&gt;
            </Link>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-[60px]" />
      </div>
    </main>
  );
}
