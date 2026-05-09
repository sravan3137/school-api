
function checkIsNumber(inputArray){
    for(let input of inputArray){
        if(typeof input !== 'number' || Number.isNaN(input)){
            return false;
        }
    }
    return true;
}
function validateInput(req,res,next){
    const {name,address,latitude,longitude} = req.body;
    const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s.'-]{2,50}$/;
    const addressRegex = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s,./#()'-]{5,150}$/;;
    if(name === undefined || address === undefined || latitude === undefined || longitude === undefined){
        return res.status(400).json({error:'All fields (name, address, latitude, longitude) are required'});
    }
    if(!checkIsNumber([latitude,longitude])){
        return res.status(400).json({error:'Latitude and longitude must be valid numbers'});
    }
    if(latitude < -90 || latitude > 90){
        return res.status(400).json({error:'Latitude must be between -90 and 90'});
    }
    if(longitude < -180 || longitude > 180){
        return res.status(400).json({error:'Longitude must be between -180 and 180'});
    }
    if(typeof name !== 'string' || !nameRegex.test(name.trim())){
        return res.status(400).json({error:'Invalid school name: only letters, spaces, and .\'- allowed, 2-50 characters'});
    }
    if(typeof address !== 'string' || !addressRegex.test(address.trim())){
        return res.status(400).json({error:'Invalid address: only letters, numbers, spaces, and ,./#()\'- allowed, 5-150 characters'});
    }
    next();

}

module.exports = validateInput;