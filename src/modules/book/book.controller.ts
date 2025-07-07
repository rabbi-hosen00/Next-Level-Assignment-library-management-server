

import { Request, Response } from "express";
import Book from "./book.model";
import mongoose from "mongoose";



const createBook: any = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);
    res.send({
      success: true,
      message: "book created successfully",
      data,
    });
  }
  catch (error: any) {
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




// const getBooks = async (req: Request, res: Response) => {
//   try {
//     const userGenre = typeof req.query.filter === 'string' ? req.query.filter.trim() : "";
    
//     // ✅ Get limit from query, fallback to 10
//     const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

//     console.log("userGenre:", userGenre);
//     console.log("limit:", limit);

//     let data = [];

//     if (userGenre) {
//       data = await Book.find({
//         genre: { $regex: new RegExp(`^${userGenre}$`, "i") }  // Case-insensitive match
//       }).sort({ createdAt: -1 }).limit(limit);
//     } else {
//       data = await Book.find().sort({ createdAt: -1 }).limit(limit);
//     }

//     res.send({
//       success: true,
//       message: "Books fetched successfully",
//       data,
//     });

//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Failed to get books",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };


const getBooks = async (req: Request, res: Response) => {
  try {
    const userGenre = typeof req.query.filter === 'string' ? req.query.filter.trim() : "";

    // ✅ Dynamic limit (default: 10)
    const rawLimit = parseInt(req.query.limit as string, 10);
    const limit = !isNaN(rawLimit) && rawLimit > 0 ? rawLimit : 10;

    // ✅ Dynamic sortBy and sort direction (default: createdAt desc)
    const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : 'createdAt';
    const sortOrder = req.query.sort === 'asc' ? 1 : -1; // asc = 1, desc = -1

    console.log("userGenre:", userGenre);
    console.log("limit:", limit);
    console.log("sortBy:", sortBy);
    console.log("sortOrder:", sortOrder);

    let data = [];

    if (userGenre) {
      data = await Book.find({
        genre: { $regex: new RegExp(`^${userGenre}$`, "i") }
      }).sort({ [sortBy]: sortOrder }).limit(limit);
    } else {
      data = await Book.find().sort({ [sortBy]: sortOrder }).limit(limit);
    }

    res.send({
      success: true,
      message: "Books fetched successfully",
      data,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};



const getBookById: any = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const data = await Book.findById(bookId);



    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Book not found",
      });
    }

    res.send({
      success: true,
      message: "Book fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to get book",
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







