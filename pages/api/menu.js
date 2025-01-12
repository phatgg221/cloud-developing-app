import redis from 'redis';
import { promisify } from 'util';

// Create Redis client
const client = redis.createClient({
  host: 'myre.6sqtqu.ng.0001.use1.cache.amazonaws.com', // Corrected host
  port: 6379, // Default Redis port
});

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);

// Ensure the client is ready before using it
client.on('ready', () => {
  console.log('Redis client connected and ready');
});

client.on('error', (err) => {
  console.error('Redis client error:', err);
});

client.on('end', () => {
  console.log('Redis client connection closed');
});

async function connectRedis() {
  return new Promise((resolve, reject) => {
    console.log('Attempting to connect to Redis...');
    client.on('ready', () => {
      console.log('Redis client is connected and ready');
      resolve();
    });

    client.on('error', (err) => {
      console.error('Redis connection failed:', err);
      reject(new Error('Redis connection failed: ' + err));
    });
  });
}

export default async function handler(req, res) {
  const { menuId } = req.query; // Get menuId from the query params
  console.log(`Handler function started for menuId: ${menuId}`);

  if (!menuId) {
    return res.status(400).json({ error: 'Menu ID is required' });
  }

  const cacheKey = `menu_cache_${menuId}`; // Key to store/retrieve cached data for a specific menu
  console.log('Cache key for menu:', cacheKey);

  try {
    // Ensure Redis client is connected and ready
    await connectRedis();
    console.log('Connected to Redis. Now trying to fetch cache.');

    // Try fetching the cached data from Redis
    const cachedData = await getAsync(cacheKey);

    if (cachedData) {
      console.log('Found data in cache.');
      return res.status(200).json({
        message: 'Data fetched from cache',
        data: JSON.parse(cachedData),
      });
    } else {
      console.log('No cache found. Fetching from API...');
    }

    // If no cached data, fetch from the external API
    const apiResponse = await fetch(`https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/MenuStage/getMenu?menuId=${menuId}`);
    console.log('API response received:', apiResponse);

    if (apiResponse.ok) {
      const result = await apiResponse.json();
      console.log('API data received:', result);

      const menuData = JSON.parse(result.body).data;

      // Cache the fetched data in Redis for 5 minutes (TTL 300 seconds)
      console.log('Caching data in Redis...');
      client.setEx(cacheKey, 300, JSON.stringify(menuData));

      return res.status(200).json({
        message: 'Data fetched from API and cached',
        data: menuData,
      });
    } else {
      console.error('API request failed with status:', apiResponse.status);
      return res.status(500).json({ error: 'Failed to fetch menu data from API' });
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
