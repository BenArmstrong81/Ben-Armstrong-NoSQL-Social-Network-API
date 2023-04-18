//--------Required express package and paths:
const router = require('express').Router();
        // const courseRoutes = require('./courseRoutes');
        // const studentRoutes = require('./studentRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

        // router.use('/courses', courseRoutes);
        // router.use('/students', studentRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

//--------Exports API Routes:
module.exports = router;
