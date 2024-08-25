const express = require('express');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Synchronize database
db.sequelize.sync().then(() => {
  console.log('Database synchronized');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
