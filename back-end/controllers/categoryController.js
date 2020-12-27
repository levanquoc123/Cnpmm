const { validationResult } = require("express-validator");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/categoryModel");
const _ = require("lodash");

exports.getCategories = (req, res, next) => {
  // try {
  //   const categories = await Category.find();
  //   res.status(200).json({
  //     message: "Fetched categories successfully.",
  //     categories: categories,
  //   });
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }

  Category.find().exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.status(200).json(data);
  });
};

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category)
      return res.status(400).json({ error: "The category does not exist" });
    req.category = category;
    next();
  });
};

exports.read = (req, res) => {
  return res.status(200).json(req.category);
};

exports.createCategory = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error("Validation failed, entered data is incorrect.");
  //   error.statusCode = 422;
  //   throw error;
  // }
  const name = req.body.name;
  const category = new Category({
    name: name,
  });

  try {
    await category.save();
    // io.getIO().emit("categories", {
    //   action: "create",
    //   category: { ...category._doc },
    // });
    res.status(201).json({
      message: "Category created successfully!",
      category: category,
    });
  } catch (err) {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
  }

  // const category = new Category(req.body);
  // category.save((err, data) => {
  //   if (err)
  //     return res.status(400).json({ error: 'The category already exists.' });
  //   res.json({ data });
  // });
};

exports.updateCategory = (req, res) => {
  const updatedFields = req.body;
  const updatedCategory = _.extend(req.category, updatedFields);
  updatedCategory.save((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.status(200).json({ data });
  });
};

exports.deleteCategory = (req, res) => {
  let category = req.category;
  category.remove((err, deletedCategory) => {
    if (err || !category)
      return res.status(400).json({ error: "The category does not exist" });
    res.status(201).json({
      message: "Category deleted successfully",
    });
  });
};
