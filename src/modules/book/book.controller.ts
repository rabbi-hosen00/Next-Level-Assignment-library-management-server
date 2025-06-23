

import { Request, Response } from "express";
import Book from "./book.model";
import mongoose from "mongoose";



const createBook :any = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);
    res.send({
      success: true,
      message: "book created successfully",
      data,
    });
  } 
  catch (error:any) {
   if (error instanceof mongoose.Error.ValidationError) {
      //  Handle schema validation error
      return res.status(400).json({
        message: "Validation failed",
        success: false,
        error,
      });
    }
    // Handle other errors
  //   return res.status(500).json({
  //     message: "Failed to create book",
  //     success: false,
  //     error: error instanceof Error ? error.message : "Unknown error",
  // });
  }
  }


// get all Books

const getBooks = async (req: Request, res: Response) => {
  try {
    const userGenre = req.query.genre ? req.query.genre : "";
    const limit = 10;

    let data= []
    if(userGenre){
      data= await Book.find({ genre: userGenre})
    }else{
      data= await Book.find().sort({createdAt : "desc"}).limit(limit)
    }
    
  
    res.send({
      success: true,
      message: "book getting successfully",
      data,
    });
  } 
  catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);
    res.send({
      success: true,
      message: "book fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get mango",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    res.send({
      success: true,
      message: "book updated successfully",
      data,
    });
  } 
  catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndDelete(bookId);

    res.send({
      success: true,
      message: "book delete successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to delete book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const bookController = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBookById,
};



