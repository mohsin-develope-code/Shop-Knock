const { createClient } = require('redis')


 const redisClient = createClient({
    url: 'redis://127.0.0.1:6379', 
  });


 redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });


 (async () => {
    try {
      await redisClient.connect();
      console.log('Connected to Redis');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  })();
  


  module.exports = redisClient
  

