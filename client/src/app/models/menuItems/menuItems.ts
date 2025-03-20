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
