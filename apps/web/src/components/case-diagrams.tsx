/** Diagram components for rich case study sections. Each diagram ID maps here. */

function MfTopology() {
  return (
    <figure className="diagram-figure">
      <svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg" className="diagram-svg" aria-label="Module Federation topology: shell loading remotes at runtime">
        {/* Shell */}
        <rect x="160" y="16" width="300" height="100" rx="8" className="diag-box diag-box--shell" />
        <text x="310" y="42" textAnchor="middle" className="diag-label diag-label--section">Shell Application</text>
        {/* Shell internals */}
        <rect x="176" y="52" width="116" height="52" rx="5" className="diag-box diag-box--inner" />
        <text x="234" y="72" textAnchor="middle" className="diag-label diag-label--inner">Redux Store</text>
        <text x="234" y="88" textAnchor="middle" className="diag-label diag-label--sub">persisted · singleton</text>
        <rect x="308" y="52" width="136" height="52" rx="5" className="diag-box diag-box--inner" />
        <text x="376" y="72" textAnchor="middle" className="diag-label diag-label--inner">Auth Coordinator</text>
        <text x="376" y="88" textAnchor="middle" className="diag-label diag-label--sub">one refresh · no race</text>

        {/* Connector lines from shell down */}
        <line x1="200" y1="116" x2="100" y2="196" className="diag-line" />
        <line x1="310" y1="116" x2="310" y2="196" className="diag-line" />
        <line x1="420" y1="116" x2="520" y2="196" className="diag-line" />

        {/* Runtime label on center line */}
        <text x="310" y="160" textAnchor="middle" className="diag-label diag-label--aside">runtime · remoteEntry.js</text>

        {/* Remote A */}
        <rect x="28" y="196" width="144" height="88" rx="8" className="diag-box diag-box--remote" />
        <text x="100" y="220" textAnchor="middle" className="diag-label diag-label--section">Surface A</text>
        <text x="100" y="240" textAnchor="middle" className="diag-label diag-label--sub">own repo · own CI</text>
        <text x="100" y="258" textAnchor="middle" className="diag-label diag-label--sub diag-label--accent">deploys independently</text>
        <text x="100" y="274" textAnchor="middle" className="diag-label diag-label--sub">cdn-a/remoteEntry.js</text>

        {/* Remote B */}
        <rect x="238" y="196" width="144" height="88" rx="8" className="diag-box diag-box--remote" />
        <text x="310" y="220" textAnchor="middle" className="diag-label diag-label--section">Surface B</text>
        <text x="310" y="240" textAnchor="middle" className="diag-label diag-label--sub">own repo · own CI</text>
        <text x="310" y="258" textAnchor="middle" className="diag-label diag-label--sub diag-label--accent">deploys independently</text>
        <text x="310" y="274" textAnchor="middle" className="diag-label diag-label--sub">cdn-b/remoteEntry.js</text>

        {/* Remote C */}
        <rect x="448" y="196" width="144" height="88" rx="8" className="diag-box diag-box--remote" />
        <text x="520" y="220" textAnchor="middle" className="diag-label diag-label--section">Surface C</text>
        <text x="520" y="240" textAnchor="middle" className="diag-label diag-label--sub">own repo · own CI</text>
        <text x="520" y="258" textAnchor="middle" className="diag-label diag-label--sub diag-label--accent">deploys independently</text>
        <text x="520" y="274" textAnchor="middle" className="diag-label diag-label--sub">cdn-c/remoteEntry.js</text>

        {/* Shared singletons bar */}
        <rect x="28" y="300" width="564" height="16" rx="4" className="diag-box diag-box--shared" />
        <text x="310" y="312" textAnchor="middle" className="diag-label diag-label--shared">shared singletons · react · react-dom · redux · design-tokens</text>
      </svg>
      <figcaption className="diagram-caption">The shell loads each surface's bundle at runtime. No shared build step — each surface deploys to its own CDN independently.</figcaption>
    </figure>
  );
}

function MfTokenRace() {
  const surfaceY = [100, 152, 204, 256];
  const labels = ['Surface A', 'Surface B', 'Surface C', 'Surface D'];
  const colors = ['diag-line--err', 'diag-line--err', 'diag-line--ok', 'diag-line--err'];
  const statuses = ['401 Unauthorized', '401 Unauthorized', '200 OK · rotates token', '401 Unauthorized'];
  const notes = ['stale token', 'stale token', 'wins · new token written', 'token already rotated'];
  const startX = 160;
  const endX = 430;

  return (
    <figure className="diagram-figure">
      <svg viewBox="0 0 660 320" xmlns="http://www.w3.org/2000/svg" className="diagram-svg" aria-label="Token refresh race condition: four surfaces firing simultaneous refresh requests">
        {/* Title */}
        <text x="16" y="24" className="diag-label diag-label--section">T=0 — session expires, all surfaces detect simultaneously</text>

        {/* POST label banner */}
        <text x={startX + (endX - startX) / 2} y="50" textAnchor="middle" className="diag-label diag-label--inner">POST /api/auth/refresh</text>

        {/* Token expiry marker */}
        <line x1={startX} y1="60" x2={startX} y2="278" className="diag-line diag-line--marker" strokeDasharray="4 3" />
        <text x={startX} y="76" textAnchor="middle" className="diag-label diag-label--aside">token expires</text>

        {/* Surface tracks */}
        {surfaceY.map((y, i) => (
          <g key={i}>
            <text x="4" y={y + 5} className="diag-label diag-label--track">{labels[i]}</text>
            <line x1="120" y1={y} x2="590" y2={y} className="diag-line diag-line--track" />
            <line x1={startX} y1={y} x2={endX} y2={y} className={`diag-line diag-line--req ${colors[i]}`} />
            <polygon
              points={`${endX},${y - 4} ${endX + 8},${y} ${endX},${y + 4}`}
              className={`diag-arrow ${colors[i]}`}
            />
            <text x={endX + 16} y={y + 5} className={`diag-label diag-label--status ${i === 2 ? 'diag-label--ok' : 'diag-label--err'}`}>{statuses[i]}</text>
            <text x={startX + (endX - startX) / 2} y={y - 9} textAnchor="middle" className="diag-label diag-label--aside">{notes[i]}</text>
          </g>
        ))}

        {/* Fix note */}
        <text x="16" y="304" className="diag-label diag-label--accent">Fix: coordinator in shell · one in-flight flag · surfaces read from store</text>
      </svg>
      <figcaption className="diagram-caption">Four surfaces independently detect token expiry and race to refresh. Only one wins; the others fail with 401 on a token that's already been rotated.</figcaption>
    </figure>
  );
}

function PrismaTopology() {
  const svcCenters = [95, 310, 525];
  const svcLabels = ['Service A', 'Service B', 'Service C'];

  return (
    <figure className="diagram-figure">
      <svg viewBox="0 0 620 292" xmlns="http://www.w3.org/2000/svg" className="diagram-svg" aria-label="Prisma topology: shared schema package, three services with independent connection pools, PgBouncer, PostgreSQL">
        {/* Shared package */}
        <rect x="160" y="12" width="300" height="52" rx="8" className="diag-box diag-box--shell" />
        <text x="310" y="33" textAnchor="middle" className="diag-label diag-label--section">@company/db</text>
        <text x="310" y="51" textAnchor="middle" className="diag-label diag-label--sub">schema · generated client · migration history</text>

        {/* Build-time dep lines (dashed) */}
        {svcCenters.map((cx, i) => (
          <line key={i} x1="310" y1="64" x2={cx} y2="108" className="diag-line diag-line--marker" strokeDasharray="4 3" />
        ))}
        <text x="484" y="90" className="diag-label diag-label--aside">build-time dep</text>

        {/* Service boxes */}
        {svcCenters.map((cx, i) => (
          <g key={i}>
            <rect x={cx - 75} y="108" width="150" height="70" rx="8" className="diag-box diag-box--remote" />
            <text x={cx} y="128" textAnchor="middle" className="diag-label diag-label--section">{svcLabels[i]}</text>
            <text x={cx} y="146" textAnchor="middle" className="diag-label diag-label--inner">PrismaClient</text>
            <text x={cx} y="163" textAnchor="middle" className="diag-label diag-label--sub diag-label--accent">pool: 10 conns</text>
          </g>
        ))}

        {/* Lines to PgBouncer */}
        {svcCenters.map((cx, i) => (
          <line key={i} x1={cx} y1="178" x2="310" y2="204" className="diag-line" />
        ))}

        {/* PgBouncer */}
        <rect x="180" y="204" width="260" height="44" rx="8" className="diag-box diag-box--inner" />
        <text x="310" y="222" textAnchor="middle" className="diag-label diag-label--section">PgBouncer :6432</text>
        <text x="310" y="238" textAnchor="middle" className="diag-label diag-label--sub">transaction pooling mode</text>

        {/* Line to Postgres */}
        <line x1="310" y1="248" x2="310" y2="260" className="diag-line" />

        {/* PostgreSQL */}
        <rect x="185" y="260" width="250" height="20" rx="4" className="diag-box diag-box--shared" />
        <text x="310" y="274" textAnchor="middle" className="diag-label diag-label--shared">PostgreSQL :5432 · max_connections: 100</text>
      </svg>
      <figcaption className="diagram-caption">Each service holds its own Prisma connection pool at runtime. Without PgBouncer, three services at two replicas each saturate Postgres before real traffic arrives.</figcaption>
    </figure>
  );
}

function CiPipeline() {
  const bx = 40;   // before column left edge
  const bw = 200;  // before box width
  const bc = bx + bw / 2;
  const ax = 380;  // after column left edge
  const aw = 190;
  const ac = ax + aw / 2;
  const bh = 34;   // box height
  const gap = 18;  // arrow gap between boxes

  const beforeStages = [
    { label: 'npm install', time: '8 min' },
    { label: 'build all packages', time: '12 min' },
    { label: 'test:unit', time: '6 min' },
    { label: 'test:integration', time: '8 min' },
    { label: 'test:e2e', time: '4 min' },
    { label: 'deploy', time: '2 min' },
  ];

  const beforeY = beforeStages.map((_, i) => 40 + i * (bh + gap));

  return (
    <figure className="diagram-figure">
      <svg viewBox="0 0 620 310" xmlns="http://www.w3.org/2000/svg" className="diagram-svg" aria-label="CI pipeline before and after: sequential vs parallel">
        {/* Section headers */}
        <text x={bc} y="18" textAnchor="middle" className="diag-label diag-label--err diag-label--section">Before · 40 min</text>
        <text x={ac} y="18" textAnchor="middle" className="diag-label diag-label--ok diag-label--section">After · ~8 min</text>

        {/* Divider */}
        <line x1="310" y1="0" x2="310" y2="310" className="diag-line diag-line--marker" strokeDasharray="3 4" />

        {/* Before: sequential boxes */}
        {beforeStages.map((s, i) => {
          const y = beforeY[i] ?? 0;
          return (
            <g key={i}>
              {i > 0 && <line x1={bc} y1={(beforeY[i - 1] ?? 0) + bh} x2={bc} y2={y} className="diag-line" />}
              <rect x={bx} y={y} width={bw} height={bh} rx="6" className="diag-box" />
              <text x={bc} y={y + 14} textAnchor="middle" className="diag-label diag-label--inner">{s.label}</text>
              <text x={bc} y={y + 27} textAnchor="middle" className="diag-label diag-label--err">{s.time}</text>
            </g>
          );
        })}

        {/* After: optimised stages */}
        {/* Install (cached) */}
        <rect x={ax} y="40" width={aw} height={bh} rx="6" className="diag-box diag-box--inner" />
        <text x={ac} y="54" textAnchor="middle" className="diag-label diag-label--inner">install [cache hit]</text>
        <text x={ac} y="67" textAnchor="middle" className="diag-label diag-label--ok">~25 sec</text>

        {/* Build (affected only) */}
        <line x1={ac} y1="74" x2={ac} y2="92" className="diag-line" />
        <rect x={ax} y="92" width={aw} height={bh} rx="6" className="diag-box diag-box--inner" />
        <text x={ac} y="106" textAnchor="middle" className="diag-label diag-label--inner">build [affected only]</text>
        <text x={ac} y="119" textAnchor="middle" className="diag-label diag-label--ok">~3 min</text>

        {/* Parallel test matrix */}
        <line x1={ac} y1="126" x2={ac} y2="144" className="diag-line" />
        {/* Fan out lines */}
        <line x1={ac} y1="144" x2="405" y2="154" className="diag-line" />
        <line x1={ac} y1="144" x2={ac} y2="154" className="diag-line" />
        <line x1={ac} y1="144" x2="555" y2="154" className="diag-line" />
        {/* Three parallel test boxes */}
        <rect x="373" y="154" width="64" height={bh} rx="5" className="diag-box diag-box--remote" />
        <text x="405" y="169" textAnchor="middle" className="diag-label diag-label--inner">unit</text>
        <rect x="443" y="154" width="74" height={bh} rx="5" className="diag-box diag-box--remote" />
        <text x="480" y="169" textAnchor="middle" className="diag-label diag-label--inner">integration</text>
        <rect x="523" y="154" width="64" height={bh} rx="5" className="diag-box diag-box--remote" />
        <text x="555" y="169" textAnchor="middle" className="diag-label diag-label--inner">e2e</text>
        <text x={ac} y="200" textAnchor="middle" className="diag-label diag-label--ok">~4 min · parallel</text>
        {/* Fan in lines */}
        <line x1="405" y1="188" x2={ac} y2="210" className="diag-line" />
        <line x1={ac} y1="188" x2={ac} y2="210" className="diag-line" />
        <line x1="555" y1="188" x2={ac} y2="210" className="diag-line" />

        {/* Deploy */}
        <rect x={ax} y="210" width={aw} height={bh} rx="6" className="diag-box diag-box--inner" />
        <text x={ac} y="224" textAnchor="middle" className="diag-label diag-label--inner">deploy [affected]</text>
        <text x={ac} y="237" textAnchor="middle" className="diag-label diag-label--ok">~1 min</text>

        {/* Fail-fast note */}
        <text x={ac} y="264" textAnchor="middle" className="diag-label diag-label--aside">fail-fast: true · failed suite cancels others</text>
        <text x={ac} y="280" textAnchor="middle" className="diag-label diag-label--aside">deploy blocked until all matrix jobs pass</text>
      </svg>
      <figcaption className="diagram-caption">Before: every step runs sequentially regardless of what changed or failed. After: caching, affected-only filtering, and parallel test matrix cut wall time from 40 min to under 8.</figcaption>
    </figure>
  );
}

const DIAGRAMS: Record<string, () => React.ReactElement> = {
  'mf-topology': MfTopology,
  'mf-token-race': MfTokenRace,
  'prisma-topology': PrismaTopology,
  'ci-pipeline': CiPipeline,
};

export function CaseDiagram({ id }: { id: string }) {
  const Component = DIAGRAMS[id];
  if (!Component) return null;
  return <Component />;
}
