import { Schema, model } from "mongoose";
import { IBorrow } from "./borrow.interface";
import Book from "../book/book.model";


const borrowSchema = new Schema<IBorrow>(
    {
        book: {
            type: Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Book ID is required"]
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"]
        },
        dueDate: {
            type: Date,
            required: true,
            validate: {
                validator: (value: Date) => value > new Date(),
                message: "Due date must be in the future"
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// borrowSchema.pre("save", async function(next){
//     const borrow = this;
//     console.log(borrow)
//     const book = await Book.findById(borrow.book)
//     console.log(book);
//     if (!book) throw new Error("Book not found");

//     if(book.copies < borrow.quantity){
//          return next(new Error("Not enough copies available"));
//     }
//       book.copies -= borrow.quantity;

//        // Update availability using instance method
//        book.updateAvailability()
//        await book.save()
//        next()
// })


borrowSchema.pre("save", async function (next) {
  try {
    const borrow = this;

    const book = await Book.findById(borrow.book);

    if (!book) {
      return next(new Error("Book not found"));
    }

    if (book.copies < borrow.quantity) {
      return next(new Error("Not enough copies available"));
    console.log("Not enough copies available")
    }

    book.copies -= borrow.quantity;

    // Update availability using instance method
    book.updateAvailability();

    await book.save();
    next();
  } catch (error:any) {
    next(error);
  }
});



const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;


