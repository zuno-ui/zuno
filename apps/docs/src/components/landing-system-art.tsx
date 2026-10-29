const bitmapType = [
  "01110..00000", "11011..00000", "11011..01110", "11111..00011",
  "11011..01111", "11011..11011", "11011..01111",
]

const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]

export function LandingSystemArt() {
  return <svg className="landing-system-art" viewBox="0 0 520 620" fill="none" aria-hidden="true">
    <defs>
      {Array.from({ length: 8 }, (_, level) => <pattern key={level} id={`system-tone-${level}`} width="8" height="8" patternUnits="userSpaceOnUse">
        {bayer.map((threshold, index) => threshold < (level + 1) * 2 ? <rect key={index} x={(index % 4) * 2} y={Math.floor(index / 4) * 2} width="1.25" height="1.25" fill="currentColor" /> : null)}
      </pattern>)}
    </defs>
    <g stroke="currentColor" strokeDasharray="1 5" opacity=".3">
      <path d="M112 156v40M368 150v54M148 444v52M392 432v72M38 298H482" />
      <circle cx="260" cy="310" r="222" />
      <path d="M34 78h20m-10-10v20M466 548h20m-10-10v20" strokeDasharray="none" />
    </g>

    <g className="landing-art-foundations">
      <g transform="rotate(-8 132 110)">
        <rect x="66" y="60" width="140" height="110" fill="url(#system-tone-3)" />
        <rect x="58" y="52" width="140" height="110" fill="var(--background)" stroke="currentColor" strokeDasharray="1 3" />
        <rect x="58" y="52" width="140" height="4" fill="url(#system-tone-6)" />
        <g fill="url(#system-tone-6)">{bitmapType.flatMap((row, y) => [...row].map((pixel, x) => pixel === "1" ? <rect key={`${x}-${y}`} x={78 + x * 8} y={70 + y * 9} width="6" height="7" /> : null))}</g>
        <text x="78" y="148" fill="currentColor" fontSize="8" letterSpacing="2">TYPE / 01</text>
      </g>
      <g transform="rotate(8 365 119)">
        <rect x="307" y="75" width="136" height="98" fill="url(#system-tone-2)" />
        <rect x="300" y="68" width="136" height="98" fill="var(--background)" stroke="currentColor" strokeDasharray="1 3" />
        <rect x="300" y="68" width="136" height="4" fill="url(#system-tone-6)" />
        <rect x="318" y="87" width="25" height="36" fill="url(#system-tone-7)" />
        <rect x="348" y="87" width="25" height="36" fill="url(#system-tone-4)" />
        <rect x="378" y="87" width="39" height="36" fill="url(#system-tone-1)" />
        <text x="318" y="148" fill="currentColor" fontSize="8" letterSpacing="2">PALETTE / 02</text>
      </g>
    </g>

    <g className="landing-art-components"><g transform="rotate(-4 264 320)">
      <path d="M84 210h354v248H84z" fill="url(#system-tone-3)" />
      <rect x="74" y="200" width="354" height="248" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1 3" />
      <rect x="74" y="200" width="354" height="5" fill="url(#system-tone-7)" />
      <rect x="418" y="205" width="10" height="243" fill="url(#system-tone-4)" />
      <rect x="407" y="205" width="11" height="243" fill="url(#system-tone-1)" />
      <path d="M74 232H428M136 232V448" stroke="currentColor" strokeDasharray="1 3" />
      <g fill="currentColor"><rect x="89" y="213" width="4" height="4" /><rect x="99" y="213" width="4" height="4" opacity=".6" /><rect x="109" y="213" width="4" height="4" opacity=".3" /></g>
      <text x="154" y="220" fill="currentColor" fontSize="8" letterSpacing="2">YOUR NEXT INTERFACE</text>
      <g fill="url(#system-tone-4)"><rect x="88" y="251" width="34" height="22" /><rect x="88" y="286" width="24" height="5" /><rect x="88" y="304" width="31" height="5" /><rect x="88" y="322" width="20" height="5" /><rect x="88" y="340" width="28" height="5" /><rect x="88" y="415" width="22" height="5" /></g>
      <g stroke="currentColor" strokeDasharray="1 3"><path d="M154 257H304M154 270H248" /><rect x="154" y="292" width="112" height="94" /><rect x="280" y="292" width="112" height="94" /></g>
      <g fill="url(#system-tone-5)"><rect x="166" y="338" width="12" height="33" /><rect x="185" y="322" width="12" height="49" /><rect x="204" y="345" width="12" height="26" /><rect x="223" y="311" width="12" height="60" /><rect x="242" y="330" width="12" height="41" /></g>
      <circle cx="336" cy="339" r="30" fill="url(#system-tone-2)" />
      <path d="M336 309a30 30 0 0 1 30 30h-30z" fill="url(#system-tone-7)" />
      <circle cx="336" cy="339" r="18" fill="var(--background)" />
      <path d="M154 405H260M154 419H224M280 405H392M280 419H351" stroke="currentColor" strokeDasharray="1 3" />
    </g></g>

    <g className="landing-art-tokens">
      <g transform="rotate(7 130 508)">
        <rect x="39" y="484" width="204" height="70" fill="url(#system-tone-3)" />
        <rect x="32" y="477" width="204" height="70" fill="var(--background)" stroke="currentColor" strokeDasharray="1 3" />
        <text x="49" y="496" fill="currentColor" fontSize="8" letterSpacing="2">COMPOSE / 03</text>
        <path d="M49 524H165" stroke="currentColor" strokeWidth="2" strokeDasharray="1 3" />
        <rect x="49" y="521" width="62" height="6" fill="url(#system-tone-7)" />
        <rect x="107" y="518" width="11" height="12" fill="var(--background)" stroke="currentColor" strokeDasharray="1 2" />
        <rect x="184" y="515" width="34" height="16" rx="8" fill="url(#system-tone-6)" /><circle cx="210" cy="523" r="6" fill="var(--background)" />
      </g>
      <g transform="rotate(-8 369 514)">
        <rect x="296" y="491" width="170" height="62" fill="url(#system-tone-3)" />
        <rect x="288" y="483" width="170" height="62" fill="var(--background)" stroke="currentColor" strokeDasharray="1 3" />
        <rect x="299" y="494" width="148" height="40" fill="url(#system-tone-5)" />
        <text x="322" y="519" fill="currentColor" stroke="var(--background)" strokeWidth="3" paintOrder="stroke" fontSize="12">Build it</text>
        <path d="M417 509h12m-5-5 5 5-5 5" stroke="currentColor" />
      </g>
    </g>
    <g className="landing-art-cursor"><g transform="translate(400 420) rotate(-12)">
      <path d="M8 8h8v8h8v8h8v8h8v8H24v8h-8V32H8Z" fill="url(#system-tone-5)" transform="translate(7 7)" />
      <path d="M8 8h8v8h8v8h8v8h8v8H24v8h-8V32H8Z" fill="currentColor" stroke="var(--background)" strokeWidth="4" />
    </g></g>
  </svg>
}
