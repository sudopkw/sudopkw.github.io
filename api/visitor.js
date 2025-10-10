import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Get visitor ID from cookie or generate new one
    const visitorId = req.cookies?.visitor_id || generateVisitorId();
    
    // Check if this visitor already counted today
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const key = `visitor:${visitorId}:${today}`;
    
    const alreadyCounted = await redis.get(key);
    
    let count;
    if (!alreadyCounted) {
      // First visit today - increment total and mark as counted
      count = await redis.incr('unique_visitors_total');
      await redis.setex(key, 86400, '1'); // Expire in 24 hours
      console.log(`New unique visitor: ${visitorId}, total: ${count}`);
    } else {
      // Already counted today - just get current total
      count = await redis.get('unique_visitors_total') || 0;
      console.log(`Returning visitor: ${visitorId}, total: ${count}`);
    }
    
    // Set visitor cookie (if not already set)
    if (!req.cookies?.visitor_id) {
      res.setHeader('Set-Cookie', `visitor_id=${visitorId}; Max-Age=2592000; Path=/; SameSite=Lax`); // 30 days
    }
    
    res.status(200).json({ 
      count: parseInt(count),
      status: 'success',
      isNew: !alreadyCounted
    });
    
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ 
      error: 'Counter temporarily offline',
      count: 0
    });
  }
}

function generateVisitorId() {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}
