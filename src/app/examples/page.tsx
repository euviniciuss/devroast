'use client';

import { AnalysisCard } from '@/components/ui/analysis-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block-client';
import { DiffLine } from '@/components/ui/diff-line';
import { LeaderboardRow } from '@/components/ui/leaderboard-row';
import { Navbar } from '@/components/ui/navbar';
import { ScoreRing } from '@/components/ui/score-ring';
import { Toggle } from '@/components/ui/toggle-example';

export default function ExamplesPage() {
  const sampleCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`;

  return (
    <main className="min-h-screen p-8 space-y-12">
      {/* Button */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Button</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Variants</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Badge */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Badge</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Variants</p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="critical" dot>
                critical
              </Badge>
              <Badge variant="warning" dot>
                warning
              </Badge>
              <Badge variant="good" dot>
                good
              </Badge>
              <Badge variant="verdict" dot>
                needs_serious_help
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Toggle */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Toggle</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">States</p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Toggle pressed={true} />
                <span className="text-sm font-mono text-accent-green">
                  roast mode
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle pressed={false} />
                <span className="text-sm font-mono text-text-secondary">
                  roast mode
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DiffLine */}
      <section>
        <h2 className="text-lg font-semibold mb-4">DiffLine</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Types</p>
            <div className="border border-border rounded-md overflow-hidden max-w-xl">
              <DiffLine type="removed" prefix="-">
                var total = 0;
              </DiffLine>
              <DiffLine type="added" prefix="+">
                const total = 0;
              </DiffLine>
              <DiffLine type="context" prefix=" ">
                for (let i = 0; i &lt; items.length; i++) {'{'}
              </DiffLine>
            </div>
          </div>
        </div>
      </section>

      {/* CodeBlock */}
      <section>
        <h2 className="text-lg font-semibold mb-4">CodeBlock</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Server Component (shiki + vesper theme)
            </p>
            <div className="max-w-2xl">
              <CodeBlock code={sampleCode} lang="javascript" />
            </div>
          </div>
        </div>
      </section>

      {/* AnalysisCard */}
      <section>
        <h2 className="text-lg font-semibold mb-4">AnalysisCard</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Severity</p>
            <div className="flex flex-wrap gap-4 max-w-2xl">
              <AnalysisCard.Root severity="critical">
                <AnalysisCard.Severity>critical</AnalysisCard.Severity>
                <AnalysisCard.Title>
                  using var instead of const/let
                </AnalysisCard.Title>
                <AnalysisCard.Description>
                  the var keyword is function-scoped rather than block-scoped,
                  which can lead to unexpected behavior and bugs.
                </AnalysisCard.Description>
              </AnalysisCard.Root>
              <AnalysisCard.Root severity="warning">
                <AnalysisCard.Severity>warning</AnalysisCard.Severity>
                <AnalysisCard.Title>missing error handling</AnalysisCard.Title>
                <AnalysisCard.Description>
                  the function does not handle potential errors that could occur
                  during the calculation.
                </AnalysisCard.Description>
              </AnalysisCard.Root>
              <AnalysisCard.Root severity="good">
                <AnalysisCard.Severity>good</AnalysisCard.Severity>
                <AnalysisCard.Title>clear function naming</AnalysisCard.Title>
                <AnalysisCard.Description>
                  the function name accurately describes what the function does.
                </AnalysisCard.Description>
              </AnalysisCard.Root>
            </div>
          </div>
        </div>
      </section>

      {/* LeaderboardRow */}
      <section>
        <h2 className="text-lg font-semibold mb-4">LeaderboardRow</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Example</p>
            <div className="border border-border rounded-md overflow-hidden max-w-2xl">
              <LeaderboardRow.Root>
                <LeaderboardRow.Rank>#1</LeaderboardRow.Rank>
                <LeaderboardRow.Score score={2.1}>2.1</LeaderboardRow.Score>
                <LeaderboardRow.Code>
                  {'function calculateTotal(items) { var total = 0; ...'}
                </LeaderboardRow.Code>
                <LeaderboardRow.Language>javascript</LeaderboardRow.Language>
              </LeaderboardRow.Root>
              <LeaderboardRow.Root>
                <LeaderboardRow.Rank>#2</LeaderboardRow.Rank>
                <LeaderboardRow.Score score={5.8}>5.8</LeaderboardRow.Score>
                <LeaderboardRow.Code>
                  {'const calculateTotal = (items) => ...'}
                </LeaderboardRow.Code>
                <LeaderboardRow.Language>typescript</LeaderboardRow.Language>
              </LeaderboardRow.Root>
              <LeaderboardRow.Root>
                <LeaderboardRow.Rank>#3</LeaderboardRow.Rank>
                <LeaderboardRow.Score score={8.2}>8.2</LeaderboardRow.Score>
                <LeaderboardRow.Code>
                  {'function add(a: number, b: number): number {...}'}
                </LeaderboardRow.Code>
                <LeaderboardRow.Language>typescript</LeaderboardRow.Language>
              </LeaderboardRow.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Navbar */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Navbar</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Example</p>
            <div className="border border-border rounded-md overflow-hidden">
              <Navbar.Root>
                <Navbar.Logo>
                  <Navbar.LogoPrompt>&gt;</Navbar.LogoPrompt>
                  <Navbar.LogoText>devroast</Navbar.LogoText>
                </Navbar.Logo>
                <Navbar.Spacer />
                <Navbar.Link href="/leaderboard">leaderboard</Navbar.Link>
                <Navbar.Link href="/examples">examples</Navbar.Link>
              </Navbar.Root>
            </div>
          </div>
        </div>
      </section>

      {/* ScoreRing */}
      <section>
        <h2 className="text-lg font-semibold mb-4">ScoreRing</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Scores</p>
            <div className="flex flex-wrap items-center gap-8">
              <ScoreRing score={2.1} />
              <ScoreRing score={5.5} />
              <ScoreRing score={8.7} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
