import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://sudopkw.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Get visitor ID from cookie header
    const cookieHeader = req.headers.cookie || '';
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map(c => c.trim().split('='))
    );
    const visitorId = cookies.visitor_id;
    
    let newVisitorId;
    if (!visitorId) {
      // Generate new visitor ID
      newVisitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    const currentVisitorId = visitorId || newVisitorId;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const key = `visitor:${currentVisitorId}:${today}`;
    
    const alreadyCounted = await redis.get(key);
    
    let count;
    if (!alreadyCounted && currentVisitorId) {
      // First visit today - increment total and mark as counted
      count = await redis.incr('unique_visitors_total');
      await redis.setex(key, 86400, '1'); // Expire in 24 hours
      console.log(`New unique visitor: ${currentVisitorId}, total: ${count}`);
    } else {
      // Already counted today - just get current total
      count = await redis.get('unique_visitors_total') || 0;
      count = parseInt(count);
      console.log(`Returning visitor: ${currentVisitorId}, total: ${count}`);
    }
    
    // Prepare response
    const responseData = { 
      count: count,
      status: 'success',
      isNew: !alreadyCounted
    };
    
    // Set visitor cookie for new visitors
    if (newVisitorId) {
      res.setHeader('Set-Cookie', 
        `visitor_id=${newVisitorId}; Max-Age=2592000; Path=/; SameSite=None; Secure`
      );
    }
    
    res.status(200).json(responseData);
    
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).json({ 
      error: 'Counter temporarily offline',
      count: 0
    });
  }
}
