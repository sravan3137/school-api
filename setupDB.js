const db = require('./db.js');

async function createTable() {
    try{
        await db.query('CREATE DATABASE IF NOT EXISTS schoolDB');
        await db.query('USE schoolDB');
        await db.query(`CREATE TABLE IF NOT EXISTS schools ( 
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            address VARCHAR(150) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
            )`
        );
        console.log('Database and table created successfully');
    }catch(e){
        console.error('Error creating db/table:', e);
    }
}

module.exports = createTable;