"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
// bookSchema.methods.updateAvailability = function () {
//   this.available = this.copies > 0;
// };
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
};
// const Book = model<IBook>("Book", bookSchema)
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
