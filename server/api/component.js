let express = require('express');
let path = require('path');
const fs = require('../utils/fs');
const router = express.Router();

router.get('/',(req,res,next) => {
    console.log(123123);
    try{
        if(req.query.componentName){
            let componentName = req.query.componentName;
            let filePath = path.join('publish/resources',componentName,'index.js');
            fs.readFile(filePath).then((fileContent) => {
                res.status(200).send({
                    state:1,
                    component:{
                        componentName:componentName,
                        fileContent:fileContent
                    }
                })
            })
        }
    }catch(err){
        console.log(err);
        next(err);
    }
});

module.exports = router;