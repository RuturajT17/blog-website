export const authenticateUser = (req, res, next) => {
    // Simple authentication check (replace with JWT logic if needed)
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  };