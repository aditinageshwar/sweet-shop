require('dotenv').config();
const { app, connectDB } = require('./app');

const PORT = process.env.PORT;
const startServer = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== 'test')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();