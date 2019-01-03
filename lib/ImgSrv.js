const express = require('express');
const ConfigMgr = require('./ConfigMgr.js');
const lib = require('./ImgSrvLib.js');

const multer = require('multer');

module.exports = (options) => {
    const config = new ConfigMgr(options);

    const upload = multer({
        dest: options.upload_dir
    });
    
    const router = express.Router();
    router.use(express.json());
    
    router.post('/', upload.single('Document'), lib.postImage);
    router.put('/:guid', lib.putImage);
    router.get('/:guid', lib.getImage);
    
    return router;
};
