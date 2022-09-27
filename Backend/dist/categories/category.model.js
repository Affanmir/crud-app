"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
});
//# sourceMappingURL=category.model.js.map