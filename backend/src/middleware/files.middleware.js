const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
dotenv.config();

//Creamos el almacen para poder subir la imagen
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'UserFTProyect',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
  },
});

//Creamos la función de subir imagenes que utilizara el middleware
const upload = multer({ storage });

//Función de borrado de imagenes
const deleteImgCloudinary = (imgUrl) => {
  const imgSplited = imgUrl.split('/');
  const nameSplited = imgSplited[imgSplited.length - 1].split('.');
  const folderSplited = imgSplited[imgSplited.length - 2];
  const public_id = `${folderSplited}/${nameSplited[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log('Image delete in cloudinary');
  });
};
// Funcion para configurar cloudinary
const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
  });
};

module.exports = { upload, deleteImgCloudinary, configCloudinary };
