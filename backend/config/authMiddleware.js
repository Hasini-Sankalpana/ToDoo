import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET); 
    req.user = decoded;  
    next();  
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
