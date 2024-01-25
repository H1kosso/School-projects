export const config = {
    port: process.env.PORT || 3100,
    databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard',
};
