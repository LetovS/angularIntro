import {MenuItem} from 'primeng/api';

export function initMenuItems(): MenuItem [] {
  return [
    {
      label: $localize`:@@tickets:Tickets`,
      routerLink: ['/tours'],
    },
    {
      label: $localize`:@@settings:Settings`,
      routerLink: ['/settings'],
    },
    {
      label: $localize`:@@orders:Orders`,
      routerLink: ['/orders'],
    },
  ]
}

export interface ISocial{
  url: string;
  icon: string;
  color: string;
  hoverColor: string
}

export function socialLinks (): ISocial []  {
  return [
    {
      url: 'https://facebook.com',
      icon: 'fab fa-facebook-f',
      color: 'text-blue-600',
      hoverColor: 'hover:text-blue-200'
    },
    {
      url: 'https://instagram.com',
      icon: 'fab fa-instagram',
      color: 'text-pink-600',
      hoverColor: 'hover:text-pink-200'
    },
    {
      url: 'https://vk.com',
      icon: 'fab fa-vk',
      color: 'text-blue-800',
      hoverColor: 'hover:text-blue-200'
    },
    {
      url: 'https://ok.ru',
      icon: 'fab fa-odnoklassniki',
      color: 'text-orange-600',
      hoverColor: 'hover:text-orange-200'
    },
    {
      url: 'https://telegram.org',
      icon: 'fab fa-telegram-plane',
      color: 'text-blue-500',
      hoverColor: 'hover:text-blue-200'
    }
  ];
}
