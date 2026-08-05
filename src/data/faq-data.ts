export interface FAQItem {
  id: string;
  category:
    | 'Google Ad Manager'
    | 'Ad Operations'
    | 'Yield Optimization'
    | 'Programmatic Deals'
    | 'Publisher Monetization'
    | 'Technical & Integration';
  question: string;
  answer: string;
}

export const CATEGORIES = [
  'All',
  'Google Ad Manager',
  'Ad Operations',
  'Yield Optimization',
  'Programmatic Deals',
  'Publisher Monetization',
  'Technical & Integration',
] as const;

export const FAQ_DATA: FAQItem[] = [
  // ==================================================
  // GOOGLE AD MANAGER
  // ==================================================
  {
    id: 'gam-01',
    category: 'Google Ad Manager',
    question: 'What is Google Ad Manager and why do digital publishers use it?',
    answer:
      'Google Ad Manager (GAM) is an enterprise ad serving platform that enables publishers to manage, deliver, and optimize advertising inventory across direct campaigns, Google AdX, open auctions, and programmatic deals within a single centralized dashboard.',
  },
  {
    id: 'gam-02',
    category: 'Google Ad Manager',
    question: 'What is the difference between Google AdSense and Google Ad Manager?',
    answer:
      'Google AdSense is a plug-and-play contextual ad network designed for smaller sites with simple monetization needs. Google Ad Manager is a full-featured ad server designed for scaling publishers who manage direct sales, multiple demand partners, Unified Pricing Rules, and header bidding.',
  },
  {
    id: 'gam-03',
    category: 'Google Ad Manager',
    question: 'How should I structure Ad Units and Placements in Google Ad Manager?',
    answer:
      'Keep your inventory hierarchy clean and logical by naming ad units according to site section, position, and device (e.g., Homepage_Header_Leaderboard_Desktop). Use custom Key-Values for granular page-level context rather than multiplying ad units unnecessarily.',
  },
  {
    id: 'gam-04',
    category: 'Google Ad Manager',
    question: 'What are Unified Pricing Rules (UPR) and how do they work?',
    answer:
      'Unified Pricing Rules set minimum acceptable floor prices across programmatic buyers (Google AdX, Open Bidding, and Price Priority line items). Configuring dynamic floor prices by geographic region and device type prevents buyers from acquiring premium inventory under market value.',
  },
  {
    id: 'gam-05',
    category: 'Google Ad Manager',
    question: 'Why is my Google Ad Manager line item under-delivering or stuck?',
    answer:
      'Under-delivery usually stems from conflicting priority levels, restrictive targeting (such as overlapping key-values or geo blocks), unavailable creative dimensions, or CPM floor prices set higher than buyer willingness to bid. GAM Delivery Diagnostics help isolate the root cause.',
  },

  // ==================================================
  // AD OPERATIONS
  // ==================================================
  {
    id: 'adops-01',
    category: 'Ad Operations',
    question: 'What does a dedicated Ad Operations (AdOps) team do?',
    answer:
      'An AdOps team manages the day-to-day technical advertising workflow—including campaign trafficking, line item configuration, third-party tag auditing, header bidding maintenance, revenue reporting, inventory forecasting, and real-time delivery troubleshooting.',
  },
  {
    id: 'adops-02',
    category: 'Ad Operations',
    question: 'How does Aeli AdOps handle creative trafficking and tag validation?',
    answer:
      'We validate all HTML5 assets, JavaScript tags, and VAST video creatives in a controlled environment prior to launch. We test for layout compliance, heavy CPU/bandwidth execution, SSL compliance, and tracking pixel accuracy.',
  },
  {
    id: 'adops-03',
    category: 'Ad Operations',
    question: 'How do you protect publisher sites from malicious redirects and heavy ads?',
    answer:
      'We enforce strict creative scanning, utilize Google Ad Review Center blocks, configure heavy-ad capping rules in GAM, and deploy wrapper protection protocols to block autoredirects and non-compliant rich media tags.',
  },
  {
    id: 'adops-04',
    category: 'Ad Operations',
    question: 'How do you resolve reporting discrepancies between ad servers and demand partners?',
    answer:
      'Discrepancies under 5% are standard in digital advertising. When discrepancies exceed 10%, we audit timezone alignment, cache busting tags, macro syntax, network latency timeouts, and geo-targeting discrepancies between buyers and GAM.',
  },

  // ==================================================
  // YIELD OPTIMIZATION
  // ==================================================
  {
    id: 'yield-01',
    category: 'Yield Optimization',
    question: 'What is yield optimization in digital publishing?',
    answer:
      'Yield optimization is the continuous process of structuring pricing rules, demand competition, inventory layouts, and ad delivery logic to extract maximum total revenue per session (eRPM) without harming site performance or reader experience.',
  },
  {
    id: 'yield-02',
    category: 'Yield Optimization',
    question: 'Why is a 100% fill rate rarely ideal for publisher revenue?',
    answer:
      'Achieving 100% fill rate often requires accepting penny-bids ($0.05 - $0.10 CPMs) for remnant inventory. Accepting ultra-cheap bids degrades site speed and dilutes domain reputation. Optimizing for 75%–90% fill rate at higher floor prices yields significantly greater net revenue.',
  },
  {
    id: 'yield-03',
    category: 'Yield Optimization',
    question: 'What is the difference between eCPM and Page RPM (eRPM)?',
    answer:
      'eCPM measures average revenue per 1,000 served ad impressions. Page RPM (or eRPM) measures total revenue earned per 1,000 pageviews across all ad slots combined. Page RPM provides the true measure of holistic session monetization.',
  },
  {
    id: 'yield-04',
    category: 'Yield Optimization',
    question: 'How often should floor prices be audited and updated?',
    answer:
      'We recommend weekly monitoring and monthly dynamic floor price adjustments. Floor prices should adapt to seasonal advertiser spending surges (such as Q4 holiday spikes) and Q1 budget slowdowns.',
  },

  // ==================================================
  // PROGRAMMATIC DEALS
  // ==================================================
  {
    id: 'prog-01',
    category: 'Programmatic Deals',
    question: 'What is the difference between Programmatic Guaranteed (PG) and Preferred Deals (PD)?',
    answer:
      'Programmatic Guaranteed (PG) deals commit to a fixed CPM price and a guaranteed impression volume. Preferred Deals (PD) offer a single buyer a "first look" at a fixed CPM price, but without any guaranteed impression purchase commitment from the buyer.',
  },
  {
    id: 'prog-02',
    category: 'Programmatic Deals',
    question: 'What is a Private Marketplace (PMP) deal ID?',
    answer:
      'A Private Marketplace (PMP) is an invite-only programmatic auction where publishers package premium audience segments or high-viewability inventory and offer custom deal IDs with minimum price floors to selected agency buyers.',
  },
  {
    id: 'prog-03',
    category: 'Programmatic Deals',
    question: 'How does Header Bidding work with Google Ad Manager?',
    answer:
      'Header bidding executes a parallel auction in the browser (or on a Prebid server) before GAM is called. Top bids are passed into GAM via key-values, where they compete against Google AdX on real CPM price via Price Priority line items.',
  },
  {
    id: 'prog-04',
    category: 'Programmatic Deals',
    question: 'Should my publication use Client-Side or Server-Side Header Bidding?',
    answer:
      'Client-side header bidding captures higher cookie matching and bid rates, but increases browser latency. Server-to-server (S2S Prebid Server) reduces browser CPU load and speeds up LCP. Many high-traffic publishers utilize a hybrid setup.',
  },

  // ==================================================
  // PUBLISHER MONETIZATION & AUDIT
  // ==================================================
  {
    id: 'pub-01',
    category: 'Publisher Monetization',
    question: 'What is included in the Aeli AdOps Free Publisher Audit?',
    answer:
      'Our audit evaluates your current ad server hierarchy, Unified Pricing Rules, viewability scores, header bidding configuration, page latency impact, and ad density compliance to highlight immediate revenue growth opportunities.',
  },
  {
    id: 'pub-02',
    category: 'Publisher Monetization',
    question: 'How long does the Free Publisher Audit take, and is there any obligation?',
    answer:
      'The audit is completely free with zero obligation. Once requested, our yield specialists analyze your setup and deliver a structured audit report within 48 to 72 hours.',
  },
  {
    id: 'pub-03',
    category: 'Publisher Monetization',
    question: 'Can I increase website ad revenue without adding more ad units?',
    answer:
      'Yes. Improving viewability rates from 50% to 75%+, re-positioning low-attention sidebar units into content zones, and setting dynamic geo-floor pricing consistently increases net revenue without multiplying ad slots.',
  },
  {
    id: 'pub-04',
    category: 'Publisher Monetization',
    question: 'How do I get started working with Aeli AdOps?',
    answer:
      'Simply request a Free Publisher Audit or reach out via our contact page. We will schedule a brief discussion to review your monetization goals and outline an execution plan.',
  },

  // ==================================================
  // TECHNICAL & INTEGRATION
  // ==================================================
  {
    id: 'tech-01',
    category: 'Technical & Integration',
    question: 'How does ad viewability impact buyer bid rates?',
    answer:
      'Demand-Side Platforms (DSPs) automatically track domain-level viewability. If your site viewability drops below 70%, DSP algorithms penalize your domain by reducing bid prices or excluding unviewable inventory from premium campaigns.',
  },
  {
    id: 'tech-02',
    category: 'Technical & Integration',
    question: 'Will adding third-party ad scripts slow down my website?',
    answer:
      'If loaded synchronously, ad scripts will block main-thread rendering. Loading tags asynchronously, setting strict auction timeouts (1,000ms–1,200ms), and enforcing lazy loading prevents ad tags from degrading Core Web Vitals.',
  },
  {
    id: 'tech-03',
    category: 'Technical & Integration',
    question: 'How do you prevent Cumulative Layout Shift (CLS) caused by ad slots?',
    answer:
      'We enforce fixed CSS min-height wrapper dimensions on all ad containers (e.g., min-height: 250px for 300x250 slots) so layout space is reserved before the ad creative loads asynchronously.',
  },
  {
    id: 'tech-04',
    category: 'Technical & Integration',
    question: 'How do you handle Consent Management Platforms (CMP) and GDPR/CCPA privacy rules?',
    answer:
      'We integrate IAB TCF v2.2 compliant Consent Management Platforms with GAM and Prebid wrappers, ensuring personalized ads and third-party tracking tags render strictly when user consent signals are validated.',
  },
];
