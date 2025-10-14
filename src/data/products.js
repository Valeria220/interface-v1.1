// тестовые данные продуктов
export const products = [
  {
    id: 1,
    name: "Смартфон Samsung Galaxy S23",
    image: "https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=Samsung+S23",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "0b4adfc8-3754-4ac5-bac5-a54dd90c7b11", "7d672531-9dd9-4028-a646-587f6679dd95"],
    productType: "electronics",
    rating: 4.5,
    delivery: ["fast", "reservation"],
    platforms: [
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["ТехноМир", "ГаджетХаус"] },
      { name: "OZON", url: "https://ozon.ru", stores: ["Электросила", "М.Видео"] },
      { name: "Яндекс.Маркет", url: "https://market.yandex.ru", stores: ["DNS", "Ситилинк"] }
    ],
    reviews: [
      { 
        user: "Алексей", 
        rating: 5, 
        text: "Отличный телефон, быстрая доставка! Камера просто супер.", 
        date: "15.12.2024",
        platform: "Wildberries",
        store: "ТехноМир",
        storeUrl: "https://wildberries.ru"
      },
      { 
        user: "Мария", 
        rating: 4, 
        text: "Хорошая камера, но дорогой. Батарея держит весь день.", 
        date: "10.12.2024",
        platform: "OZON",
        store: "Электросила",
        storeUrl: "https://ozon.ru"
      }
    ],
    price: "₽79,999"
  },
  {
    id: 2,
    name: "Кроссовки Nike Air Max 270",
    image: "https://via.placeholder.com/200x150/FF6B6B/FFFFFF?text=Nike+Air+Max",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "8f5f87ac-5dc1-4958-86f7-4c8fe474a292", "c56a8641-73c0-49d3-a538-cdaf103cd009"],
    productType: "clothing",
    rating: 4.2,
    delivery: ["delivery", "pickup"],
    platforms: [
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["СпортМастер", "Nike Store"] },
      { name: "OZON", url: "https://ozon.ru", stores: ["Ламода", "Босфор"] }
    ],
    reviews: [
      { 
        user: "Иван", 
        rating: 5, 
        text: "Очень удобные, рекомендую! Идеально для бега.", 
        date: "18.12.2024",
        platform: "Wildberries",
        store: "СпортМастер",
        storeUrl: "https://wildberries.ru"
      },
      { 
        user: "Екатерина", 
        rating: 4, 
        text: "Качество отличное, но маломерят. Берите на размер больше.", 
        date: "12.12.2024",
        platform: "OZON",
        store: "Ламода",
        storeUrl: "https://ozon.ru"
      }
    ],
    price: "₽12,499"
  },
  {
    id: 3,
    name: "Кофемашина DeLonghi Magnifica S",
    image: "https://via.placeholder.com/200x150/4ECDC4/FFFFFF?text=DeLonghi",
    cities: ["df9904fa-f47e-4ef1-89f9-01a3ca5423ab", "88704dab-ee70-428a-b579-fad68b6a841a", "08769484-bda5-4921-91a1-c3bd98413423"],
    productType: "electronics",
    rating: 4.8,
    delivery: ["delivery", "reservation"],
    platforms: [
      { name: "Яндекс.Маркет", url: "https://market.yandex.ru", stores: ["Технопарк", "М.Видео"] },
      { name: "OZON", url: "https://ozon.ru", stores: ["Эльдорадо"] }
    ],
    reviews: [
      { 
        user: "Ольга", 
        rating: 5, 
        text: "Идеальный кофе каждое утро! Легка в использовании.", 
        date: "20.12.2024",
        platform: "Яндекс.Маркет",
        store: "Технопарк",
        storeUrl: "https://market.yandex.ru"
      },
      { 
        user: "Сергей", 
        rating: 4, 
        text: "Качество на высоте, но шумновата при работе.", 
        date: "14.12.2024",
        platform: "OZON",
        store: "Эльдорадо",
        storeUrl: "https://ozon.ru"
      }
    ],
    price: "₽34,999"
  },
  {
    id: 4,
    name: "Книга 'React для профессионалов'",
    image: "https://via.placeholder.com/200x150/45B7D1/FFFFFF?text=React+Book",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "0b4adfc8-3754-4ac5-bac5-a54dd90c7b11", "c56a8641-73c0-49d3-a538-cdaf103cd009"],
    productType: "books",
    rating: 4.7,
    delivery: ["delivery", "pickup", "fast"],
    platforms: [
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["Книжный мир", "Озон Книги"] },
      { name: "OZON", url: "https://ozon.ru", stores: ["Лабиринт", "Читай-город"] }
    ],
    reviews: [
      { 
        user: "Дмитрий", 
        rating: 5, 
        text: "Отличная книга для углубленного изучения React! Много практических примеров.", 
        date: "22.12.2024",
        platform: "Wildberries",
        store: "Книжный мир",
        storeUrl: "https://wildberries.ru"
      },
      { 
        user: "Анна", 
        rating: 4, 
        text: "Хороший материал, но для новичков может быть сложновато.", 
        date: "19.12.2024",
        platform: "OZON",
        store: "Лабиринт",
        storeUrl: "https://ozon.ru"
      }
    ],
    price: "₽2,499"
  },
  {
    id: 5,
    name: "Беспроводные наушники Sony WH-1000XM4",
    image: "https://via.placeholder.com/200x150/96CEB4/FFFFFF?text=Sony+WH-1000XM4",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "7d672531-9dd9-4028-a646-587f6679dd95", "8f5f87ac-5dc1-4958-86f7-4c8fe474a292"],
    productType: "electronics",
    rating: 4.9,
    delivery: ["delivery", "fast", "pickup"],
    platforms: [
      { name: "Яндекс.Маркет", url: "https://market.yandex.ru", stores: ["Ситилинк", "DNS"] },
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["М.Видео", "Эльдорадо"] }
    ],
    reviews: [
      { 
        user: "Артем", 
        rating: 5, 
        text: "Шумоподавление на высшем уровне! Звук чистый и насыщенный.", 
        date: "25.12.2024",
        platform: "Яндекс.Маркет",
        store: "Ситилинк",
        storeUrl: "https://market.yandex.ru"
      },
      { 
        user: "Виктория", 
        rating: 5, 
        text: "Батареи хватает на 30 часов. Очень довольна покупкой!", 
        date: "21.12.2024",
        platform: "Wildberries",
        store: "М.Видео",
        storeUrl: "https://wildberries.ru"
      }
    ],
    price: "₽24,999"
  },
  {
    id: 6,
    name: "Куртка зимняя The North Face",
    image: "https://via.placeholder.com/200x150/F7DC6F/FFFFFF?text=North+Face",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "c56a8641-73c0-49d3-a538-cdaf103cd009", "88704dab-ee70-428a-b579-fad68b6a841a"],
    productType: "clothing",
    rating: 4.6,
    delivery: ["delivery", "pickup"],
    platforms: [
      { name: "OZON", url: "https://ozon.ru", stores: ["Спортмания", "Триал-Спорт"] },
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["СпортЭксперт", "Экстрим"] }
    ],
    reviews: [
      { 
        user: "Михаил", 
        rating: 5, 
        text: "Очень теплая куртка, не промокает. Отлично для зимних походов.", 
        date: "28.12.2024",
        platform: "OZON",
        store: "Спортмания",
        storeUrl: "https://ozon.ru"
      },
      { 
        user: "Наталья", 
        rating: 4, 
        text: "Качество хорошее, но размеры немного великоваты.", 
        date: "24.12.2024",
        platform: "Wildberries",
        store: "СпортЭксперт",
        storeUrl: "https://wildberries.ru"
      }
    ],
    price: "₽15,999"
  },
  {
    id: 7,
    name: "Набор косметики L'Oreal Paris",
    image: "https://via.placeholder.com/200x150/D7BDE2/FFFFFF?text=L'Oreal",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "0b4adfc8-3754-4ac5-bac5-a54dd90c7b11", "df9904fa-f47e-4ef1-89f9-01a3ca5423ab"],
    productType: "beauty",
    rating: 4.3,
    delivery: ["delivery", "fast"],
    platforms: [
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["Рив Гош", "Л'Этуаль"] },
      { name: "OZON", url: "https://ozon.ru", stores: ["Подружка", "Золотое Яблоко"] }
    ],
    reviews: [
      { 
        user: "Елена", 
        rating: 5, 
        text: "Отличный набор за свои деньги! Косметика качественная.", 
        date: "26.12.2024",
        platform: "Wildberries",
        store: "Рив Гош",
        storeUrl: "https://wildberries.ru"
      },
      { 
        user: "Светлана", 
        rating: 4, 
        text: "Хорошее качество, но некоторые оттенки могут не подойти.", 
        date: "22.12.2024",
        platform: "OZON",
        store: "Подружка",
        storeUrl: "https://ozon.ru"
      }
    ],
    price: "₽3,499"
  },
  {
    id: 8,
    name: "Автомобильные шины Bridgestone Blizzak",
    image: "https://via.placeholder.com/200x150/F1948A/FFFFFF?text=Bridgestone",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "7d672531-9dd9-4028-a646-587f6679dd95", "c56a8641-73c0-49d3-a538-cdaf103cd009"],
    productType: "auto",
    rating: 4.7,
    delivery: ["delivery", "pickup"],
    platforms: [
      { name: "Яндекс.Маркет", url: "https://market.yandex.ru", stores: ["ШинаМаркет", "АвтоШина"] },
      { name: "OZON", url: "https://ozon.ru", stores: ["Автодоктор", "КолесаДаром"] }
    ],
    reviews: [
      { 
        user: "Андрей", 
        rating: 5, 
        text: "Отличные зимние шины! Отлично держат на льду и снегу.", 
        date: "29.12.2024",
        platform: "Яндекс.Маркет",
        store: "ШинаМаркет",
        storeUrl: "https://market.yandex.ru"
      },
      { 
        user: "Денис", 
        rating: 4, 
        text: "Качество на уровне, но установка в подарок не везде.", 
        date: "25.12.2024",
        platform: "OZON",
        store: "Автодоктор",
        storeUrl: "https://ozon.ru"
      }
    ],
    price: "₽12,999"
  },
  {
    id: 9,
    name: "Игровая консоль PlayStation 5",
    image: "https://via.placeholder.com/200x150/5D6D7E/FFFFFF?text=PS5",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "0b4adfc8-3754-4ac5-bac5-a54dd90c7b11"],
    productType: "electronics",
    rating: 4.8,
    delivery: ["delivery", "reservation"],
    platforms: [
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["М.Видео", "Эльдорадо"] },
      { name: "Яндекс.Маркет", url: "https://market.yandex.ru", stores: ["Ситилинк", "ДНС"] }
    ],
    reviews: [
      { 
        user: "Павел", 
        rating: 5, 
        text: "Мощная консоль, графика потрясающая! Быстрая доставка.", 
        date: "27.12.2024",
        platform: "Wildberries",
        store: "М.Видео",
        storeUrl: "https://wildberries.ru"
      },
      { 
        user: "Ирина", 
        rating: 4, 
        text: "Подарили сыну, очень доволен. Но игры дорогие.", 
        date: "23.12.2024",
        platform: "Яндекс.Маркет",
        store: "Ситилинк",
        storeUrl: "https://market.yandex.ru"
      }
    ],
    price: "₽54,999"
  },
  {
    id: 10,
    name: "Блендер Philips HR3652",
    image: "https://via.placeholder.com/200x150/F8C471/FFFFFF?text=Philips",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "88704dab-ee70-428a-b579-fad68b6a841a", "df9904fa-f47e-4ef1-89f9-01a3ca5423ab"],
    productType: "electronics",
    rating: 4.4,
    delivery: ["delivery", "pickup", "fast"],
    platforms: [
      { name: "OZON", url: "https://ozon.ru", stores: ["Техносила", "Электромир"] },
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["М.Видео", "Эльдорадо"] }
    ],
    reviews: [
      { 
        user: "Оксана", 
        rating: 5, 
        text: "Отличный блендер! Легко моется, мощный двигатель.", 
        date: "30.12.2024",
        platform: "OZON",
        store: "Техносила",
        storeUrl: "https://ozon.ru"
      },
      { 
        user: "Александр", 
        rating: 4, 
        text: "Хорошая модель за свои деньги. Шумноват на высоких оборотах.", 
        date: "26.12.2024",
        platform: "Wildberries",
        store: "М.Видео",
        storeUrl: "https://wildberries.ru"
      }
    ],
    price: "₽8,499"
  },
  {
    id: 11,
    name: "Фитнес-браслет Xiaomi Mi Band 7",
    image: "https://via.placeholder.com/200x150/48C9B0/FFFFFF?text=Xiaomi+Band",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "0b4adfc8-3754-4ac5-bac5-a54dd90c7b11", "7d672531-9dd9-4028-a646-587f6679dd95"],
    productType: "electronics",
    rating: 4.6,
    delivery: ["delivery", "fast", "pickup"],
    platforms: [
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["Ситилинк", "DNS"] },
      { name: "Яндекс.Маркет", url: "https://market.yandex.ru", stores: ["М.Видео", "Эльдорадо"] }
    ],
    reviews: [
      { 
        user: "Марина", 
        rating: 5, 
        text: "Отличный браслет за свои деньги! Батарея держит 2 недели.", 
        date: "28.12.2024",
        platform: "Wildberries",
        store: "Ситилинк",
        storeUrl: "https://wildberries.ru"
      },
      { 
        user: "Роман", 
        rating: 4, 
        text: "Хорошие функции, но ремешок быстро изнашивается.", 
        date: "24.12.2024",
        platform: "Яндекс.Маркет",
        store: "М.Видео",
        storeUrl: "https://market.yandex.ru"
      }
    ],
    price: "₽3,299"
  },
  {
    id: 12,
    name: "Набор посуды Tefal Ingenio",
    image: "https://via.placeholder.com/200x150/EC7063/FFFFFF?text=Tefal",
    cities: ["08769484-bda5-4921-91a1-c3bd98413423", "c56a8641-73c0-49d3-a538-cdaf103cd009"],
    productType: "furniture",
    rating: 4.5,
    delivery: ["delivery"],
    platforms: [
      { name: "OZON", url: "https://ozon.ru", stores: ["ПосудаЦентр", "ТехноДом"] },
      { name: "Wildberries", url: "https://wildberries.ru", stores: ["М.Видео", "Эльдорадо"] }
    ],
    reviews: [
      { 
        user: "Татьяна", 
        rating: 5, 
        text: "Удобные сьемные ручки! Экономят много места на кухне.", 
        date: "29.12.2024",
        platform: "OZON",
        store: "ПосудаЦентр",
        storeUrl: "https://ozon.ru"
      },
      { 
        user: "Виктор", 
        rating: 4, 
        text: "Качество хорошее, но антипригарное покрытие требует бережного ухода.", 
        date: "25.12.2024",
        platform: "Wildberries",
        store: "М.Видео",
        storeUrl: "https://wildberries.ru"
      }
    ],
    price: "₽18,999"
  }
];