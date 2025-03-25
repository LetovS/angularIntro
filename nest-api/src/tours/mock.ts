import { v4 as uuidv4 } from 'uuid';
import { ITour } from './tours.service';

export function initData(): ITour[] {
  return [
    {
      id: uuidv4(),
      name: 'Mexico',
      description: 'From the south to the center of the country',
      tourOperator: 'LocalAdventures',
      price: '€2,192',
      img: 'pic0.jpg',
      type: 'multi',
      locationId: 'loc1',
    },
    {
      id: uuidv4(),
      name: 'Italia, Ocean Cruise',
      description: 'Discover Pearls of France & Italy',
      tourOperator: 'Emerald Waterways',
      price: '€3,579',
      img: 'pic1.jpg',
      type: 'multi',
      date: new Date(2025, 12, 25),
      locationId: 'loc2',
    },
    {
      id: uuidv4(),
      name: 'Pharaohs Nile Cruise Adventure',
      description:
        'Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.',
      tourOperator: 'LocalAdventures',
      price: '€1,100',
      img: 'pic2.jpg',
      date: new Date(2025, 12, 25),
      locationId: 'loc3',
    },
    {
      id: uuidv4(),
      name: 'Philippines One Life Adventures - 10 Days',
      description:
        'Fantastic tour with a variety of activities and enough chill time. Excellent tour.',
      tourOperator: 'Emerald Waterways',
      price: '€825',
      img: 'pic3.jpg',
      locationId: 'loc4',
    },
    {
      id: uuidv4(),
      name: 'Kilimanjaro climbing machame route 7 days',
      description:
        'Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.',
      tourOperator: 'Bali Bucket List Tours',
      price: '€761',
      img: 'pic4.jpg',
      type: 'multi',
      locationId: 'loc5',
    },
    {
      id: uuidv4(),
      name: '3 Day Southwest USA National Parks Tour from Las Vegas',
      description:
        'Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon',
      tourOperator: 'BH Lanka Tours',
      price: '€1200',
      img: 'pic5.jpg',
      locationId: 'loc6',
    },
    {
      id: uuidv4(),
      name: 'Bali Bucket List Original 10 Day Tour',
      description:
        'Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak',
      tourOperator: 'LocalAdventures',
      price: '€950',
      img: 'pic6.jpg',
      locationId: 'loc2',
    },
    {
      id: uuidv4(),
      name: 'National Parks Tour 3 Days Small Group Tour from Las Vegas',
      description:
        'Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon',
      tourOperator: 'Emerald Waterways',
      price: '€1200',
      img: 'pic7.jpg',
      type: 'single',
      locationId: 'loc1',
    },
    {
      id: uuidv4(),
      name: 'Grand Tour Of Sri Lanka',
      description:
        'Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy',
      tourOperator: 'LocalAdventures',
      price: '€680',
      img: 'pic8.jpg',
      locationId: 'loc1',
    },
    {
      id: uuidv4(),
      name: 'Southern Treasures - 8 Days',
      description:
        'Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno',
      tourOperator: 'Emerald Waterways',
      price: '€1,279',
      img: 'pic9.jpg',
      locationId: 'loc3',
    },
    {
      id: uuidv4(),
      name: 'Japan One Life Adventures - 10 Days',
      description: 'Tokyo, Hakone, Takayama, Kyoto, Osaka',
      tourOperator: 'LocalAdventures',
      price: '€1,192',
      img: 'pic10.jpg',
      locationId: 'loc1',
    },
  ];
}
