import express, { Request, Response } from "express";
import CategoryService from "../services/categoryService.js"

const CategoryController = {

  async getOffset(req:Request, res: Response)  {
    try {
      const pageNumber = Number(req.query.pageNumber) || 1;
      const pageSize = Number(req.query.pageSize) || 10;
      const categories = await CategoryService.paginateCategories(pageNumber, pageSize);
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  ,
  async getAllCategories(req: Request, res: Response) {
    const list = await CategoryService.findAll()
    res.json({ list });
  }
  ,
  async getCategoryById(req: Request, res: Response) {
    const categoryId = req.params.id;
    const item = await CategoryService.findOne(categoryId)
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ code: 404, error: "Category not found" });
    }
  }
  ,
  async createCategory(req: Request, res: Response) {
    const category = req.body;
    if (category) {
      const newCategory = await CategoryService.createOne(category)
      res.status(201).json(newCategory);
    } else {
      res.status(400).json({ code: 404, error: "Details are Required" });
    }
  }
  ,
  async updateCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    const  name  = req.body;
    if (name) {
      const category = await CategoryService.updateOne(categoryId, name);
      if (category) {
        res.json({ message: `${JSON.stringify(category)} has been updated` });
      } else {
        res.status(404).json({ code: 404, error: "Category not found" });
      }
    } else {
      res.status(400).json({ code: 404, error: "Details are Required" });
    }
  }
  ,
  async deleteCategory(req: Request, res: Response) {
    const categoryId = req.params.id;
    const category = await CategoryService.deleteOne(categoryId);

    if (category) {
      res.json({
        message: `Category ${categoryId} has been deleted successfully`,
      });
    } else {
      res.status(404).json({ code: 404, error: "Category not found" });
    }
  }
}
export default CategoryController;
