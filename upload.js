//import mongoose from 'mongoose'
import multer from 'multer'
let fileName = ''



const storage = multer.diskStorage({
    destination: function (req, image, cb) {
      cb(null, 'uploads')    /// file storing path is uploads folder by clients
    },
    filename: function (req, image, cb) {
      fileName = image.originalname + '-' + Date.now()
      
      cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })

  export {upload,fileName}