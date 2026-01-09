export const restaurants = [
  {
    id: '1',
    name: 'Pijalnia Wódki i Piwa',
    cuisine: ['Bar', 'Przekąski', 'Polska'],
    rating: 4.1,
    reviewsCount: 3460,
    address: 'Rynek 13, Wrocław',
    hasLunch: false, 
    image: 'https://d34-a.sdn.cz/d_34/c_img_QR_o/MFLtPk.jpeg?fl=res,400,225,3', 
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
    image: 'https://wroclawskiejedzenie.pl/wp-content/uploads/2016/01/IMG_3556-1024x768.jpg',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsiYNVIjVj3BdqN_XFJGLucJg4EFZI-BRhjQ&s',
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
    image: 'https://zjedz.my/storage/images/gallery/th_0958ae9f6a00e422c37c27d57c094a8d2f0a007a.JPG',
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
    image: 'https://www.wroclawcitytour.pl/wp-content/uploads/2024/10/20230527_130507-1-scaled.jpg',
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
    image: 'https://www.wroclaw.pl/beta2/files/news/410162/Sushi-corner-3.jpg',
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
    image: 'https://wroclawskiejedzenie.pl/wp-content/uploads/2014/10/whisky-1-scaled.jpg',
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
    image: 'https://miejscawewroclawiu.pl/wp-content/uploads/2024/02/woosabi-4-scaled.jpg',
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
    image: 'https://www.przepeace.pl/wp-content/uploads/2020/09/Mercado-Tapas-Bistro.jpg',
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
    image: 'https://pagedmeble.pl/wp-content/uploads/2024/08/ZASOBY_0023-1005899-1920.webp',
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
    image: 'https://www.wroclaw.pl/cdn-cgi/image/w=1900,f=avif/beta2/files/news/456347/BABA-RESTAURACJA-NOZOWNICZA-TH-5.jpg',
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
  }
];