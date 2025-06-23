import { Request, Response } from "express";
import Borrow from "./borrow.model";
import mongoose from "mongoose";



const createBorrow: any = async (req: Request, res: Response) => {
    try {
        const data = await Borrow.create(req.body);
        res.send({
            success: true,
            message: "Book borrowed successfully",
            data
        })
    } catch (error: any) {
            return res.status(400).json({
                success: false,
                message:"Not enough copies available",
                error
            })
        }
    }


// Get Borrow Summary
const getBorrowSummary = async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: "$book.title",
          isbn: "$book.isbn",
        },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
  });
  
};





export const borrowController ={
    createBorrow,
    getBorrowSummary
}

