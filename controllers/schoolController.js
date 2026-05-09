const db = require('../db.js');

const addSchool= async(req,res)=>{
    try{
        const {name,address,latitude,longitude} = req.body;
        let fix=6;
        if (longitude>99 || longitude<-99){
            fix=7;
        }
        const lat = Number(Number(latitude).toFixed(6));
        const lon = Number(Number(longitude).toFixed(fix));
        await db.query(`INSERT INTO schools (name,address,latitude,longitude)
            VALUES (?,?,?,?)`,[name,address,lat,lon]
        );
        res.status(201).json({message:'School added successfully'});
    }catch(e){
        console.error('Error adding school:', e);
        res.status(500).json({error:'Failed to add school'});
    }
}

const listSchools = async(req,res)=>{
    try{
        lat= parseFloat(req.query.latitude);
        lon= parseFloat(req.query.longitude);
        console.log('Received lat:', lat, 'lon:', lon);
        if(req.query.latitude === undefined || req.query.longitude === undefined){
            return res.status(400).json({error:'latitude and longitude query parameters are required'});
        }
        if(isNaN(lat) || isNaN(lon)){
            return res.status(400).json({error:'latitude and longitude query parameters must be valid numbers'});
        }
        if(lat < -90 || lat > 90){
            return res.status(400).json({error:'latitude must be between -90 and 90'});
        }
        if(lon < -180 || lon > 180){
            return res.status(400).json({error:'longitude must be between -180 and 180'});
        }
        const schoolsInOrder = await db.query(`
            SELECT id,name,address,latitude,longitude,(
            6371 * acos( cos(radians(?)) * 
            cos(radians(latitude)) * 
            cos(radians(longitude) - radians(?)) + 
            sin(radians(?)) * 
            sin(radians(latitude))
            ) 
        ) AS distance FROM schools ORDER BY distance`,[lat,lon,lat]);
        res.json(schoolsInOrder[0]);
        console.log('Schools in order:', schoolsInOrder[0]);
    }catch(e){
        console.error('Error listing schools:', e);
        res.status(500).json({error:'Failed to list schools'});
    }
}
module.exports = {addSchool,listSchools};