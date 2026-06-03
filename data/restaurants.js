export const restaurants = [
  {
    id: '1',
    name: 'Pijalnia Wódki i Piwa',
    cuisine: ['Bar', 'Przekąski', 'Polska'],
    rating: 4.1,
    reviewsCount: 3460,
    address: 'Rynek 13, Wrocław',
    hasLunch: false, 
    image: 'https://images.unsplash.com/photo-1615332579037-3c44b3660b53?auto=format&fit=crop&q=100&w=7680', 
    description: 'Klasyk. Tanio, głośno i w samym sercu Rynku. Idealne na before przed imprezą.',
    coordinates: { latitude: 51.11054, longitude: 17.03225 },
    googleMapsUrl: 'https://www.google.com/maps/place/Pijalnia+W%C3%B3dki+i+Piwa/@51.1104098,17.0142553,15z/data=!4m12!1m2!2m1!1sPijalnia+W%C3%B3dki+i+Piwa+Opinie!3m8!1s0x470fc275a2c18d3b:0x257301f8d9352d32!8m2!3d51.1104098!4d17.0322797!9m1!1b1!15sCh1QaWphbG5pYSBXw7Nka2kgaSBQaXdhIE9waW5pZSIFOAGIAQFaHyIdcGlqYWxuaWEgd8OzZGtpIGkgcGl3YSBvcGluaWWSAQNiYXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUXpjR055UVc1M1JSQULgAQD6AQQIABA5!16s%2Fg%2F1pp2x5jgv?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/pijalnia_wroclaw_rynek/',
    menu: [
      { name: 'Śledzik w oleju', price: 12 },
      { name: 'Zimne nóżki', price: 12 },
      { name: 'Gzik', price: 12 },
      { name: 'Piwo (0.3l)', price: 9 }
    ]
  },

  {
    id: '2',
    name: 'Iggy Pizza',
    cuisine: ['Włoska', 'Pizza'],
    rating: 4.6,
    reviewsCount: 7600,
    address: 'Kuźnicza 10, Wrocław',
    hasLunch: true, 
    image: 'https://i.redd.it/iggy-pizza-wroclaw-amazing-v0-i45fg5o6j0g81.jpg?width=3000&format=pjpg&auto=webp&s=bca1345af42e8c1686376268c4620537761a6c9a',
    videoUrl: "https://res.cloudinary.com/dohgy8bpa/video/upload/v1780483612/149678-796691098_apl18r.mp4",
    description: 'Najlepsza neapolitańska pizza w mieście. Klimatyczne wnętrze i świetne drinki.',
    coordinates: { latitude: 51.11111, longitude: 17.03379 },
    googleMapsUrl: 'https://www.google.com/maps/place/Iggy+Pizza/@51.1110052,17.0312332,17z/data=!4m18!1m9!3m8!1s0x470fc275f20a08f7:0x9f567aefe7380ecc!2sIggy+Pizza!8m2!3d51.1110019!4d17.0338081!9m1!1b1!16s%2Fg%2F11fzjhs1hk!3m7!1s0x470fc275f20a08f7:0x9f567aefe7380ecc!8m2!3d51.1110019!4d17.0338081!9m1!1b1!16s%2Fg%2F11fzjhs1hk?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/iggypizza/',
    menu: [
      { name: 'Margherita', price: 32 },
      { name: 'Diavola', price: 38 },
      { name: 'Burrata', price: 42 },
      { name: 'Piwo Kraftowe', price: 18 } 
    ]
  },

  {
    id: '3',
    name: 'Pasibus',
    cuisine: ['Burgery', 'Amerykańska'],
    rating: 4.5,
    reviewsCount: 10000,
    address: 'Świdnicka 11, Wrocław',
    hasLunch: true, 
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=100&w=7680',
    description: 'Wrocławski klasyk burgerowy. Duże porcje, autorskie sosy i luźny klimat.',
    coordinates: { latitude: 51.10795, longitude: 17.03226 },
    googleMapsUrl: 'http://google.com/maps/place/Pasibus+%7C+Better+Burger/@51.1078129,17.0296496,17z/data=!4m8!3m7!1s0x470fc274167fca27:0x4ca1c44bf2960101!8m2!3d51.1078096!4d17.0322245!9m1!1b1!16s%2Fg%2F11bxf7bwch?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/pasibus/',
    menu: [
      { name: 'Standard', price: 29 },
      { name: 'Gonzales', price: 34 },
      { name: 'Frytki z batatów', price: 16 },
      { name: 'Piwo', price: 14 }
    ]
  },

  {
    id: '4',
    name: 'Przedwojenna',
    cuisine: ['Bar', 'Tatar', 'Polska'],
    rating: 4.6,
    reviewsCount: 5500,
    address: 'Św. Mikołaja 81, Wrocław',
    hasLunch: false,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=100&w=7680',
    description: 'Klimat dawnego Wrocławia. Tatar za grosze i wódka z kija.',
    coordinates: { latitude: 51.11115, longitude: 17.03034 },
    googleMapsUrl: 'https://www.google.com/maps/place/Przedwojenna/@51.1110473,17.0278175,17z/data=!4m8!3m7!1s0x470fc275b9fea4cd:0xef8920e846583ec8!8m2!3d51.111044!4d17.0303924!9m1!1b1!16s%2Fg%2F1vgw_gng?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/explore/locations/1709775/przedwojenna-bistro/',
    menu: [
      { name: 'Tatar wołowy', price: 15 },
      { name: 'Kiełbasa z wody', price: 12 },
      { name: 'Wódka', price: 9 },
      { name: 'Piwo', price: 9 } 
    ]
  },

  {
    id: '5',
    name: 'Panczo',
    cuisine: ['Meksykańska', 'Tex-Mex'],
    rating: 4.4,
    reviewsCount: 5100,
    address: 'Św. Antoniego 35',
    hasLunch: true, 
    image: 'https://images.unsplash.com/photo-1536184071535-78906f7172c2?auto=format&fit=crop&q=100&w=7680',
    description: 'Tex-mex w najlepszym wydaniu. Pyszne tacos, burrito i mocne margarity.',
    coordinates: { latitude: 51.10997, longitude: 17.02318 },
    googleMapsUrl: 'https://www.google.com/maps/place/PANCZO+Antoniego/@51.1098623,17.0206777,17z/data=!4m8!3m7!1s0x470fc276ec2d1f7f:0x849a7724364bd18c!8m2!3d51.109859!4d17.0232526!9m1!1b1!16s%2Fg%2F11c2k0__p7?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/panczo_bus/',
    menu: [
      { name: 'Tacos (3szt)', price: 36 },
      { name: 'Big Ass Burrito', price: 39 },
      { name: 'Nachos Supreme', price: 28 },
      { name: 'Cerveza (Piwo)', price: 16 }
    ]
  },

  {
    id: '6',
    name: 'Konspira',
    cuisine: ['Polska', 'Obiad'],
    rating: 4.6,
    reviewsCount: 11000,
    address: 'Plac Solny 11, Wrocław',
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1521917441209-e886f0404a7b?auto=format&fit=crop&q=100&w=7680',
    description: 'Restauracja historyczna nawiązująca do czasów Solidarności. Ogromne porcje tradycyjnej kuchni.',
    coordinates: { latitude: 51.10930, longitude: 17.02826 },
    googleMapsUrl: 'https://www.google.com/maps/place/Konspira/@51.1092261,17.0256647,17z/data=!4m8!3m7!1s0x470fc274dcd23439:0x5ad7fdb4cef000b5!8m2!3d51.1092228!4d17.0282396!9m1!1b1!16s%2Fg%2F11c528kz4x?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/restauracja_konspira/',
    menu: [
      { name: 'Schabowy gigant', price: 42 },
      { name: 'Pierogi Ruskie', price: 28 },
      { name: 'Żurek w chlebie', price: 26 },
      { name: 'Piwo Regionalne', price: 15 } 
    ]
  },

  {
    id: '7',
    name: 'Sushi Corner',
    cuisine: ['Japońska', 'Sushi', 'Azjatycka'],
    rating: 4.6,
    reviewsCount: 2700,
    address: 'Włodkowica 11, Wrocław',
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&q=100&w=7680',
    description: 'Świeże sushi w samym sercu Dzielnicy Czterech Wyznań. Idealne na randkę lub biznesowy lunch.',
    coordinates: { latitude: 51.1086680125782, longitude: 17.023501269046708},
    googleMapsUrl: 'https://www.google.com/maps/place/Sushi+Corner+-+Wroc%C5%82aw/@51.1085703,17.0209371,17z/data=!3m1!5s0x470fc20b67d3416d:0x260b884cd0138c61!4m8!3m7!1s0x470fc20b6f98018f:0x12ed39cb399d88ae!8m2!3d51.108567!4d17.023512!9m1!1b1!16s%2Fg%2F1pp2tsbpq?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/sushicorner/',
    menu: [
      { name: 'Zestaw Lunchowy', price: 39 },
      { name: 'Rolka Philadelphia', price: 28 },
      { name: 'Piwo Asahi', price: 15 }, 
      { name: 'Herbata Jaśminowa', price: 12 }
    ]
  },

  {
    id: '8',
    name: 'Whiskey in the Jar',
    cuisine: ['Amerykańska', 'Steki', 'Bar'],
    rating: 4.5,
    reviewsCount: 13000,
    address: 'Rynek 23, Wrocław',
    hasLunch: false,
    image: 'https://images.unsplash.com/photo-1682778418768-16081e4470a1?auto=format&fit=crop&q=100&w=7680',
    description: 'Rockowy klimat, steki, burgery i drinki podawane w słoikach.',
    coordinates: { latitude: 51.10924, longitude: 17.03213 },
    googleMapsUrl: 'https://www.google.com/maps/place/Whiskey+in+the+Jar/@51.1099988,17.0298768,17.62z/data=!4m12!1m2!2m1!1sWhiskey+in+the+Jar!3m8!1s0x470fc2744c7f6507:0xf1f482dc2c306fea!8m2!3d51.1092096!4d17.0321278!9m1!1b1!15sChJXaGlza2V5IGluIHRoZSBKYXIiA4gBAVoUIhJ3aGlza2V5IGluIHRoZSBqYXKSAQtzdGVha19ob3VzZeABAA!16s%2Fg%2F11b5ywv3kc?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/whiskeyinthejarwroclaw/',
    menu: [
      { name: 'Burger Jack Daniels', price: 48 },
      { name: 'Stek z Antrykotu', price: 89 },
      { name: 'Jar Drink', price: 32 },
      { name: 'Piwo Lager', price: 19 }
    ]
  },

  {
    id: '9',
    name: 'Woosabi',
    cuisine: ['Azjatycka', 'Bowle', 'Wegańska'],
    rating: 4.5,
    reviewsCount: 2900,
    address: 'Świdnicka 28, Wrocław',
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1657053460900-3a12f32b592f?auto=format&fit=crop&q=100&w=7680',
    description: 'Azjatycki fusion w zielonym, relaksującym wnętrzu. Słyną z bao i rice bowls.',
    coordinates: { latitude: 51.10642, longitude: 17.03180 },
    googleMapsUrl: 'https://www.google.com/maps/place/Woosabi+%C5%9Awidnicka+-+Good+Vibes+Lounge/@51.1063449,17.0292632,17z/data=!4m8!3m7!1s0x470fc3e626f68a5f:0x4b5a124eee1342d3!8m2!3d51.1063416!4d17.0318381!9m1!1b1!16s%2Fg%2F11pv3rkc0l?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/woosabi.pl/',
    menu: [
      { name: 'Bao z boczkiem', price: 29 },
      { name: 'Salmon Bowl', price: 44 },
      { name: 'Tofu Curry', price: 38 },
      { name: 'Piwo Singha', price: 16 } 
    ]
  },

  {
    id: '10',
    name: 'Mercado Tapas Bistro',
    cuisine: ['Hiszpańska', 'Tapas', 'Wino'],
    rating: 4.6,
    reviewsCount: 1500,
    address: 'Bogusławskiego 13, Wrocław',
    hasLunch: false,
    image: 'https://images.unsplash.com/photo-1532634781-dc90b4952f08?auto=format&fit=crop&q=100&w=7680',
    description: 'Autentyczne hiszpańskie tapas pod nasypem kolejowym. Świetne wina.',
    coordinates: { latitude: 51.10117, longitude: 17.02540 },
    googleMapsUrl: 'https://www.google.com/maps/place/Mercado+Tapas+Bistro/@51.101034,17.0227673,17z/data=!4m8!3m7!1s0x470fc32b58543975:0x48bc32a7b1693248!8m2!3d51.1010307!4d17.0253422!9m1!1b1!16s%2Fg%2F11h2c_6s98?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/mercado.wroclaw/',
    menu: [
      { name: 'Patatas Bravas', price: 18 },
      { name: 'Chorizo w winie', price: 26 },
      { name: 'Piwo Estrella', price: 15 }, 
      { name: 'Kieliszek Wina', price: 18 }
    ]
  },

  {
    id: '11',
    name: 'Oliwa i Ogień 2.0',
    cuisine: ['Włoska', 'Pizza', 'Makarony'],
    rating: 4.4,
    reviewsCount: 3800,
    address: 'Oławska 2, Wrocław',
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1543007631-283050bb3e8c?auto=format&fit=crop&q=100&w=7680',
    description: 'Genialna pizza i makarony tuż przy Rynku. Klimatyczny ogródek latem i luźna atmosfera.',
    coordinates: { latitude: 51.10823, longitude: 17.03645 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/Oliwa+i+Ogie%C5%84+O%C5%82awska/@51.1081756,17.0339497,17z/data=!4m8!3m7!1s0x470fc3a2afe9b3cf:0x7c17db0ef0eeeb7b!8m2!3d51.1081723!4d17.0365246!9m1!1b1!16s%2Fg%2F11t4ybyc_l?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/oliwa_i_ogien/',
    menu: [
      { name: 'Pizza Capricciosa', price: 36 },
      { name: 'Spaghetti Carbonara', price: 39 },
      { name: 'Gnocchi Truflowe', price: 42 },
      { name: 'Piwo', price: 16 }
    ]
  },

  {
    id: '12',
    name: 'BABA',
    cuisine: ['Polska', 'Nowoczesna', 'Autorska'],
    rating: 4.5,
    reviewsCount: 700,
    address: 'Nożownicza 1d, Wrocław', 
    hasLunch: false,
    image: 'https://images.unsplash.com/photo-1576723664541-23f84c3f93fb?auto=format&fit=crop&q=100&w=7680',
    description: 'Autorska kuchnia Beaty Śniechowskiej. Polskie smaki w nowoczesnym, odważnym wydaniu.',
    coordinates: { latitude: 51.11290, longitude: 17.03182 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/BABA/@51.1127436,17.0292486,17z/data=!4m8!3m7!1s0x470fe91f9339cb39:0x818eec6879a5b145!8m2!3d51.1127403!4d17.0318235!9m1!1b1!16s%2Fg%2F11vb179cd_?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/baba.wroclaw/',
    menu: [
      { name: 'Tatar z jelenia', price: 49 },
      { name: 'Pierogi z kaczką', price: 38 },
      { name: 'Kluski śląskie', price: 36 },
      { name: 'Piwo Rzemieślnicze', price: 18 }
    ]
  },
    {
    id: '13',
    name: 'Restauracja Bella Storia',
    cuisine: ['Polska', 'Nowoczesna', 'Autorska'],
    rating: 4.5,
    reviewsCount: 5242,
    address: 'Plac Grunwaldzki 53, Wrocław', 
    hasLunch: false,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=100&w=7680',
    description: 'Prosta restauracja z ceglanymi ścianami oferująca włoskie klasyki, w tym makaron, pizzę i dania mięsne, oraz piwo.',
    coordinates: { latitude: 51.1139651, longitude: 17.069944}, 
    googleMapsUrl: 'https://www.google.com/maps/place/Restauracja+Bella+Storia/@51.1114437,17.0501796,15z/data=!3m1!5s0x470fe82e88c58e9b:0xfb4dfe19a5d9d102!4m6!3m5!1s0x470fe82e85295c07:0x819fdb360ce8eb20!8m2!3d51.1139651!4d17.069944!16s%2Fg%2F11gdlz9xdc?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/bellastoria.wroclaw/',
    menu: [
      { name: 'Pizza Margherita', price: 26},
      { name: 'Pizza Prosciutto', price: 34 },
      { name: 'Zapienkanka dyniowa', price: 30 },
      { name: 'Tiramisu', price: 18 }
    ]
  },
  {
    id: '14',
    name: 'Woo Thai Street Food',
    cuisine: ['Tajska', 'Azjatycka', 'Street Food'],
    rating: 4.5,
    reviewsCount: 1500,
    address: 'Rybacka 11, Wrocław', 
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=100&w=7680', 
    description: 'Prawdziwe smaki Tajlandii we Wrocławiu. Miejsce słynie z niesamowitego Pad Thaia robionego na oczach gości i ostrego curry.',
    coordinates: { latitude: 51.1136289, longitude: 17.018203 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/WOO+THAI+Street+Food+Rybacka/@51.1136289,16.9821541,14z/data=!3m1!5s0x470fc209d73e919f:0x8941226394454cf4!4m10!1m2!2m1!1swoothai!3m6!1s0x470fc209d13eb2c7:0x786e3dd548c7aacd!8m2!3d51.1136289!4d17.018203!15sCgd3b290aGFpIgOIAQFaCSIHd29vdGhhaZIBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F11f3vq6f8_?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/woothairestaurant/',
    menu: [
      { name: 'Pad Thai z kurczakiem', price: 38 },
      { name: 'Zielone Curry', price: 42 },
      { name: 'Zupa Tom Yum', price: 25 },
      { name: 'Piwo Chang', price: 15 }
    ]
  },
  {
    id: '15',
    name: 'Chinkalnia',
    cuisine: ['Gruzińska', 'Tradycyjna', 'Mięsna'],
    rating: 4.7,
    reviewsCount: 5380,
    address: 'Sukiennice 3, Wrocław', 
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=100&w=7680', 
    description: 'Tradycyjna gruzińska kuchnia w samym sercu wrocławskiego Rynku. Najlepsze, własnoręcznie lepione chinkali i gorące chaczapuri.',
    coordinates: { latitude: 51.1099787, longitude: 17.0320577 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/Chinkalnia+Restauracja+Gruzi%C5%84ska/@51.1099753,17.014035,15z/data=!4m10!1m2!2m1!1srestauracje+gruzi%C5%84skie+wroc%C5%82aw!3m6!1s0x470fc275afffb14f:0xa14eaf90afc2ce19!8m2!3d51.1099787!4d17.0320577!15sCiByZXN0YXVyYWNqZSBncnV6acWEc2tpZSB3cm9jxYJhd1oiIiByZXN0YXVyYWNqZSBncnV6acWEc2tpZSB3cm9jxYJhd5IBE2dlb3JnaWFuX3Jlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTjFNR1UzUTI5UlJSQULgAQD6AQQIABA1!16s%2Fg%2F1pp2vcwg0?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/chinkalnia/',
    menu: [
      { name: 'Chinkali z mięsem (5 szt.)', price: 25 },
      { name: 'Chaczapuri po adżarsku', price: 32 },
      { name: 'Szaszłyk wieprzowy', price: 45 },
      { name: 'Wino gruzińskie domowe', price: 20 }
    ]
  },
  {
    id: '16',
    name: 'Dinette',
    cuisine: ['Bistro', 'Śniadania', 'Nowoczesna'],
    rating: 4.7,
    reviewsCount: 2800,
    address: 'Świdnicka 40/Piętro 0, Wrocław', 
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1655979282314-eb45a7d69959?auto=format&fit=crop&q=100&w=7680', 
    description: 'Kultowe miejsce na mapie Wrocławia, znane z rewelacyjnych śniadań i wypiekanego na miejscu rzemieślniczego chleba.',
    coordinates: { latitude: 51.1035209, longitude: 17.030726 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/Dinette/@51.1099744,17.014035,15z/data=!4m10!1m2!2m1!1sdinette!3m6!1s0x470fc3000e0babbd:0x743ea95ee1da9229!8m2!3d51.1035209!4d17.030726!15sCgdkaW5ldHRlWgkiB2RpbmV0dGWSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11ld2vd9bc?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/dinette.pl/',
    menu: [
      { name: 'Śniadanie angielskie', price: 35 },
      { name: 'Jajka po benedyktyńsku', price: 32 },
      { name: 'Bajgiel z łososiem', price: 36 },
      { name: 'Kawa Specialty', price: 16 }
    ]
  },
  {
    id: '17',
    name: 'Ragu Pracownia Makaronu',
    cuisine: ['Włoska', 'Makarony', 'Śródziemnomorska'],
    rating: 4.8,
    reviewsCount: 4200,
    address: 'Sienkiewicza 34A, Wrocław', 
    hasLunch: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=100&w=7680', 
    description: 'Najbardziej oblegana włoska restauracja we Wrocławiu. Codziennie rano ręcznie wyrabiają świeży makaron. Zdecydowanie warto postać w kolejce na wejście!',
    coordinates: { latitude: 51.116530, longitude: 17.045012 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/RAGU+PRACOWNIA+MAKARONU/@51.0944584,17.0204557,14z/data=!4m10!1m2!2m1!1sragu!3m6!1s0x470fe9da77310d5b:0x855e734e9007ee7f!8m2!3d51.1170963!4d17.0490167!15sCgRyYWd1WgYiBHJhZ3WSARJpdGFsaWFuX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F11c546q1k2?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/ragu_pastabar/',
    menu: [
      { name: 'Ravioli z truflą', price: 46 },
      { name: 'Gnocchi z palonym masłem i szałwią', price: 38 },
      { name: 'Tagliatelle Ragu', price: 42 },
      { name: 'Kieliszek Prosecco', price: 18 }
    ]
  },
  {
    id: '18',
    name: 'Gluten Appetit',
    cuisine: ['Polska', 'Pierogi', 'Tradycyjna'],
    rating: 4.7,
    reviewsCount: 1680,
    address: 'Szczytnicka 54, Wrocław', 
    hasLunch: true,
    image: 'https://kuron.com.pl/wp-content/uploads/2016/11/F6BC838C-0844-4D33-9AE8-E1F1924B0232.png', 
    description: 'Polska kuchnia w nowoczesnym i estetycznym wydaniu blisko Ronda Reagana. Idealne miejsce, gdy łapie Cię tęsknota za domowymi pierogami lub kluskami śląskimi.',
    coordinates: { latitude: 51.112810, longitude: 17.054025 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/Gluten+Appetit+-+pierogi,+pyzy,+kopytka/@51.1127729,17.0535264,17z/data=!3m2!4b1!5s0x470fe9d40d54cc61:0x2353ac13189f5ce8!4m6!3m5!1s0x470fe9d4644722bb:0x1eff57ab35db08d7!8m2!3d51.1127729!4d17.0561013!16s%2Fg%2F11df0n9zry?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/gluten_appetit/',
    menu: [
      { name: 'Pierogi Ruskie (10 szt.)', price: 29 },
      { name: 'Kluski Śląskie z sosem pieczarkowym', price: 32 },
      { name: 'Pyzy z mięsem', price: 34 },
      { name: 'Domowy Kompot', price: 9 } 
    ]
  },
  {
    id: '19',
    name: 'Bravo. Pizzeria',
    cuisine: ['Pizza', 'Amerykańska', 'Street Food'],
    rating: 4.6,
    reviewsCount: 3100,
    address: 'Plac Grunwaldzki 18/20, Wrocław', 
    hasLunch: false,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=100&w=7680', 
    description: 'Słynna pizza w stylu Detroit! Grube puszyste ciasto, chrupiące serowe brzegi i ogromna ilość dodatków. Ulubione miejsce studentów na szybki cheat meal.',
    coordinates: { latitude: 51.111225, longitude: 17.058123}, 
    googleMapsUrl: 'https://www.google.com/maps/place/Bravo.+Pizzeria/@51.1127729,17.0535264,17z/data=!4m10!1m2!2m1!1spizza!3m6!1s0x470fe9d4c4d7a1a9:0xc81cb99ffd11f09b!8m2!3d51.1112258!4d17.0581235!15sCgVwaXp6YVoHIgVwaXp6YZIBEHBpenphX3Jlc3RhdXJhbnSaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnQ0VjFkVE1YUmhSbFpQVjFob2VHRlZUakpoVjFvelkxUnNRbUl4UlJBQuABAPoBBAgiEEY!16s%2Fg%2F1tlzyx7j?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/bravo_pizzeria/',
    menu: [
      { name: 'Pizza Pepperoni (Detroit Style)', price: 42 },
      { name: 'Pizza BBQ Chicken', price: 45 },
      { name: 'Firmowy sos czosnkowy', price: 5 },
      { name: 'Piwo Kraftowe', price: 16 }
    ]
  },
  {
    id: '20',
    name: 'Mango Mama',
    cuisine: ['Azjatycka', 'Indyjska', 'Tajska'],
    rating: 4.6,
    reviewsCount: 1396,
    address: 'Podwale 83, Wrocław', 
    hasLunch: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg', 
    description: 'Bogactwo przypraw, świetne curry, pad thai i chrupiące samosy, które przeniosą Cię prosto na ulice Azji.',
    coordinates: { latitude: 51.10751, longitude: 16.971302 }, 
    googleMapsUrl: 'https://www.google.com/maps/place/Mango+Mama+OVO+%7C+kuchnia+indyjska+%7C+kuchnia+azjatycka+%7C+restauracja+indyjska+Wroc%C5%82aw/@51.10751,16.971302,13z/data=!3m1!5s0x470fc278317cf7af:0x92e73b2217eebc38!4m10!1m2!2m1!1smango+mama+plac!3m6!1s0x470fc3ccc8b779db:0xc400a99ae36c4fda!8m2!3d51.1074893!4d17.043409!15sCg9tYW5nbyBtYW1hIHBsYWMiA4gBAVoRIg9tYW5nbyBtYW1hIHBsYWOSARhtb2Rlcm5faW5kaWFuX3Jlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUjFaMUJxYVZsQkVBReABAPoBBAg6ED8!16s%2Fg%2F11h_lzfwr7?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
    instagramUrl: 'https://www.instagram.com/mangomamafood/',
    menu: [
      { name: 'Butter Chicken z ryżem i chlebkiem naan', price: 42 },
      { name: 'Pad Thai z kurczakiem', price: 39 },
      { name: 'Samosy z warzywami (2 szt.)', price: 22 },
      { name: 'Mango Lassi', price: 18 }
    ]
  }
];