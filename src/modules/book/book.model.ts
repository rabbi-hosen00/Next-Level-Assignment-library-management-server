import { model, Model, Schema } from "mongoose";
import { IBook, IBookMethods } from "./book.interface";


const bookSchema = new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "{VALUE} is not acceptable subject name"
        }
    },
    isbn: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies must be a positive number']
    },
    available: { type: Boolean, default: true, trim: true },
},
    {
        timestamps: true,
        versionKey: false,
    }
)

// bookSchema.methods.updateAvailability = function () {
//   this.available = this.copies > 0;
// };

bookSchema.methods.updateAvailability= function (){
    this.available = this.copies > 0;
}

// const Book = model<IBook>("Book", bookSchema)
const Book = model<IBook, Model<IBook, {}, IBookMethods>>("Book", bookSchema);
export default Book;


