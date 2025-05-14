const sequelize = require('./config/db');

(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅  DB connected');
        // burada Express/app.listen vs. başlatırsınız
    } catch (err) {
        console.error('❌  DB error:', err);
    }
})();
