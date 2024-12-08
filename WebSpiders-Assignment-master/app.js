require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middlewares/errorHandler');
const authorization = require("./middlewares/authorization")
const authentication  = require('./routes/authentication')

const app = express();
app.use(express.json());

app.use("/", authentication)

app.use(authorization);

app.use('/tasks', taskRoutes);

app.use(errorHandler);


mongoose
  .connect(process.env.MONGO_URI,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true
      
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
