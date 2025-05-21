const Product = require('../models/product.model');
const User = require('../models/users.model');

exports.create = async (req, res) => {
 try {
  const { name, description, price } = req.body;
  const product = await Product.create({ name, description, price, createdBy: req.user.id });
  res.json(product);
 } catch (error) {
  res.status(500).json({ message: "Internal server error" });
 }
};

exports.getAll = async (req, res) => {
  try {
    const { limit = 5, offset = 0 } = req.query;
    const products = await Product.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      total: products.count,
      products: products.rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getProductByAdmin = async (req,res)=>{
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const id = req.user.id
    console.log("id",id);
    
    const products = await Product.findAll({where:{createdBy:id}})
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
 
}

exports.update = async (req, res) => {
 try {
  const product = await Product.findByPk(req.params.id);
  console.log("product",product);
  
  if (!product) return res.status(404).json({ message: 'Not Product found' });

  if (product.createdBy !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized: Not the creator' });
  }
  console.log("req.body",req.body);
  
  await product.update(req.body);
  res.json(product);
 } catch (error) {
  res.status(500).json({ message: "Internal server error" });
 }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
  res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
  
};

exports.remove = async (req, res) => {
  try {
    const deletedCount = await Product.destroy({
      where: { id: req.params.id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(204).end(); // 204 No Content for successful deletion
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};