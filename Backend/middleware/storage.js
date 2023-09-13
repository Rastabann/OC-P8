const multer = require("multer");
const fs = require("fs-extra");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "./uploads"; // Définit le chemin désiré

    // Vérifie si le répertoire d'upload existe et le crée si nécessaire
    fs.ensureDirSync(uploadPath);

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".jpg");
  },
});

module.exports = { storage };
