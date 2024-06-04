const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".").pop();
    callback(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

router.get("/productos/listar", productosController.obtenerProductos);
router.post(
  "/productos/crear",
  upload.single("imagen"),
  productosController.crearProducto
);
router.get("/productos/detalle/:id", productosController.obtenerProductoId);
router.put(
  "/productos/actualizar/:id",
  upload.single("imagen"),
  productosController.updateProduct
);
router.delete("/productos/eliminar/:id", productosController.eliminarProducto);

// Definir el resto de las rutas CRUD aquí

module.exports = router;
