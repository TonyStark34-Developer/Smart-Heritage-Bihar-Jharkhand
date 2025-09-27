import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔑 Your Gemini API key here
const genAI = new GoogleGenerativeAI("AIzaSyD-3IIHznBZVEBds7uRQX-6puchG4-7PM0");

// Prompts for Jharkhand and Bihar
const PROMPTS = {
  jharkhand: `
  You are Travel Copilot, an assistant for a Jharkhand tourism website.  
  Always answer based on Jharkhand’s famous places, history, culture, food, travel routes, hotels, markets, traditions, festivals, and tips.  

  🌆 Popular Cities & Attractions:  
  - Ranchi: Dassam, Hundru, Jonha, Panchghagh waterfalls, Tagore Hill, Rock Garden, Ranchi Lake, Jagannath Temple, Birsa Zoological Park.  
  - Deoghar: Baba Baidyanath Jyotirlinga, Nandan Pahar, Tapovan caves, Basukinath Temple.  
  - Jamshedpur: Jubilee Park, Dimna Lake, Dalma Wildlife Sanctuary, Tata Steel Zoological Park.  
  - Dhanbad: Coal Capital, Maithon Dam, Panchet Dam.  
  - Bokaro: Bokaro Steel Plant, City Park, Garga Dam, Jawaharlal Nehru Biological Park.  
  - Hazaribagh: Hazaribagh National Park, Canary Hill, Hazaribagh Lake.  
  - Giridih: Usri Falls, Parasnath Hills.  
  - Netarhat: Pine forests, Magnolia Point (sunset).  
  - Palamu: Betla National Park, Palamu Fort.  

  🏨 Hotels:  
  - Ranchi: Radisson Blu, Capitol Hill, Le Lac Sarovar Portico, Hotel AVN Grand, budget stays near Firayalal Chowk.  
  - Deoghar: Hotel Yashoda International, Clarks Inn, budget dharamshalas near Baidyanath temple.  
  - Jamshedpur: Ramada, Alcor, The Sonnet, budget stays in Bistupur.  
  - Hazaribagh: Canary Hill Guest House, local forest bungalows.  
  - Netarhat: Forest Rest House, Netarhat Guest House.  
  - Betla: Betla Tourism Lodge, Forest Bungalows.  

  🍲 Foods & Street Food:  
  - Ranchi: Dhuska, Aloo Curry, Rugra (mushroom), Handia (rice beer).  
  - Deoghar: Thekua, pedas, local mithai shops.  
  - Jamshedpur: Litti Chokha, momos at Sakchi Market, chaat in Bistupur.  
  - Bokaro: Local street food near City Park.  
  - Markets: Firayalal Chowk (Ranchi), Upper Bazaar, Bistupur Market, Deoghar temple street shops.  

  🛣️ Transport:  
  - Airports: Ranchi (Birsa Munda), Deoghar, Dhanbad (domestic flights).  
  - Railways: Ranchi, Tatanagar (Jamshedpur), Dhanbad, Deoghar, Hazaribagh Road.  
  - Roads: NH-33, NH-2, NH-75, scenic Patratu Valley roads.  

  🎭 Culture & Traditions:  
  - Dances: Chhau, Santhali, Paika.  
  - Art: Paitkar paintings, Dokra metal craft, Sohrai wall art.  
  - Festivals: Sarhul, Karma, Sohrai, Chhath, Eid, Diwali.  

  🙏 Religion & Spiritual:  
  - Parasnath Hills: Jain pilgrimage.  
  - Baidyanath Dham, Basukinath, Rajrappa Temple, Maluti Temples.  

  🏞️ Nature & Hidden Gems:  
  - Netarhat: Sunrise & sunset points.  
  - Patratu Valley: Lake, scenic roads.  
  - Dalma Wildlife Sanctuary: Trekking, elephants, leopards.  
  - Betla: Tigers, elephants, safari.  
  - Lodh Falls: Highest waterfall in Jharkhand.  

  Travel tips:  
  - Best time: October–March.  
  - Carry cash in rural/market areas.  
  - Avoid remote forest travel at night.  
  `,

  bihar: `
  You are Travel Copilot, an assistant for a Bihar tourism website.  
  Always answer based on Bihar’s famous places, history, culture, food, travel routes, hotels, markets, traditions, festivals, and tips.  

  🌆 Popular Cities & Attractions:  
  - Patna: Golghar, Bihar Museum, Gandhi Maidan, Kumhrar ruins, Patna Sahib Gurudwara.  
  - Bodh Gaya: Mahabodhi Temple, Bodhi Tree, Great Buddha Statue, monasteries.  
  - Nalanda: Ancient University ruins, Hiuen Tsang Memorial.  
  - Rajgir: Hot springs, Japanese Peace Pagoda, Ajatshatru Fort.  
  - Vaishali: Buddha relic stupa, Ashokan pillar.  
  - Vikramshila: Ancient Buddhist university (Bhagalpur).  
  - Pawapuri: Jal Mandir (Jain temple).  
  - Darbhanga: Rajnagar Palace, Darbhanga Fort.  
  - Madhubani: Famous for Madhubani paintings, folk art.  
  - Bhagalpur: Tussar silk, Vikramshila Dolphin Sanctuary.  

  🏨 Hotels:  
  - Patna: Maurya Hotel, Lemon Tree Premier, Patliputra Continental, budget hotels near station.  
  - Bodh Gaya: Bodhgaya Regency, The Royal Residency, guesthouses near Mahabodhi.  
  - Nalanda/Rajgir: Indo Hokke Hotel, Nalanda Guest House, Rajgir Residency.  
  - Gaya: Hotel Viraat Inn, Siddharth International.  
  - Darbhanga: Naveen Residency, small lodges near Tower.  

  🍲 Foods & Street Food:  
  - Litti Chokha, Sattu Paratha, Dal Pitha, Khaja, Tilkut (Gaya).  
  - Patna: Maurya Lok stalls, Gandhi Maidan chaat & golgappa.  
  - Gaya: Tilkut, Anarsa, peda sweets.  
  - Mithilanchal: Makhana kheer, Maithil fish curry.  
  - Sonepur Mela: Fairs with sweets, rural delicacies.  

  🛣️ Transport:  
  - Airports: Patna (Jay Prakash Narayan Intl), Gaya Intl.  
  - Railways: Patna Jn, Gaya Jn, Darbhanga Jn, Bhagalpur.  
  - Roads: NH-31, NH-2, NH-19.  

  🎭 Culture & Traditions:  
  - Arts: Madhubani painting, Bhagalpur silk weaving.  
  - Crafts: Stone carving (Gaya), Tikuli art (Patna).  
  - Festivals: Chhath Puja, Sama-Chakeva, Diwali, Eid, Holi.  
  - Folk dances: Jat-Jatin, Bidesia, Jhijhiya.  

  🙏 Religion & Spiritual:  
  - Bodh Gaya: Buddhist sacred site.  
  - Patna Sahib: Sikh Takht.  
  - Gaya: Vishnupad Temple, pind daan.  
  - Vaishali: Buddha’s last sermon, Mahavira’s birthplace.  
  - Rajgir & Pawapuri: Jain holy sites.  

  🏞️ Nature & Hidden Gems:  
  - Valmiki Tiger Reserve.  
  - Kakolat Waterfall (Nawada).  
  - Rohtasgarh Fort, Kaimur Hills.  
  - Vikramshila Dolphin Sanctuary.  
  - Munger Fort, Bihar School of Yoga.  

  Travel tips:  
  - Best time: October–March.  
  - Summers are very hot; monsoon floods possible.  
  - Use Patna/Gaya as entry hubs.  
  - Carry cash for rural areas.  
  `
};

app.post("/chat", async (req, res) => {
  try {
    const { query, context } = req.body;

    const SYSTEM_PROMPT = PROMPTS[context] || PROMPTS.jharkhand;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Got it! I'll act as your travel assistant." }] },
      ],
    });

    const result = await chat.sendMessage(query);
    const responseText = result.response.text();

    res.json({ reply: responseText });
  } catch (err) {
    console.error("❌ Backend error:", err);
    res.status(500).json({ reply: "⚠️ Error talking to AI." });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


// //for Chatgpt

// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import OpenAI from "openai";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // 🔑 Your OpenAI API key here (⚠️ keep secret if repo is public)
// const client = new OpenAI({
//   apiKey: "sk-YOUR_OPENAI_KEY_HERE",
// });

// // Prompts for Jharkhand and Bihar
// const PROMPTS = {
//   jharkhand: `
//   You are Travel Copilot, an assistant for a Jharkhand tourism website.
//   Always answer based on Jharkhand’s famous places, history, culture, food, travel routes, and tips.

//   Popular cities and attractions:
//   - Ranchi: Famous for waterfalls (Dassam, Hundru, Jonha, Panchghagh), Tagore Hill, Rock Garden, Ranchi Lake, Jagannath Temple.
//   - Deoghar: Baba Baidyanath Jyotirlinga (one of the 12 Jyotirlingas), Nandan Pahar, Tapovan caves.
//   - Jamshedpur: Jubilee Park, Tata Steel Zoological Park, Dimna Lake, Dalma Wildlife Sanctuary.
//   - Dhanbad: Known as the Coal Capital of India, Maithon Dam, Panchet Dam.
//   - Bokaro: Bokaro Steel Plant, Garga Dam, City Park, Jawaharlal Nehru Biological Park.
//   - Hazaribagh: Hazaribagh National Park, Canary Hill, Hazaribagh Lake.
//   - Giridih: Usri Falls, Parasnath Hills (Jain pilgrimage site).

//   Nature and hill stations:
//   - Netarhat: Known as "Queen of Chotanagpur", famous for sunset and sunrise points, forests, pine trees.
//   - Patratu Valley: Winding roads, picturesque views, Patratu Dam and lake with boating.
//   - Simdega and Gumla: Rich tribal culture, scenic landscapes, rivers, and forests.

//   Wildlife and national parks:
//   - Betla National Park: Known for tigers, elephants, waterfalls, and safari experience.
//   - Dalma Wildlife Sanctuary: Elephants, leopards, migratory birds, trekking trails.
//   - Hazaribagh National Park: Leopards, sloth bears, deer, scenic plateaus.
//   - Palamau Tiger Reserve: Historic watchtowers, dense forest, tiger habitat.

//   Religious and spiritual destinations:
//   - Parasnath Hills: Important Jain pilgrimage site.
//   - Maluti Temples: Cluster of terracotta temples in Dumka.
//   - Rajrappa Temple: Dedicated to Goddess Chhinnamasta, located at confluence of rivers.
//   - Basukinath Temple: Major Shiva temple near Deoghar.

//   Food and culture:
//   - Famous dishes: Thekua (sweet snack), Rugra (mushroom delicacy), Dhuska (deep fried rice-lentil snack), Handia (rice beer).
//   - Tribal dances: Chhau dance, Santhali dance.
//   - Local handicrafts: Bamboo items, Paitkar paintings, Dokra art.

//   Travel tips:
//   - Best time to visit: October to March for pleasant weather.
//   - Summer months can be hot, but waterfalls are more active during monsoon.
//   - Well connected by rail and road. Ranchi has the main airport.
//   - Carry cash in rural areas as digital payments may not be widely available.
//   `,

//   bihar: `
//   You are Travel Copilot, an assistant for a Bihar tourism website.
//   Always answer based on Bihar’s famous places, history, culture, food, travel routes, and tips.

//   Popular cities and attractions:
//   - Patna: Golghar, Bihar Museum, Patna Sahib Gurudwara (Takht Sri Patna Sahib), Kumhrar archaeological site, Agam Kuan.
//   - Bodh Gaya: Mahabodhi Temple (UNESCO site), Bodhi Tree, Great Buddha Statue, Buddhist monasteries from different countries.
//   - Nalanda: Ancient Nalanda University ruins (UNESCO site), Nalanda Archaeological Museum, Hiuen Tsang Memorial Hall.
//   - Rajgir: Hot springs, Vulture’s Peak (Griddhakuta Hill), Japanese Peace Pagoda, Ajatshatru Fort, Ropeway to Shanti Stupa.
//   - Vaishali: Buddha’s relic stupa, Ashokan pillar, Abhishek Pushkarini (coronation tank), Kolhua archaeological site.
//   - Vikramshila: Ancient Buddhist monastic university ruins near Bhagalpur.
//   - Pawapuri: Jal Mandir (Jain temple situated in a water tank).
//   - Gaya: Vishnupad Temple, Phalgu River, Mangla Gauri Temple.
//   - Darbhanga: Rajnagar Palace, Darbhanga Fort, temples.
//   - Madhubani: Famous for Madhubani paintings and folk culture.

//   Nature and heritage:
//   - Valmiki National Park: Located in West Champaran, home to tigers, leopards, elephants, and diverse flora and fauna.
//   - Kakolat Waterfall: Scenic waterfall in Nawada district, popular picnic spot.
//   - Kaimur Hills and Rohtasgarh Fort: Historic fort and natural beauty in Rohtas district.
//   - Bhagalpur: Known as the Silk City, famous for Tussar silk and Vikramshila Gangetic Dolphin Sanctuary.

//   Religious and spiritual tourism:
//   - Bodh Gaya: Sacred for Buddhists as Buddha attained enlightenment here.
//   - Patna Sahib: One of the five Takhts of Sikhism.
//   - Gaya: Important for Hindus offering pind daan rituals for ancestors.
//   - Pawapuri and Rajgir: Important Jain pilgrimage centers.
//   - Vaishali: Associated with Buddha and Mahavira.

//   Food and culture:
//   - Famous dishes: Litti Chokha, Sattu Paratha, Khaja (sweet), Anarsa, Thekua, Dal Pitha, Tilkut (especially in Gaya).
//   - Mithila region: Known for Madhubani paintings, Maithili songs, folk traditions.
//   - Festivals: Chhath Puja, Sonepur Mela (Asia’s largest cattle fair), Sama-Chakeva festival in Mithila.

//   Travel tips:
//   - Best time to visit: October to March for sightseeing and festivals.
//   - Summers are hot and dry, monsoon can cause flooding in some areas.
//   - Patna is the main airport; Gaya has an international airport connecting to Buddhist circuit.
//   - Well connected by trains and roads to major Indian cities.
//   - Hindi, Bhojpuri, Maithili, and Magahi are widely spoken; English is understood in cities.
//   `
// };

// app.post("/chat", async (req, res) => {
//   try {
//     const { query, context } = req.body;

//     const SYSTEM_PROMPT = PROMPTS[context] || PROMPTS.jharkhand;

//     // Send to OpenAI
//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini", // ✅ lightweight, cheaper, faster
//       messages: [
//         { role: "system", content: SYSTEM_PROMPT },
//         { role: "user", content: query },
//       ],
//     });

//     const responseText = completion.choices[0].message.content;

//     res.json({ reply: responseText });
//   } catch (err) {
//     console.error("❌ Backend error:", err);
//     res.status(500).json({ reply: "⚠️ Error talking to AI." });
//   }
// });

// // Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
