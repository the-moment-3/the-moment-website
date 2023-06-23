import { useEffect } from 'react';
import { useLocation } from 'ice';

export interface NavAnchor {
  link: string;
  title: string;
}

export const navAnchor: NavAnchor[] = [
  {
    link: '/season_one',
    title: 'nftwebsite_shouye.Vision',
  },
  {
    link: '/whitepaper',
    title: 'nft_whitepaper', // mds
  },
  {
    link: '/roadmap',
    title: 'nftwebsite_shouye.Roadmap',
  },
  {
    link: '/team',
    title: 'nftwebsite_shouye.Theteam',
  },
  {
    link: '/partners',
    title: 'nftwebsite_shouye.Partners',
  },
];

export function isNavLink(link: string) {
  return !!navAnchor.find((item) => item.link === link);
}

export function getPageIdByLink(link: string) {
  if (!isNavLink(link)) {
    throw new Error('Link not found in nav anchor.');
  }
  return link;
}

export function scrollByLink(link: string) {
  setTimeout(() => {
    document.getElementById(link)?.scrollIntoView();
  }, 300);
}

export function useNavPageScroll() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (isNavLink(pathname)) scrollByLink(pathname);
  }, [pathname]);
}
