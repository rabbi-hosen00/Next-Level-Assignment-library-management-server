"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.default.create(req.body);
        res.send({
            success: true,
            message: "book created successfully",
            data,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
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
});
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
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userGenre = typeof req.query.filter === 'string' ? req.query.filter.trim() : "";
        // ✅ Dynamic limit (default: 10)
        const rawLimit = parseInt(req.query.limit, 10);
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
            data = yield book_model_1.default.find({
                genre: { $regex: new RegExp(`^${userGenre}$`, "i") }
            }).sort({ [sortBy]: sortOrder }).limit(limit);
        }
        else {
            data = yield book_model_1.default.find().sort({ [sortBy]: sortOrder }).limit(limit);
        }
        res.send({
            success: true,
            message: "Books fetched successfully",
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
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid book ID format",
            });
        }
        const data = yield book_model_1.default.findById(bookId);
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
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to get book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndUpdate(bookId, req.body, {
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
});
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndDelete(bookId);
        res.send({
            success: true,
            message: "book delete successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to delete book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.bookController = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBookById,
};
