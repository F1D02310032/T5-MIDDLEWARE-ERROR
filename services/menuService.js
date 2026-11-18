const menuData = require('../data/menuData');
const AppError = require('../utils/AppError');

exports.getAll = async (kategori) => menuData.getAll(kategori);

exports.getById = async (id) => {
  const item = menuData.getById(id);
  if (!item) {
    throw new AppError(404, 'Menu tidak ditemukan', 'NOT_FOUND');
  }
  return item;
};

exports.create = async (itemData) => {
  const duplicate = menuData.getAll().some(
    (item) => item.nama.toLocaleLowerCase('id') === itemData.nama.toLocaleLowerCase('id')
  );
  if (duplicate) {
    throw new AppError(409, 'Nama menu sudah terdaftar', 'NAMA_DUPLIKAT');
  }
  return menuData.create(itemData);
};

exports.remove = async (id) => {
  const removed = menuData.remove(id);
  if (!removed) {
    throw new AppError(404, 'Menu tidak ditemukan', 'NOT_FOUND');
  }
};
