export interface IOrder {
  items: IOrderItem[];
  status: boolean;
  total: string;
  date: Date;
  customerName: string;
  id: string
}


export interface IOrderItem{
  name: string;
  quantity: number;
  price: number;
}

export function initTestData(): IOrder[] {
  return [
    {
      id: "ORD-001",
      customerName: "Иванов Алексей",
      date: new Date("2023-05-15"),
      total: '2450',
      status: true,
      items: [
        {
          name: "Тур в Турцию (Анталия, все включено)",
          quantity: 2,
          price: 1200
        },
        {
          name: "Экскурсия в Демре-Мира-Кекова",
          quantity: 2,
          price: 25
        }
      ]
    },
    {
      id: "ORD-002",
      customerName: "Петрова Мария",
      date: new Date("2023-06-22"),
      total: '3780',
      status: false,
      items: [
        {
          name: "Круиз по Средиземному морю (7 дней)",
          quantity: 1,
          price: 3500
        },
        {
          name: "Страховка для путешествий",
          quantity: 1,
          price: 280
        }
      ]
    },
    {
      id: "ORD-003",
      customerName: "Сидоров Дмитрий",
      date: new Date("2023-07-10"),
      total: '5430',
      status: true,
      items: [
        {
          name: "Горнолыжный тур в Альпы (8 дней)",
          quantity: 3,
          price: 1800
        },
        {
          name: "Аренда снаряжения",
          quantity: 3,
          price: 10
        }
      ]
    },
    {
      id: "ORD-004",
      customerName: "Кузнецова Анна",
      date: new Date("2023-08-05"),
      total: '620',
      status: true,
      items: [
        {
          name: "Уикенд в Карпатах (2 дня)",
          quantity: 1,
          price: 500
        },
        {
          name: "Экскурсия на водопад Шипот",
          quantity: 1,
          price: 120
        }
      ]
    },
    {
      id: "ORD-005",
      customerName: "Васильев Олег",
      date: new Date("2023-09-18"),
      total: '8900',
      status: false,
      items: [
        {
          name: "Экзотический тур на Мальдивы (10 дней)",
          quantity: 2,
          price: 4000
        },
        {
          name: "Дайвинг-тур",
          quantity: 2,
          price: 450
        }
      ]
    }
  ]
}
