let menu = [
  { id: 1, nama: 'Nasi Goreng', harga: 18000, kategori: 'makanan', tersedia: true },
  { id: 2, nama: 'Es Teh', harga: 5000, kategori: 'minuman', tersedia: true },
  { id: 3, nama: 'Pisang Goreng', harga: 10000, kategori: 'camilan', tersedia: true },
  { id: 4, nama: 'Ayam Bakar', harga: 25000, kategori: 'makanan', tersedia: false },
  { id: 5, nama: 'Kopi Susu', harga: 12000, kategori: 'minuman', tersedia: true }
];

let nextId = menu.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;

exports.getAll = (kategori) => {
  if (!kategori) return menu;
  return menu.filter((item) => item.kategori === kategori);
};

exports.getById = (id) => menu.find((item) => String(item.id) === id);

exports.create = (item) => {
  const newItem = { id: nextId, ...item };
  nextId += 1;
  menu.push(newItem);
  return newItem;
};

exports.remove = (id) => {
  const index = menu.findIndex((item) => String(item.id) === id);
  if (index === -1) return false;
  menu.splice(index, 1);
  return true;
};
