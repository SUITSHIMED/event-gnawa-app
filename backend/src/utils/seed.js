
import { Artist, EventInfo } from "../models/index.js";
import sequelize from "../../config/database.js";


const EVENT_DATA = {
    title: 'Gnawa World Festival Marrakech',
    date: new Date('2026-06-15'), 
    venue: 'Place Jemaa el-Fna',
    description: 'A three-day celebration of Gnawa music and culture.',
    banner_url: 'https://placehold.co/800x400',
    contact_email: 'info@gnawa-festival.ma',
  
};

const ARTIST_DATA = [
    {
        id: 'artist-1', 
        name: 'Mâalem Mahmoud Guinia',
        bio: 'Legendary Mâalem known for his dynamic performances.',
        photo_url: 'https://placehold.co/150x150',
        schedule: 'Friday, 8:00 PM',
    },
    {
        id: 'artist-2',
        name: 'Mâalem Samira Kadiri',
        bio: 'One of the few prominent female Mâalems.',
        photo_url: 'https://placehold.co/150x150',
        schedule: 'Saturday, 9:30 PM',
    },
];


export async function runSeeder() {
    try {
       
        const eventCount = await EventInfo.count();
        if (eventCount === 0) {
            await EventInfo.create(EVENT_DATA);
            console.log("   [SEEDER] EventInfo table populated.");
        } else {
            console.log("   [SEEDER] EventInfo already populated.");
        }

    
        const artistCount = await Artist.count();
        if (artistCount === 0) {
            await Artist.bulkCreate(ARTIST_DATA);
            console.log("   [SEEDER] Artists table populated.");
        } else {
            console.log("   [SEEDER] Artists already populated.");
        }
    } catch (error) {
        console.error("   [SEEDER] ERROR during custom seeding:", error.message);
    }
}