const express = require('express');
const menuController = require('../controllers/menuController');
const { cekApiKey } = require('../middleware/cekApiKey');
const { validasiMenu } = require('../validators/menuValidator');

const router = express.Router();

router.get('/', menuController.getAll);
router.get('/:id', menuController.getById);
router.post('/', cekApiKey, validasiMenu, menuController.create);
router.delete('/:id', cekApiKey, menuController.remove);

module.exports = router;
