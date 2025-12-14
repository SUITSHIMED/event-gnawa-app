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
        name: 'Mâalem Mahmoud Guinia',
        bio: 'One of the most influential Gnawa masters, known worldwide for preserving traditional Gnawa rhythms.',
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Mahmoud_Guinia.jpg',
        schedule: 'Friday, 8:00 PM',
    },
    {
        name: 'Mâalem Hamid El Kasri',
        bio: 'Internationally acclaimed Gnawa artist famous for his powerful voice and collaborations with jazz musicians.',
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Hamid_El_Kasri.jpg',
        schedule: 'Friday, 10:00 PM',
    },
    {
        name: 'Mâalem Mustapha Baqbou',
        bio: 'Legendary Gnawa master from Marrakech, blending deep spiritual chants with modern sounds.',
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mustapha_Baqbou.jpg',
        schedule: 'Saturday, 7:30 PM',
    },
    {
        name: 'Mâalem Abdelkader Amlil',
        bio: 'Renowned Gnawa performer known for traditional costumes and authentic stage performances.',
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Gnawa_Musician.jpg',
        schedule: 'Saturday, 9:00 PM',
    },
    {
        name: 'Mâalem Mohamed Kouyou',
        bio: 'Young Gnawa master representing the new generation while respecting ancient traditions.',
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gnawa_Festival_Essaouira.jpg',
        schedule: 'Sunday, 6:30 PM',
    },
    {
        name: 'Mâalem Samira Kadiri',
        bio: 'One of the rare female voices in Gnawa-inspired performances, blending tradition and modern expression.',
        photo_url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Moroccan_Female_Singer.jpg',
        schedule: 'Sunday, 8:00 PM',
    },
];



export async function runSeeder() {
    try {
        // Ensure event exists (create if missing)
        const [event, eventCreated] = await EventInfo.findOrCreate({ where: { title: EVENT_DATA.title }, defaults: EVENT_DATA });
        if (eventCreated) {
            console.log("   [SEEDER] EventInfo table populated.");
        } else {
            console.log("   [SEEDER] EventInfo already present.");
        }

        // Ensure each artist exists (create missing ones)
        let createdCount = 0;
        for (const a of ARTIST_DATA) {
            const [artist, created] = await Artist.findOrCreate({ where: { name: a.name }, defaults: a });
            if (created) createdCount++;
        }
        if (createdCount > 0) {
            console.log(`   [SEEDER] ${createdCount} artist(s) added.`);
        } else {
            console.log("   [SEEDER] No new artists to add.");
        }
    } catch (error) {
        console.error("   [SEEDER] ERROR during custom seeding:", error.message);
    }
}