const jwt= require('jsonwebtoken');    

const auth= (req, res, next)=>{
    const token= req.header('x-auth-token');

    //check for token
    if(!token){
        return res.status(401).json("No token, authorization denied");
    }
    try{
        //verify token
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        
         //Add user from payload
         req.user= decoded;
         next();
    }catch(err){
        res.status(400).json("Invalid token");
    }
}

module.exports= auth;   