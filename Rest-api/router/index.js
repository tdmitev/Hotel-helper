const router = require('express').Router();

// Импорт на маршрутите от отделните файлове
const homeRoutes = require('./homeRouter'); // Преминавате на правилното име на файла
const authRoutes = require('./authRoutes');
const guestRoutes = require('./guestRoutes');
const mealEventsRoutes = require('./mealEventsRoutes');
const menuItemsRoutes = require('./menuItemsRoutes'); 

// Интегриране на маршрутите
router.use('/', homeRoutes); // Home и Menu
router.use('/', authRoutes); // Регистрация, Вход и Изход
router.use('/guests', guestRoutes); // Специфични за рецепционисти и мениджъри
router.use('/meal-events', mealEventsRoutes); // Специфични за готвачи и мениджъри
router.use('/menu-items', menuItemsRoutes); // Специфични за готвачи и мениджъри

module.exports = router;
