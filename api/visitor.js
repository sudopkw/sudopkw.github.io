import { Redis } from '@upstash/redis'; 

const redis = Redis.fromEnv();

export default async function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {

    const count = await redis.incr('visitor_count');
    
    console.log(`Visitor count incremented to: ${count}`);
    
    res.status(200).json({ 
      count: count,
      status: 'success' 
    });
    
  } catch (error) {
    console.error('Redis error:', error);
    

    res.status(500).json({ 
      error: 'Counter temporarily offline',
      count: 0
    });
  }
}
