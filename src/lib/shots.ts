/**
 * The product screenshots the home page shows, captured from the running
 * product by `scripts/capture-shots.mjs` and packed by `scripts/pack-shots.mjs`
 * (prompt §8: real screens, light theme, 1440 wide, cropped rather than
 * shrunk). Captured 8 October 2026 from the demo account.
 *
 * Each carries its CSS size so the page does not move when it arrives, and
 * alt text that says what the screen shows rather than "product screenshot".
 * Re-run the capture, and check these against what app.refficks.com serves,
 * before a release (§1's time rule).
 */
export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

function shot(name: string, width: number, height: number, alt: string): Shot {
  return { src: `/shots/${name}.webp`, width, height, alt };
}

export const SHOTS = {
  needsYou: shot(
    "needs-you",
    1176,
    728,
    "Intelligence screen, Needs you tab: the day's count of opportunities, risks and items waiting, then recommendations ranked by priority, the first reading “Send Ana Petrova their link” with the evidence “Approved 39 days ago and has not sent a single click”, the figures it rests on, a Do it button and a Not now button.",
  ),
  needsYouCard: shot(
    "needs-you-card",
    814,
    493,
    "One recommendation from the Needs you list: Send Ana Petrova their link, labelled Activate partner, with its evidence sentence, the figures days since approval 39, clicks all time 0 and threshold days 14, the suggested step, and the Do it and Not now buttons.",
  ),
  funnel: shot(
    "activation-funnel",
    1176,
    690,
    "Activation screen: a funnel from signed up to earned commission with the count at each stage and how many stop there, the median days from approval to first click and from first click to first sale, and two lists naming the partners who never sent a click and those whose clicks have not sold.",
  ),
  scoreBreakdown: shot(
    "score-breakdown",
    566,
    678,
    "A partner's Why this score card: seven scores side by side, and under Performance each factor with its points out of the weight, a bar, and a sentence of evidence such as “Attributed revenue is ahead of 73.5% of partners”.",
  ),
  confirmRaise: shot(
    "confirm-raise",
    827,
    241,
    "A recommendation to raise Priya Sundaram from 20% to 25%, with the revenue figures behind it, the confirm button reading Yes, change what they earn, the sentence Costs about $570.58 more per period at their current rate, and a Not now button.",
  ),
} as const;
