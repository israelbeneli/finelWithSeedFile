const jwt = require("jsonwebtoken");
const config = require("config");
const {validateStatus}=require("../models/Worker")

const logger = require("../logs/logger")
function authMW(roles){
    return async (req,res,next)=>{
            const token = req.header("x-auth-token");
             if(!token){
                res.status(401).send("access denied . No token");
                logger.error("access denied . No token")
                return;
            }
        
            try{
                const decode = jwt.decode(token,config.get("auth.JWT_SECRET"));
                req.worker = decode;
       
                if (!roles){
                    next();
                    return;
                }
               
                if(roles.includes("isSalesMan")){
                  
                    if(req.worker.status==="SalesMan"){
                        next();
                        return;
                    }
                }
                if(roles.includes("isPersonnelManager")){
                    if(req.worker.status==="PersonnelManager"){
                        next();
                        return;
                    }
                }
                if(roles.includes("isPurchasingManager")){
                    if(req.worker.status==="PurchasingManager"){
                        next(); 
                        return;
                    }
                } 
                if(roles.includes("isAdmin")){
                    if(req.worker.status==="Admin"){
                        next(); 
                        return;
                    }
                }
                res.status(404).send(`to user not have a ${roles} permissions`)
                logger.error(`to user not have a ${roles} permissions`)
            }catch{
                res.status(400).send("Invalid Token")
                logger.error("Invalid Token")
            }
    }
}
module.exports = {authMW};