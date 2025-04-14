import {MenuItem} from 'primeng/api';
import {LocalizationService} from '../../services/localization.service';


export function initMenuItems(service: LocalizationService, role: string | null): MenuItem[] {
  const allItems: { key: string, roles?: string[] }[] = [
    { key: 'tours' }, // Всегда доступен
    { key: 'orders', roles: ['admin', 'moderator', 'user'] },
    { key: 'settings', roles: ['admin', 'moderator'] },
  ];

  return allItems
    .filter(item => !item.roles || (role && item.roles.includes(role)))
    .map(item => ({
      label: service.translate(item.key),
      routerLink: [`/${item.key}`],
    }));
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
