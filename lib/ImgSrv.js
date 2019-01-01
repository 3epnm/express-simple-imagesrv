const express = require('express');
const lib = require('./ImgSrvLib.js');
const multer = require('multer');

module.exports = (options) => {
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
