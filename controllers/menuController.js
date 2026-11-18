const menuService = require('../services/menuService');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const menu = await menuService.getAll(req.query.kategori);
  res.status(200).json(menu);
});

exports.getById = asyncHandler(async (req, res) => {
  const item = await menuService.getById(req.params.id);
  res.status(200).json(item);
});

exports.create = asyncHandler(async (req, res) => {
  const item = await menuService.create(req.body);
  res.status(201).json(item);
});

exports.remove = asyncHandler(async (req, res) => {
  await menuService.remove(req.params.id);
  res.status(204).end();
});
