import integrationAsana from '@/public/images/icons/asana-with-black-text.svg';
import integrationDiscord from '@/public/images/icons/integration-discord.svg';
import integrationDropbox from '@/public/images/icons/dropbox-with-black-text.svg';
import integrationHotjar from '@/public/images/icons/hotjar-with-black-text.svg';
import integrationMocha from '@/public/images/icons/integration-mocha.svg';
import integrationNotion from '@/public/images/icons/notion-with-black-text.svg';
import integrationPinterest from '@/public/images/icons/integration-pinterest.svg';
import integrationReddit from '@/public/images/icons/integration-redit.svg';
import integrationSnapchat from '@/public/images/icons/integration-snapchat.svg';
import integrationSpotify from '@/public/images/icons/spotify-with-black-text.svg';
import integrationStripe from '@/public/images/icons/stripe-with-black-text.svg';
import integrationTwitter from '@/public/images/icons/integration-twitter.svg';
import integrationYoutube from '@/public/images/icons/integration-youtube.svg';
import integrationYoutubeMusic from '@/public/images/icons/integration-youtube-music.svg';
import integrationZapier from '@/public/images/icons/integration-zapier.svg';
import { StaticImageData } from 'next/image';

export interface IntegrationOrbitLogo {
  src: StaticImageData;
  alt: string;
}

export const integrationOrbitLogos: IntegrationOrbitLogo[] = [
  { src: integrationZapier, alt: 'Automation & Workflow' },
  { src: integrationDiscord, alt: 'Demand Partner Connect' },
  { src: integrationMocha, alt: 'Ad Server Integration' },
  { src: integrationYoutube, alt: 'Video Inventory' },
  { src: integrationStripe, alt: 'Revenue Processing' },
  { src: integrationTwitter, alt: 'Social Inventory' },
  { src: integrationHotjar, alt: 'Viewability Analytics' },
  { src: integrationYoutubeMusic, alt: 'Audio Monetisation' },
  { src: integrationAsana, alt: 'AdOps Project Management' },
  { src: integrationPinterest, alt: 'Visual Ad Inventory' },
  { src: integrationNotion, alt: 'Publisher Reporting' },
  { src: integrationReddit, alt: 'Community Inventory' },
  { src: integrationSnapchat, alt: 'Mobile Inventory' },
  { src: integrationDropbox, alt: 'Creative Asset Storage' },
  { src: integrationSpotify, alt: 'Audio Ad Integration' },
  { src: integrationZapier, alt: 'Automation & Workflow' },
  { src: integrationDiscord, alt: 'Demand Partner Connect' },
  { src: integrationMocha, alt: 'Ad Server Integration' },
  { src: integrationYoutube, alt: 'Video Inventory' },
  { src: integrationStripe, alt: 'Revenue Processing' },
  { src: integrationTwitter, alt: 'Social Inventory' },
  { src: integrationHotjar, alt: 'Viewability Analytics' },
  { src: integrationYoutubeMusic, alt: 'Audio Monetisation' },
];
