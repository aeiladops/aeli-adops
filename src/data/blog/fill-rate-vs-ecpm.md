---
slug: "fill-rate-vs-ecpm"
title: "Fill Rate vs eCPM: What Publishers Should Actually Optimize"
category: "Publisher Monetization"
excerpt: "A high fill rate doesn't always mean stronger revenue, and a high eCPM doesn't tell the whole story. Learn how these metrics work together and what publishers should consider when optimizing inventory."
featured: false
image: "/images/blog/fill-rate-ecpm-analytics.png"
publishedAt: "July 22, 2026"
dateTime: "2026-07-22"
readTime: "6 min read"
authorName: "Sarah Jenkins"
authorImage: "/images/ns-avatar-11.jpg"
footerAuthorName: "Sarah Jenkins"
footerAuthorImage: "/images/ns-avatar-11.jpg"
footerPublishedAt: "22 July 2026"
footerReadTime: "6 min read"
order: 4
metaTitle: "Fill Rate vs eCPM: What Publishers Should Actually Optimize | Aeli AdOps"
metaDescription: "Understand the trade-offs between fill rate and eCPM, why 100% fill isn't always ideal, and how to calculate RPM for maximum publisher revenue."
---

When reviewing ad performance dashboards, two key performance indicators dominate the conversation: **Fill Rate** and **eCPM (effective Cost Per Mille)**. 

While both metrics are fundamental to publisher analytics, focusing on either one in isolation creates flawed monetization decisions. A 100% fill rate can mask terrible pricing efficiency, while an exceptionally high eCPM often signals severe under-monetization of available inventory.

<div class="publisher-callout key-takeaway">
  <span class="callout-label">Key Takeaway</span>
  <p>Fill rate measures inventory utilization; eCPM measures inventory pricing power. The true objective for publishers is maximizing RPM (Revenue Per Mille Pageviews) through balanced yield pricing.</p>
</div>

### Defining the Metrics

![AdTech Monetization Analytics Dashboard](/images/blog/fill-rate-ecpm-analytics.png)

To evaluate inventory effectively, let us establish precise definitions:

- **Fill Rate**: The percentage of total ad requests sent to demand sources that resulted in a served ad creative.
  $$\text{Fill Rate} = \frac{\text{Impressions Served}}{\text{Total Ad Requests}} \times 100$$
- **eCPM**: The average revenue earned for every 1,000 served ad impressions.
  $$\text{eCPM} = \frac{\text{Total Revenue}}{\text{Served Impressions}} \times 1000$$
- **Page RPM (Session RPM)**: Total revenue earned per 1,000 pageviews, capturing total session yield regardless of how individual units filled.
  $$\text{Page RPM} = \frac{\text{Total Revenue}}{\text{Total Pageviews}} \times 1000$$

### Why 100% Fill Rate Is Rarely Optimal

Many publishers assume that an unfilled ad request represents wasted money, striving for 100% fill rate at all costs. However, achieving 100% fill usually means accepting penny-bids ($0.05 - $0.10 CPMs) for remnant inventory.

Serving extremely low-value ads carries real costs:
1. **Brand Erosion**: Low-quality ads degrade site presentation and user trust.
2. **Page Speed & Infrastructure Costs**: Rendering an ad creative consumes browser resources and user bandwidth regardless of price.
3. **Advertiser Perception**: Flooding buyers with cheap inventory dilutes your site's reputation as a premium editorial property.

<div class="publisher-callout publisher-tip">
  <span class="callout-label">Publisher Tip</span>
  <p>Target a healthily optimized fill rate between 75% and 90% on programmatic open auction demand. Use floor pricing to reject bids beneath your site's baseline floor value.</p>
</div>

### Finding the Optimal Equilibrium

The graph of price floors versus total revenue follows a bell curve. 

- **Floors Set Too Low**: High fill rate (~98%), low eCPM (~$0.80), sub-optimal total revenue.
- **Floors Set Too High**: Low fill rate (~20%), high eCPM (~$7.50), severely reduced total revenue.
- **Optimal Equilibrium**: Healthy fill rate (~82%), strong eCPM (~$3.40), maximum total revenue.

### Practical Optimization Strategy

To optimize the relationship between fill rate and eCPM:

1. **Segment by GEO**: Establish high floor prices for Tier 1 markets (US, UK, CA, AU) where demand competition is dense, and lower floors for Tier 3 markets to maintain baseline fill.
2. **Implement Backfill Logic**: Use house ads, affiliate promotions, or direct fallback campaigns when programmatic floor prices are not met.
3. **Focus on Page RPM**: Evaluate layout changes based on Page RPM impact rather than per-unit eCPM shifts.

By balancing pricing power with inventory fill, publishers build an ad stack that maximizes net yield while protecting brand integrity.
