import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

let toursStorage: ITour [] = [];

@Injectable()
export class ToursService {

    async getTours(): Promise<ITour []>{
        console.log('recived all tours')
        await Promise.resolve();
        return toursStorage;
    }

    async addTour(newTour: ITour): Promise<number | string>{
        console.log(`Search tour by name: ${newTour.name}`)
        const exist = toursStorage.find(t => t.name === newTour.name) || null;
        if(exist){
            console.log('Alredy exists');
            throw new ConflictException('That tour already exists');
        }
        newTour.id = uuidv4();
        toursStorage.push(newTour);
        return newTour.id;
    }

    async removeTour(removingTourid: string): Promise<true | string>{
        console.log(`Search tour by id: ${removingTourid}`)
        const indexToRemove = toursStorage.findIndex(user => user.id === removingTourid);

        if (indexToRemove !== -1) {
            toursStorage.splice(indexToRemove, 1);
            console.log('Removed')
            return true;
        }
        console.log(`Tour with id: ${removingTourid} not found`);
        throw new NotFoundException(`Tour with id: ${removingTourid} not found`);
    }

    async initData(): Promise<void>{
        await Promise.resolve();
        if(toursStorage.length !== 0){
            return;
        }

        toursStorage = [
            {
                "id" : uuidv4(),
                "name": "Mexico",
                "description": "From the south to the center of the country",
                "tourOperator": "LocalAdventures",
                "price": "€2,192",
                "img": "pic0.jpg",
                "type": "multi"
            },
            {
                "id" : uuidv4(),
                "name": "Italia, Ocean Cruise",
                "description": "Discover Pearls of France & Italy",
                "tourOperator": "Emerald Waterways",
                "price": "€3,579",
                "img": "pic1.jpg",
                "type": "multi",
                "date": new Date(2025, 10, 22)
            },
            {
                "id" : uuidv4(),
                "name": "Pharaohs Nile Cruise Adventure",
                "description": "Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
                "tourOperator": "LocalAdventures",
                "price": "€1,100",
                "img": "pic2.jpg",
                "date": new Date(2025, 10, 22)
            },
            {
                "id" : uuidv4(),
                "name": "Philippines One Life Adventures - 10 Days",
                "description": "Fantastic tour with a variety of activities and enough chill time. Excellent tour.",
                "tourOperator": "Emerald Waterways",
                "price": "€825",
                "img": "pic3.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Kilimanjaro climbing machame route 7 days",
                "description": "Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.",
                "tourOperator": "Bali Bucket List Tours",
                "price": "€761",
                "img": "pic4.jpg",
                "type": "multi"
            },
            {
                "id" : uuidv4(),
                "name": "3 Day Southwest USA National Parks Tour from Las Vegas",
                "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
                "tourOperator": "BH Lanka Tours",
                "price": "€1200",
                "img": "pic5.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Bali Bucket List Original 10 Day Tour",
                "description": "Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak",
                "tourOperator": "LocalAdventures",
                "price": "€950",
                "img": "pic6.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "National Parks Tour 3 Days Small Group Tour from Las Vegas",
                "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
                "tourOperator": "Emerald Waterways",
                "price": "€1200",
                "img": "pic7.jpg",
                "type": "single"
            },
            {
                "id" : uuidv4(),
                "name": "Grand Tour Of Sri Lanka",
                "description": "Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy",
                "tourOperator": "LocalAdventures",
                "price": "€680",
                "img": "pic8.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Southern Treasures - 8 Days",
                "description": "Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno",
                "tourOperator": "Emerald Waterways",
                "price": "€1,279",
                "img": "pic9.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Japan One Life Adventures - 10 Days",
                "description": "Tokyo, Hakone, Takayama, Kyoto, Osaka",
                "tourOperator": "LocalAdventures",
                "price": "€1,192",
                "img": "pic1.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Mexico",
                "description": "From the south to the center of the country",
                "tourOperator": "LocalAdventures",
                "price": "€2,192",
                "img": "ocean.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Italia, Ocean Cruise",
                "description": "Discover Pearls of France & Italy",
                "tourOperator": "Emerald Waterways",
                "price": "€3,579",
                "img": "pic1.jpg",
                "type": "single"
            },
            {
                "id" : uuidv4(),
                "name": "Pharaohs Nile Cruise Adventure",
                "description": "Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
                "tourOperator": "LocalAdventures",
                "price": "€1,100",
                "img": "pic2.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Philippines One Life Adventures - 10 Days",
                "description": "Fantastic tour with a variety of activities and enough chill time. Excellent tour.",
                "tourOperator": "Emerald Waterways",
                "price": "€825",
                "img": "pic3.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Kilimanjaro climbing machame route 7 days",
                "description": "Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.",
                "tourOperator": "Bali Bucket List Tours",
                "price": "€761",
                "img": "pic4.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "3 Day Southwest USA National Parks Tour from Las Vegas",
                "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
                "tourOperator": "BH Lanka Tours",
                "price": "€1200",
                "img": "pic5.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Bali Bucket List Original 10 Day Tour",
                "description": "Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak",
                "tourOperator": "LocalAdventures",
                "price": "€950",
                "img": "pic6.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "National Parks Tour 3 Days Small Group Tour from Las Vegas",
                "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
                "tourOperator": "Emerald Waterways",
                "price": "€1200",
                "img": "pic7.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Grand Tour Of Sri Lanka",
                "description": "Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy",
                "tourOperator": "LocalAdventures",
                "price": "€680",
                "img": "pic8.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Southern Treasures - 8 Days",
                "description": "Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno",
                "tourOperator": "Emerald Waterways",
                "price": "€1,279",
                "img": "pic9.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Japan One Life Adventures - 10 Days",
                "description": "Tokyo, Hakone, Takayama, Kyoto, Osaka",
                "tourOperator": "LocalAdventures",
                "price": "€1,192",
                "img": "pic1.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Mexico",
                "description": "From the south to the center of the country",
                "tourOperator": "LocalAdventures",
                "price": "€2,192",
                "img": "ocean.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Italia, Ocean Cruise",
                "description": "Discover Pearls of France & Italy",
                "tourOperator": "Emerald Waterways",
                "price": "€3,579",
                "img": "pic1.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Pharaohs Nile Cruise Adventure",
                "description": "Start and end in Cairo! With the In-depth Cultural tour Pharaohs Nile Cruise Adventure - 5 Star, you have a 8 days tour package taking you through Cairo, Egypt and 8 other destinations in Egypt. Pharaohs Nile Cruise Adventure - 5 Star includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
                "tourOperator": "LocalAdventures",
                "price": "€1,100",
                "img": "pic2.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Philippines One Life Adventures - 10 Days",
                "description": "Fantastic tour with a variety of activities and enough chill time. Excellent tour.",
                "tourOperator": "Emerald Waterways",
                "price": "€825",
                "img": "pic3.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Kilimanjaro climbing machame route 7 days",
                "description": "Start in Machame Camp and end in Mweka Gate! With the Hiking & Trekking tour Kilimanjaro climbing machame route 7 days, you have a 7 days tour package taking you through Machame Camp, Tanzania and 5 other destinations in Tanzania. Kilimanjaro climbing machame route 7 days includes accommodation, an expert guide, meals, transport and more.",
                "tourOperator": "Bali Bucket List Tours",
                "price": "€761",
                "img": "pic4.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "3 Day Southwest USA National Parks Tour from Las Vegas",
                "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
                "tourOperator": "BH Lanka Tours",
                "price": "€1200",
                "img": "pic5.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Bali Bucket List Original 10 Day Tour",
                "description": "Canggu, Ubud, Gili Islands, Nusa Lembongan, Nusa Penida, Seminyak",
                "tourOperator": "LocalAdventures",
                "price": "€950",
                "img": "pic6.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "National Parks Tour 3 Days Small Group Tour from Las Vegas",
                "description": "Las Vegas, Zion National Park, Bryce Canyon National Park, Antelope Canyon",
                "tourOperator": "Emerald Waterways",
                "price": "€1200",
                "img": "pic7.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Grand Tour Of Sri Lanka",
                "description": "Negombo, Anuradhapura, Dambulla, Sigiriya, Polonnaruwa, Mahiyanganaya, Kandy",
                "tourOperator": "LocalAdventures",
                "price": "€680",
                "img": "pic8.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Southern Treasures - 8 Days",
                "description": "Cusco, Sacred Valley, Ollantaytambo, Aguas Calientes, Machu Picchu, Pisac, Puno",
                "tourOperator": "Emerald Waterways",
                "price": "€1,279",
                "img": "pic9.jpg"
            },
            {
                "id" : uuidv4(),
                "name": "Japan One Life Adventures - 10 Days",
                "description": "Tokyo, Hakone, Takayama, Kyoto, Osaka",
                "tourOperator": "LocalAdventures",
                "price": "€1,192",
                "img": "pic1.jpg"
            }
        ]
    }

}


export class TourDto implements ITour{
    @ApiProperty({ description: 'id', example: 'null' })
    id: string;
    @ApiProperty({ description: 'Tour name', example: 'test' })
    name: string;
    @ApiProperty({ description: 'Tour\'s description', example: 'test' })
    description: string;
    @ApiProperty({ description: 'Tour\'s operator', example: 'test' })
    tourOperator: string;
    @ApiProperty({ description: 'Tour\'s price', example: 1000 })
    price: string;
    @ApiProperty({ description: 'Url\'s image', example: '' })
    img?: string;
    @ApiProperty({ description: 'Tour\'s date start', example: new Date(2025, 4, 25)})
    date?: Date;
    @ApiProperty({ description: 'Tour\'s type', example: 'single' })
    type?: string;
}

export interface ITour{
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img?: string;
    date?: Date;
    type?: string;
}