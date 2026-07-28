/**
 * ForgeHub mark — anvil + network node, with the "F" as the fixed brand
 * anchor across both variants.
 *
 * variant="solid"  — filled anvil, for primary placements: nav headers,
 *                     auth screens, the landing page, favicons at larger
 *                     sizes.
 * variant="mesh"    — wireframe/low-poly anvil, for secondary or
 *                     decorative placements: loading states, background
 *                     watermarks, AI-touchpoint accents, small favicons,
 *                     empty-state illustrations.
 *
 * tone="brand"   — two-tone navy body + amber mark (default)
 * tone="mono"    — single currentColor, for places tone="brand" would
 *                  clash (e.g. on a colored button, inside a pill)
 * tone="inverse" — lighter navy body, for the mark sitting on a dark
 *                  surface where the default navy would disappear
 */

type LogoProps = {
  variant?: "solid" | "mesh";
  tone?: "brand" | "mono" | "inverse";
  className?: string;
  title?: string;
};

const BRAND = {
  anvil: "#24466B",
  anvilInverse: "#4A7BAA",
  mark: "#E8692C",
};

export function Logo({ variant = "solid", tone = "brand", className = "", title = "ForgeHub" }: LogoProps) {
  const anvilColor = tone === "mono" ? "currentColor" : tone === "inverse" ? BRAND.anvilInverse : BRAND.anvil;
  const markColor = tone === "mono" ? "currentColor" : BRAND.mark;

  return (
    <svg
      viewBox="0 0 120 104"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === "solid" ? (
        <SolidAnvil anvilColor={anvilColor} markColor={markColor} />
      ) : (
        <MeshAnvil color={anvilColor} markColor={markColor} />
      )}
    </svg>
  );
}

function SolidAnvil({ anvilColor, markColor }: { anvilColor: string; markColor: string }) {
  return (
    <g>
      {/* horn */}
      <polygon points="6,52 34,42 34,60" fill={anvilColor} />
      {/* face block */}
      <rect x="30" y="34" width="76" height="26" rx="4" fill={anvilColor} />
      {/* waist */}
      <rect x="58" y="60" width="20" height="18" fill={anvilColor} />
      {/* base */}
      <polygon points="44,78 92,78 100,98 36,98" fill={anvilColor} />

      {/* hub / network detail, top right */}
      <g stroke={markColor} strokeWidth="1.5" opacity="0.85" fill="none">
        <line x1="96" y1="34" x2="108" y2="22" />
        <line x1="108" y1="22" x2="118" y2="30" />
        <line x1="108" y1="22" x2="104" y2="34" />
      </g>
      <circle cx="108" cy="22" r="3.5" fill={markColor} />
      <circle cx="118" cy="30" r="2.5" fill={markColor} />
      <circle cx="96" cy="34" r="2.5" fill={markColor} />

      {/* F */}
      <rect x="60" y="38" width="8" height="24" rx="2" fill={markColor} />
      <rect x="60" y="38" width="24" height="8" rx="2" fill={markColor} />
      <rect x="60" y="48" width="18" height="7" rx="2" fill={markColor} />
    </g>
  );
}

function MeshAnvil({ color, markColor }: { color: string; markColor: string }) {
  const nodes: [number, number][] = [
    [6, 52],
    [20, 45],
    [34, 42],
    [34, 60],
    [58, 34],
    [88, 34],
    [106, 34],
    [106, 60],
    [78, 60],
    [78, 78],
    [58, 78],
    [58, 60],
    [92, 98],
    [44, 98],
    [44, 78],
    [36, 60],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [8, 4],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 3],
    [9, 12],
    [10, 14],
    [14, 13],
    [13, 12],
    [14, 15],
    [15, 3],
    [11, 8],
  ];

  return (
    <g>
      <g stroke={color} strokeWidth="1" opacity="0.6">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill={color}>
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" />
        ))}
      </g>
      {/* F stays solid even in wireframe mode — otherwise it stops reading as a letter */}
      <rect x="60" y="38" width="8" height="24" rx="2" fill={markColor} />
      <rect x="60" y="38" width="24" height="8" rx="2" fill={markColor} />
      <rect x="60" y="48" width="18" height="7" rx="2" fill={markColor} />
    </g>
  );
}
