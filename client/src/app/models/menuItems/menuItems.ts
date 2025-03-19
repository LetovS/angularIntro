import {MenuItem} from 'primeng/api';

export function initMenuItems(): MenuItem [] {
  return [
    {
      label: 'Билеты',
      routerLink : ['/tours'],
    },
    {
      label: 'Настройки',
      routerLink : ['/settings'],
    },
    {
      label: 'Заказы',
      routerLink : ['/orders'],
    }
  ]
}
