export class MenuItem {
  label: string;
  routeLink: string [];
}

export function initMenuItems() {
  return [
    {
      label: 'Билеты',
      routeLink: ['/tours'],
    },
    {
      label: 'Настройки',
      routeLink: ['/settings'],
    },
    {
      label: 'Заказы',
      routeLink: ['/orders'],
    }
  ]
}
