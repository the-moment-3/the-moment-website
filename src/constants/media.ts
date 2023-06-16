export interface Media {
  name: string;
  icon: string;
  hoverIcon: string;
  url: string;
}

export const mediaList: Media[] = [
  {
    name: 'Twitter',
    icon: 'https://img.alicdn.com/imgextra/i4/O1CN018FomBj1UPAZewCyt5_!!6000000002509-2-tps-96-96.png',
    hoverIcon: 'https://img.alicdn.com/imgextra/i2/O1CN01fyyEyc1t293WdfTKQ_!!6000000005843-2-tps-96-96.png',
    url: 'https://twitter.com/The_Moment3',
  },
  {
    name: 'Discord',
    icon: 'https://img.alicdn.com/imgextra/i1/O1CN01UNuJHC1KBIPyz3pVr_!!6000000001125-2-tps-96-96.png',
    hoverIcon: 'https://img.alicdn.com/imgextra/i4/O1CN01pq6EAK1w2YFsmdUD8_!!6000000006250-2-tps-96-96.png',
    url: 'https://discord.gg/themoment3',
  },
];
