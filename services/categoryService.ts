import mongoose, { ObjectId } from "mongoose"
import CategoryRepo from "../models/Category.js"
import { Category } from "../types/category.js"

async function findAll() {
  const categories = await CategoryRepo.find().exec()

  return categories
}

async function findOne(categoryId: string) {
  const id = new mongoose.Types.ObjectId(categoryId)
  const category = await CategoryRepo.findById(id).exec()

  return category
}

async function createOne(category: Category) {
  const newProduct = new CategoryRepo(category)
  return await newProduct.save()
}

async function updateOne(categoryId: string, updatedCategory: Category) {
    const id = new mongoose.Types.ObjectId(categoryId);
    

      const category = await CategoryRepo.findById(id);
      
      if (!category) {
        return undefined
      }
      
      console.log('category:',category, 'updatedCategory:', updatedCategory)
      // Update category fields
      category.name = updatedCategory.name
      
      await category.save();
      return category;
  }


  async function deleteOne(categoryId: string) {
    const id = new mongoose.Types.ObjectId(categoryId);
    

      const category = await CategoryRepo.findById(id);
  
      if (!category) {
        return undefined
      }
  
      const deletedCategory = await CategoryRepo.deleteOne({ _id: id });
  
      if (deletedCategory.deletedCount === 0) {
        return undefined
      }
      
      return category;
  }

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne
}
