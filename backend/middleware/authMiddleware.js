import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('Decoded token:', decoded); 
    
    if (!decoded.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token missing user identification' 
      });
    }
    
   
    req.user = { 
      _id: new mongoose.Types.ObjectId(decoded.id) 
    };
    
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};

export default authMiddleware;