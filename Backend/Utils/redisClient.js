const { createClient } = require('redis')


const redisClient = createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST,
        port: 17083
    }
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
  

