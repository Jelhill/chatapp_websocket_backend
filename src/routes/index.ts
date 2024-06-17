import express from 'express';
import { handleFileUpload, upload } from '../util/upload';

const router = express.Router();


router.get('/', (req, res) => {
    res.json({message: 'Server is running!'});
});
  
router.post('/upload', upload.single('file'), handleFileUpload);


  export default router