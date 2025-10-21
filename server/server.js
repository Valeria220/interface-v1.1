import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'DataBase1',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.json());

// Тестовый endpoint для проверки БД
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as current_time');
    res.json({ 
      message: '✅ База данных подключена!',
      time: result.rows[0].current_time 
    });
  } catch (error) {
    res.status(500).json({ 
      error: '❌ Ошибка подключения к БД', 
      details: error.message 
    });
  }
});

// Получение всех товаров с фильтрами - ИСПРАВЛЕННАЯ ВЕРСИЯ
/*app.get('/api/products', async (req, res) => {
  try {
    console.log('🛍️ Запрос товаров...');
    
    let query = `
      SELECT 
        pb.id,
        p.name as product_name,
        pb.price,
        c.name as city_name,
        c.id as city_id,
        r.name as rating_name,
        r.id as rating_id,
        s.name as store_name,
        s.id as store_id,
        s.url as store_url,
        plat.name as platform_name,
        pt.name as product_type_name
      FROM products_base pb
      JOIN products p ON pb.product_id = p.id
      JOIN cities c ON pb.city_id = c.id
      JOIN ratings r ON pb.rating_id = r.id
      JOIN stores s ON pb.store_id = s.id
      JOIN platforms plat ON s.platform_id = plat.id
      JOIN product_types pt ON pb.productType_id = pt.id
      LIMIT 50
    `;

    console.log('🔍 Выполняем запрос...');
    const result = await pool.query(query);
    console.log(`📊 Найдено записей: ${result.rows.length}`);

    // Группируем товары по ID продукта
    const productsMap = new Map();
    
    result.rows.forEach(row => {
      const productId = row.id;
      
      if (!productsMap.has(productId)) {
        productsMap.set(productId, {
          id: productId,
          name: row.product_name,
          price: row.price ? `${row.price} ₽` : "Цена не указана",
          rating: parseFloat(row.rating_name) || 0,
          productType: row.product_type_name,
          cities: [],
          delivery: ['delivery', 'pickup'], // временно, можно получить из delivery_products_base
          platforms: [],
          reviews: [], // можно получить из таблицы reviews
          image: `https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=${encodeURIComponent(row.product_name.substring(0, 20))}`
        });
      }
      
      const product = productsMap.get(productId);
      
      // Добавляем город если его еще нет
      if (!product.cities.some(city => city.id === row.city_id)) {
        product.cities.push(row.city_id); // сохраняем только ID для фильтрации
      }
      
      // Добавляем платформу если ее еще нет
      const existingPlatform = product.platforms.find(p => p.name === row.platform_name);
      if (!existingPlatform) {
        product.platforms.push({
          name: row.platform_name,
          url: row.store_url,
          stores: [row.store_name]
        });
      } else {
        // Добавляем магазин к существующей платформе
        if (!existingPlatform.stores.includes(row.store_name)) {
          existingPlatform.stores.push(row.store_name);
        }
      }
    });

    const products = Array.from(productsMap.values());
    console.log(`🎯 Сформировано товаров: ${products.length}`);
    
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});
*/
// Получение всех товаров с фильтрами - ИСПРАВЛЕННАЯ ВЕРСИЯ
app.get('/api/products', async (req, res) => {
  try {
    console.log('🛍️ Запрос товаров...');
    
    // Сначала проверим реальную структуру products_base
    const structureQuery = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'products_base' 
      ORDER BY ordinal_position
    `;
    const structure = await pool.query(structureQuery);
    console.log('📋 Структура products_base:', structure.rows);

    // УПРОЩЕННЫЙ запрос - убираем проблемные JOIN
    let query = `
      SELECT 
        pb.id,
        p.name as product_name,
        pb.price,
        c.name as city_name,
        c.id as city_id,
        r.name as rating_name,
        s.name as store_name,
        plat.name as platform_name
      FROM products_base pb
      JOIN products p ON pb.product_id = p.id
      JOIN cities c ON pb.city_id = c.id
      JOIN ratings r ON pb.rating_id = r.id
      JOIN stores s ON pb.store_id = s.id
      JOIN platforms plat ON s.platform_id = plat.id
      LIMIT 30
    `;

    console.log('🔍 Выполняем запрос...');
    const result = await pool.query(query);
    console.log(`📊 Найдено записей: ${result.rows.length}`);

    // Группируем товары по ID продукта
    const productsMap = new Map();
    
    result.rows.forEach(row => {
      const productId = row.id;
      
      if (!productsMap.has(productId)) {
        productsMap.set(productId, {
          id: productId,
          name: row.product_name,
          price: row.price ? `${row.price} ₽` : "Цена не указана",
          rating: parseFloat(row.rating_name) || 0,
          productType: "electronics", // временно фиксированное значение
          cities: [],
          delivery: ['delivery', 'pickup'],
          platforms: [],
          reviews: [],
          image: `https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=${encodeURIComponent((row.product_name || '').substring(0, 20))}`
        });
      }
      
      const product = productsMap.get(productId);
      
      // Добавляем город если его еще нет
      if (row.city_id && !product.cities.includes(row.city_id)) {
        product.cities.push(row.city_id);
      }
      
      // Добавляем платформу если ее еще нет
      const existingPlatform = product.platforms.find(p => p.name === row.platform_name);
      if (!existingPlatform && row.platform_name) {
        product.platforms.push({
          name: row.platform_name,
          url: 'https://example.com', // временно
          stores: [row.store_name || 'Неизвестный магазин']
        });
      } else if (existingPlatform && row.store_name) {
        // Добавляем магазин к существующей платформе
        if (!existingPlatform.stores.includes(row.store_name)) {
          existingPlatform.stores.push(row.store_name);
        }
      }
    });

    const products = Array.from(productsMap.values());
    console.log(`🎯 Сформировано товаров: ${products.length}`);
    
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Простой endpoint для теста
app.get('/api/products-simple', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM products LIMIT 10');
    
    const products = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: '1000 ₽',
      rating: 4.5,
      productType: 'electronics',
      cities: ['08769484-bda5-4921-91a1-c3bd98413423'],
      delivery: ['delivery'],
      platforms: [{ 
        name: 'Wildberries', 
        stores: ['Тестовый магазин'],
        url: 'https://www.wildberries.ru'
      }],
      reviews: [],
      image: `https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=Product`
    }));
    
    res.json(products);
  } catch (error) {
    console.error('Error in /api/products-simple:', error);
    res.status(500).json({ error: error.message });
  }
});

// Получение данных для фильтров - ИСПРАВЛЕННАЯ ВЕРСИЯ
app.get('/api/filters', async (req, res) => {
  try {
    console.log('🎛️ Загрузка фильтров...');
    
    // Проверим названия таблиц
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%product%'
    `;
    const tables = await pool.query(tablesQuery);
    console.log('📋 Таблицы с product:', tables.rows);

    const [cities, ratings] = await Promise.all([
      pool.query('SELECT id, name FROM cities ORDER BY name'),
      pool.query('SELECT id, name FROM ratings ORDER BY id')
    ]);

    // Временные данные для productTypes и deliveryOptions
    const productTypes = [
      { id: "electronics", name: "Электроника" },
      { id: "clothing", name: "Одежда" },
      { id: "books", name: "Книги" }
    ];

    const deliveryOptions = [
      { id: "delivery", name: "С доставкой" },
      { id: "pickup", name: "Самовывоз" }
    ];

    res.json({
      cities: cities.rows,
      productTypes: productTypes,
      ratings: ratings.rows.map(rating => ({
        id: rating.id.toString(),
        name: `${'⭐'.repeat(parseInt(rating.id))} ${rating.id} звезд`
      })),
      deliveryOptions: deliveryOptions
    });
  } catch (error) {
    console.error('❌ Error fetching filter data:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Получение статистики по базе - ИСПРАВЛЕННАЯ ВЕРСИЯ
app.get('/api/stats', async (req, res) => {
  try {
    const [productsCount, citiesCount, storesCount] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM products_base'),
      pool.query('SELECT COUNT(*) FROM cities'),
      pool.query('SELECT COUNT(*) FROM stores')
    ]);

    res.json({
      products: parseInt(productsCount.rows[0].count),
      cities: parseInt(citiesCount.rows[0].count),
      stores: parseInt(storesCount.rows[0].count),
      message: `В базе: ${productsCount.rows[0].count} товаров, ${citiesCount.rows[0].count} городов, ${storesCount.rows[0].count} магазинов`
    });
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Новый endpoint для отладки структуры БД
app.get('/api/debug/tables', async (req, res) => {
  try {
    const tables = await pool.query(`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `);
    
    const structure = {};
    tables.rows.forEach(row => {
      if (!structure[row.table_name]) {
        structure[row.table_name] = [];
      }
      structure[row.table_name].push({
        column: row.column_name,
        type: row.data_type,
        nullable: row.is_nullable
      });
    });
    
    res.json(structure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📊 Тест БД: http://localhost:${PORT}/api/test-db`);
  console.log(`🛍️ Продукты: http://localhost:${PORT}/api/products`);
  console.log(`🎛️ Фильтры: http://localhost:${PORT}/api/filters`);
  console.log(`📈 Статистика: http://localhost:${PORT}/api/stats`);
  console.log(`🐛 Отладка: http://localhost:${PORT}/api/debug/tables`);
});