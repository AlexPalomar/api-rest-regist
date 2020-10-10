"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rtSchema = new mongoose_1.Schema({
    id: String,
    ot: String,
    description: String,
    date: String,
    state: String
}, {
    timestamps: true
});
exports.default = mongoose_1.model('rt', rtSchema);
