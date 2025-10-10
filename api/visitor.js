let visitorCount = 0;
const visitedIPs = new Set();

export default function handler(req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const visitorIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  if (!visitedIPs.has(visitorIP)) {

    visitedIPs.add(visitorIP);
    visitorCount++;
    console.log(`New visitor: ${visitorIP}, Total: ${visitorCount}`);
  }

  if (req.method === 'GET') {
    res.status(200).json({ 
      count: visitorCount,
      message: 'Visitor count retrieved'
    });
  } else if (req.method === 'POST') {
    res.status(200).json({ 
      count: visitorCount,
      message: 'Visitor tracked'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
