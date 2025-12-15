import { Artist, EventInfo } from "../models/index.js";
import sequelize from "../../config/database.js";


const EVENT_DATA = {
    title: 'Gnawa World Festival Marrakech',
    date: new Date('2026-06-15'), 
    venue: 'Place Jemaa el-Fna',
    description: 'A three-day celebration of Gnawa music and culture.',
    banner_url: 'https://soviet-yellow-s5f8bnk5yw-yrg074adoo.edgeone.dev/Gemini_Generated_Image_3lbhpa3lbhpa3lbh.png',
    contact_email: 'info@gnawa-festival.ma',
  
};

const ARTIST_DATA = [
    {
        name: 'Mâalem Mahmoud Guinia',
        bio: 'One of the most influential Gnawa masters, known worldwide for preserving traditional Gnawa rhythms.',
        photo_url: 'https://ik.imagekit.io/9yn2suj2g/guinea%20mo.jpg',
        schedule: 'Friday, 8:00 PM',
    },
    {
        name: 'Mâalem Hamid El Kasri',
        bio: 'Internationally acclaimed Gnawa artist famous for his powerful voice and collaborations with jazz musicians.',
        photo_url: 'https://ik.imagekit.io/9yn2suj2g/Hamid-Kasri.jpg',
        schedule: 'Friday, 10:00 PM',
    },
    {
        name: 'Mâalem Mustapha Baqbou',
        bio: 'Legendary Gnawa master from Marrakech, blending deep spiritual chants with modern sounds.',
        photo_url: 'https://ik.imagekit.io/9yn2suj2g/91103440-64106336.jpg',
        schedule: 'Saturday, 7:30 PM',
    },
    {
        name: 'Mâalem Abdelkader Amlil',
        bio: 'Renowned Gnawa performer known for traditional costumes and authentic stage performances.',
        photo_url: 'https://ik.imagekit.io/9yn2suj2g/images.jpg',
        schedule: 'Saturday, 9:00 PM',
    },
    {
        name: 'Mâalem Mohamed Kouyou',
        bio: 'Young Gnawa master representing the new generation while respecting ancient traditions.',
        photo_url: 'https://ik.imagekit.io/9yn2suj2g/Maa%CC%82lem-Mohamed-Kouyou.jpg',
        schedule: 'Sunday, 6:30 PM',
    },
    {
        name: 'Mâalem Samira Kadiri',
        bio: 'One of the rare female voices in Gnawa-inspired performances, blending tradition and modern expression.',
        photo_url: 'https://ik.imagekit.io/9yn2suj2g/Samira-Kadiri.jpg',
        schedule: 'Sunday, 8:00 PM',
    },
];



export async function runSeeder() {
    try {
        
        const [event, eventCreated] = await EventInfo.findOrCreate({ where: { title: EVENT_DATA.title }, defaults: EVENT_DATA });
        if (eventCreated) {
            console.log("   [SEEDER] EventInfo table populated.");
        } else {
            console.log("   [SEEDER] EventInfo already present.");
        }

    
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