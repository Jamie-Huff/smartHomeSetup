
-- PRODUCTS DATA
INSERT INTO products
  (name, description, image, price, category_id, room_id, provider)
VALUES
/* note we need to update products descriptions on google docs to be more specific' */
/* ex: ('samsung tv', 'a fantastic tv', 200000, 18, 4, 'https://cdn.shopify.com/s/files/1/2660/5202/products/yjnyl93xi81czfiw1oiw_1400x.jpg?v=1607627979') */
  ('Google Nest Hub Max',	'Google Nest Hub Max with the Google Assistant helps your busy family stay in touch and on track. Leave video messages and make video calls. Check in on home when you’re away with the built-in Nest Cam. Share reminders and to-dos. Everyone views their own calendar, commute, and more with just a glance. And enjoy Google Photos, YouTube TV, videos, and music on the 10-inch HD screen with stereo speakers.',	'https://lh3.googleusercontent.com/uQZNPuGyf7dKvtGZWjoiyGcPg_A44yUS2tx-o2--dyuwp9A1vR4Efh1UF28KKLpGUg=w1200', 29900,	1,	1, 1),
  ('Amazon Echo Show 8', 	'Amazon Echo Show 5 Smart Display with Alexa - Sandstone, Set Alarms and Timers, Catch Up on the Current Events, Check Weather and Traffic',	'https://i5.walmartimages.com/asr/23b810fc-ceb6-4b6b-a38b-3e836db66cfa.a2d2e3ac9cd609ed6c5f80453178110c.jpeg',	12056, 1, 1, 1),
  ('Ring Floodlight Outdoor Security Camera', 'Protect your home with the world’s only motion-activated security camera with built-in floodlights, a siren alarm and two-way audio, so you can see, hear and speak to anyone on your property from anywhere. With object and facial detection, floodlight cam has the most advanced motion sensors in home security. Its 270° field-of-view will let you detect motion around corners and monitor all your blind spots.',	'https://i5.walmartimages.com/asr/2669f7f6-dc42-4177-bceb-617a1d7febc2_1.64673393373a6b265db0a791ccac2882.jpeg', 23450, 4, 6, 1),
  ('Ring Smart Lighting - spotlight',	 'Smart lighting spot light. Battery powered. Shine 400 lumens of brightness on important areas at home. Connect it to the ring bridge. To unlock smart controls & custom combinations in the ring app. Connects to ring doorbell & cameras. 1 ring bridge enabled device detects motion. It can turn on lights. Activate cameras & more. Use the ring bridge to link your ring smart lights to select alexa enabled devices to turn on lights & adjust settings at the sound of your voice.',	'https://m.media-amazon.com/images/I/51YCEyjQ0lL._SL1000_.jpg',	5499, 3, 6, 1),
  ('Ring Smart Lighting - steplight',	'Smart step light battery. For use with battery powered step light. Shines light on stairs. Decks & walkways when motion is detected. Connects to ring bridge. To enable smart controls in the ring app & sync with other ring smart lights. Ring doorbells. Cameras & select alexa enabled devices.',	'https://m.media-amazon.com/images/I/51ydPy0dMmL._SL1000_.jpg',	3499,	3,	6, 1),
  ('Ring Video Doorbell',	'View Cam with Echo Show 5 Sandstone',	'https://m.media-amazon.com/images/I/31GnlOQGwEL._AC_SY100_.jpg', 12999, 6,	6, 1),
  ('Lorex 1080 Wi-Fi Video Doorbell',	'Always know who''s coming to your door with Lorex''s 1080p Wi-Fi Video Doorbell. With full 1080p recording, IR night vision, and two-way talk capabilities, this doorbell will add both security and convenience to your home. Best of all, local microSD storage means that you keep your footage private while avoiding recurring monthly cloud storage fees.',	'https://m.media-amazon.com/images/I/516oyDp6ukL._AC_SL1200_.jpg', 17999, 4,	8, 1),
  ('Phillips hue starter pack',	'Add ambient colour to any room with the Philips Hue White and colour ambiance starter kit. Connect to the included Hue Bridge to take advantage of endless list of features. Control via the App or voice.',	'https://i5.walmartimages.com/asr/6b96fe6e-7831-4c07-8a68-b442c79b6e64.b54167e1675beb6f210fa55619af2b80.jpeg', 24999,	2, 1, 1),
  ('TP-Link Tapo Smart Cam',	'Detects motion and sends you alerts right away Home burglary is the very thing we want to prevent. Set a camera towards the entrance of your home, garage, or basement to ensure the safety of your family and property. Receive a notification when the camera detects motion at home. It can be a notice of arriving package, or suspicious intrusion.', 	'https://m.media-amazon.com/images/I/51PeFXEseLL._AC_SL1000_.jpg',	4999,	5,	1, 1),
  ('Ring video Doorbell Pro', 'NEED DESC', 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/152/15255/15255563.jpg', 20000, 6, 8, 1),
  ('Ultralink USHWVDB doorbell',	'Ultralink USHWVDB SMART HOME WIFI VIDEO DOORBELL. See, hear and speak to visitors at your door. View in real-time from anywhere on your smartphone. View HD 720p video resolution.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/148/14897/14897407.jpg',	19999, 6,	8, 1),
  ('500 Robotic Vacuum - NEED MORE NAME',	'ECOVACS DEEBOT 500 Robotic Vacuum Cleaner with Max Power Suction, Up to 110 min Runtime, Hard Floors & Carpets, App Controls, Self-Charging, Quiet',	'https://m.media-amazon.com/images/I/71h2UbdETKL._AC_SL1353_.jpg',	30391,	7,	1, 1),
  ('Kyvol Cybovac E30 Robot Vacuum Cleaner',	'Cybovac E30 cleans based on the smart gyroptic navigation system, which allows it to creat a map as it works thus increases its cleaning efficiency. 2200Pa Strong Suction & Ultra-thin: Cybovac E30''s 2200Pa suction enables it to lift dust and hair effortlessly and its 2.85'''' slim body allows it to clean hard-to-reach areas very easily.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/156/15653/15653690.jpg',	18999,	7,	1, 1),
  ('Bagotte BG800 Robot Vacuum Cleaner',	'Cybovac E30 cleans based on the smart gyroptic navigation system, which allows it to creat a map as it works thus increases its cleaning efficiency. 2200Pa Strong Suction & Ultra-thin: Cybovac E30''s 2200Pa suction enables it to lift dust and hair effortlessly and its 2.85'''' slim body allows it to clean hard-to-reach areas very easily.',	'https://m.media-amazon.com/images/I/81E79yDYiOS._AC_SL1500_.jpg',	29999,	7,	1, 1),
  ('Samsung Family Hub 36" 22.8 Cu. Ft. French Door Refrigerator',	'Enjoy the convenience and efficiency of this 36" Samsung Family Hub French-door refrigerator. It connects to your home Wi-Fi network, giving you instant access to a full range of features like memo boards, calendars, entertainment, and smart recipes. It''s equipped with internal cameras so you can check and see if you need to restock an item, even while you''re at the supermarket.',	'https://images.samsung.com/is/image/samsung/p6pim/ca/rf23a9771sr-ac/gallery/ca-family-hub-60-382004-rf23a9771sr-ac-412977142?$720_576_PNG$',	219900,	8,	3, 1),
  ('Café 24" 39dB Built-In Dishwasher',	'Keep your dishes free of oil, and grease for a spotless kitchen with the Café built-in dishwasher. Built with Wi-Fi technology, this intelligent dishwasher can be operated via smartphone from any part of your house. The piranha hard food disposer helps crush down the food particles to prevent clogged spray arms.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/142/14292/14292283.jpg',	239999,	10,	3, 1),
  ('LG 5.8 Cu. Ft. High Efficiency Front Load Steam Washer',	'Give your clothes a deep clean every time with the LG 5.8 cu. ft. front load washer. Featuring a highly-efficient steam technology, this appliance makes sure your fabrics come out sterling clean and odour-free. Its innovative TurboWash technology helps washing your clothes quickly with fast cycles that save up to 30 minutes per load.SmartThinQ app lets you control and manage the appliance directly from your smartphone.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/147/14740/14740750.jpg',	134999,	11,	9, 1),
  ('Samsung 5.2 Cu.Ft High Efficiency Front Load Steam Washer',	'Power through laundry day quickly and efficiently with the Samsung 5.2 cu. ft. high efficiency front load washing machine. This sleek machine is spacious enough to tackle large, family-size loads and even bulky comforters. It comes equipped with 10 wash cycles and a steam option so even the dirtiest clothes come out clean and fresh.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/104/10407/10407053.jpg',	109999,	11,	9, 1),
  ('Samsung 7.5 Cu. Ft. Electric Dryer',	'Enjoy fresh, sanitized, and odour-free laundry everytime with the Samsung 7.5 cu. ft. electric steam dryer. This spacious dryer accommodates large loads so you can get through laundry day in a flash. It''s equipped with Smart Care for convenience and Multi-Steam Technology to eliminate wrinkles, smells, and static.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/144/14400/14400708.jpg',	84999,	12,	9, 1),
  ('LG 7.4 Cu. Ft. Electric Dryer',	'Fully utilize even the smallest laundry areas with the LG 7.4 cu. ft. electric dryer. This stackable unit is designed to stack on top of a matching washer for vertical space-saving installation. This smart and efficient dryer features 14 drying cycles to suit every load and the latest technology for managing its operations right from your smartphone.SmartThinQ Technology lets you control your dryer right from your smartphone and is compatible with Google Assistant and Amazon Alexa for voice-activated commands.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/135/13529/13529630.jpg',	99997,	12,	9, 1),
  ('Google Nest Wi-Fi Smart Learning Thermostat 3rd Generation',	'Turn yours into a smart home with the Google Nest Learning Thermostat. It remembers what temperatures you like, learns your schedule, and programs itself to save energy. Its sharp 2.08" LCD display with Farsight lights up when you approach. WiFi connected, you can control it with your mobile device, and use it with numerous compatible smart home products.',	'https://i5.walmartimages.ca/images/Enlarge/424/239/6000203424239.jpg',	29999,	13,	1, 1),
  ('Ecobee SmartThermostat',	'Experience enhanced comfort, increased savings, and advanced control. SmartThermostat with voice control is the award-winning thermostat that learns and adapts to your routine. Included SmartSensor keeps you comfortable where you are through occupancy detection.',	'https://m.media-amazon.com/images/I/71c4i4rnK8L._AC_SL1500_.jpg',	32999,	13,	1, 2),
  ('Smarter SMCOF01-US 12',	'Control: Brew your Smarter Coffee remotely from anywhere using the Smarter app available for any iOS or Android device. Wake up mode: Set alarms via app to wake you up to a freshly brewed coffee. Home mode: Smarter Coffee will have a brew ready when you walk through the front door.',	'https://m.media-amazon.com/images/I/71szDWvVUhL._AC_SL1500_.jpg',	34941,	14,	3, 1),
  ('Smart 12 Cup Coffee Maker - Black and Stainless Steel', 'Smart 12 cup coffee maker works with Alexa, giving you the ability to ask your Alexa app or Alexa smart speaker to start brewing, change brew strength or turn off the coffee maker.', 'https://m.media-amazon.com/images/I/61FBNvTiG1L._AC_SL1001_.jpg', 13333, 14, 3, 1),
  ('Hornbill Smart Door Lock',	'Keyless Entry Door Lock: Lock and unlock with Smartphone, Keypad, and Mechanical Key. Control keyless access and keep track of who comes and goes, all from your phone. You’ll have comfort in knowing your door’s status.',	'https://m.media-amazon.com/images/I/61doB9T50iL._AC_SL1500_.jpg',	17999,	15,	8, 1),
  ('Lockly Secure Pro Fingerprint Wi-Fi Deadbolt Smart Lock',	'Keep your spaces safe and secure with the Lockly Secure Pro Wi-Fi deadbolt smart lock. Equipped with a fingerprint scanner, it stores up to 99 fingerprints so the whole family can enjoy secure keyless entry to your home. It features Wi-Fi connectivity along with a companion app so you can remotely lock and unlock the door.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/139/13985/13985431.jpg',	37999,	15,	8, 1),
  ('Echo Dot (4th Gen)',	'Round out any room with the Amazon Echo Dot (4th Gen). This smart speaker delivers clear, crisp vocals and balanced bass, while its sleek, compact design fits perfectly into small spaces. With built-in Amazon Alexa, use your voice commands to ask Alexa to play music, answer questions, give you the news and weather, and much more.',	'https://m.media-amazon.com/images/I/71SbBmY-swL._AC_SL1000_.jpg',	6000,	16,	1, 1),
  ('Sonos One (2nd Gen) - Voice Controlled Smart Speaker', 	'This second generation of Sonos One boasts increased memory and an updated processor. It also blends great sound with seemless voice assistance. Simply ask for a song from services like Spotify, Amazon Music, iHeartRadio, and TuneIn. Then, you can enjoy the rich, room-filling audio while you lounge and relax. Pair with other Sonos speakers for whole-home enjoyment.',	'https://i5.walmartimages.com/asr/f6c2ee65-8f83-43cc-a77c-625750a046d6.69e82375666439451f64718f5e439d2d.jpeg',	24999,	16,	1, 3),
  ('Philips 43” 4K UHD HDR LED Android Smart TV',	'4K AndroidTV with Google Assistant. Explore a smarter way to watch,the Philips AndroidTV brings great content to you, so you can spend less time browsing and more time watching. Just pick from the personalized recommendations from Google. Play, YouTube, Netflix, and other apps directly on your TV screen.',	'https://i5.walmartimages.ca/images/Enlarge/825/578/6000199825578.jpg',	44899,	17,	4, 1),
  ('Samsung 55" 4K',	'Bring your entertainment to life with this 55" Samsung 4K UHD QLED smart TV. Powered by the Tizen operating system, it provides seamless access to all your favourite smart features. It''s equipped with Quantum Dot technology and HDR10+ dynamic tone mapping so every image comes through in lifelike clarity while Q-Symphony and OTS Lite delivers incredibly sound quality. Bluetooth 4.2, Wi-Fi, and wired technologies make it easy to connect with your home''s network.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/153/15370/15370632.jpg',	109999,	17,	4, 1),
  ('LG 55" 4K UHD HDR OLED webOS Smart TV',	'Bring the cinematic experience right to your home with the LG 55" HDR smart TV. Boasting a self-lit OLED display, it presents your movies and other content in Ultra HD 4K resolution with realistic colours and precise image details. Additionally, it features webOS operating system that is intuitive, and gives you access to an array of entertainment apps to stream movies, shows, and more.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/154/15442/15442033.jpg',	219999,	17,	4, 1),
  ('Refoss Smart Wi-Fi Garage Door Opener',	 'APP Control, Compatible with Alexa, Google Assistant, WhiteREMOTELY CONTROL: Open, close, check door status, receive just within your eHomeLife iOS/android App. Works with Google Assistant, Alexa.',	'https://m.media-amazon.com/images/I/61maLh52isL._AC_SL1500_.jpg',	4999,	18,	7, 1),
  ('NEXX Garage NXG-200 Garage Opener with App',	'CONVENIENTLY OPEN AND CLOSE your garage door by turning your existing Wi-Fi network and garage door opener into a single integrated smart device that you can control and monitor from anywhere.', 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/151/15176/15176612.jpg',	10270,	18,	7, 1),
  ('Samsung 30" 6.3 Cu. Ft. Fan Convection Electric Air Fry Range (NE63A6511SS) - Stainless',	'Transform the look and functionality of your kitchen with this 30"" Samsung electric range. It''s well-equipped with fan convection and a built-in air fryer so you can create healthy and mouth-watering dishes your family will love. Its flexible cooktop accommodates all of your pots and pans so you can cook quickly and efficiently.', 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/151/15176/15176612.jpg',	99999,	9,	3, 1),
  ('Samsung 30" 6.3 Cu. Ft. True Convection Slide-In Electric Air Fry Range (NE63T8711SG) - Black Stainless', 'Cook all of your family''s favourite foods with ease on this 6.3 cu. ft. electric range from Samsung. It features a smooth cooktop with 5 elements and a True Convection oven that ensures even cooking results. It''s even equipped with air-frying capabilities so you can serve up the crispiest fried chicken, French fries, wings, and more without excess fat.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/151/15176/15176612.jpg',	209999,	9,	3, 1),
  ('Apple HomePod mini - Space Grey',	'Jam-packed with innovation, the Apple HomePod mini fills the entire room with rich 360-degree audio. Place multiple speakers around the house for a connected sound system. Siri, your favourite do-it-all intelligent assistant, helps with everyday tasks and controls your smart home privately and securely.',	'https://multimedia.bbycastatic.ca/multimedia/products/500x500/151/15176/15176612.jpg',	12900,	1,	1, 2),
  ('Great Value Wiz Full Colour A19 WiFi bulb', 'The dimmable color-changing LED A-type bulb brings the ultimate light experience to your home, office, shop or hospitality business. Retrofit into any lamp shade to create the ambience of your choice. Pair the light to the WiZ app using 2.4 GHz Wi-Fi network, set schedules for 16 million colors and adjust it from warm white to daylight from anywhere to save energy costs.', 'https://i5.walmartimages.ca/images/Enlarge/820/584/6000201820584.jpg', 1499, 2, 1, 1),
  ('Nanoleaf Essentials A19 Smart LED Light Bulb', 'Meet your home lighting needs precisely anytime with this Nanoleaf Essentials A19 smart LED light bulb. Featuring bright tunable whites and over 16M colours, this smart LED light bulb can meet your lighting needs for various situations, from work to relaxing time. The Circadian Lighting automatically adjusts colour temperature of the lights to sync to your bodys needs for maximized productivity.', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/HPE62?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1604711887000', 2499, 2, 1, 2),
  ('Yale Assure Lock SL - Key Free Smart Lock with Touchscreen Keypad', 'Upgrade your door with the Assure Lock SL, a touchscreen deadbolt for key-free entry. The lock is HomeKit-enabled so it allows you to lock or unlock and share access, all from your Yale Secure app. Assure Lock also features optional Auto Relock, so it will even lock itself once the door is closed. Plus, you can lock or check current status just by asking Siri.', 'https://m.media-amazon.com/images/I/51K9e0ObXOL._AC_SL1000_.jpg', 27245, 15, 8, 2),
  ('ismartgate 02WNA102 Wi-Fi Standard PRO Garage Door Opener', 'Kit for garage door. Includes Wi-Fi controller and waterproof wireless tilt sensor. ismartgate PRO will remotely open, close and control your garage door through HomeKit, Google Home, Samsung SmartThings and iFTTT or with native iOS/Android App. Includes key features such as video, user management, audio player, 3 doors control, compatibility with wireless and wired sensors.', 'https://m.media-amazon.com/images/I/51ZSwkhCcAL._AC_SL1200_.jpg', 20436, 18, 7, 3);
