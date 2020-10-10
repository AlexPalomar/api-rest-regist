"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const moment_1 = __importStar(require("moment"));
class RtRoute {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/rts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM rt', (err, result, fields) => {
                if (err)
                    throw console.log(err);
                res.json({ rts: result });
            });
        }));
        this.router.post('/rts', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                'id': req.body.id.toString(),
                'ot': req.body.ot.toString(),
                'description': req.body.description.toString(),
                'date': req.body.date.toString(),
                'state': req.body.state.toString(),
                "date_rt": `${moment_1.default(moment_1.now()).format('MM/DD/YYYY h:mm a')}`
            };
            yield database_1.default.query('INSERT INTO rt set ?', [data]);
            res.status(200).json({ message: 'save' });
        }));
        this.router.get('/rts/id/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const word = req.params.id;
            yield database_1.default.query('SELECT * FROM rt WHERE id LIKE ?', `%${word}%`, (err, result, fields) => {
                if (err)
                    throw console.log(err);
                if (result.length > 0) {
                    res.status(200).json({ rts: result });
                }
                else {
                    res.status(200).json({ rts: 'no registra' });
                }
            });
        }));
        this.router.get('/rts/ot/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const word = req.params.id;
            yield database_1.default.query('SELECT * FROM rt WHERE ot LIKE ?', `%${word}%`, (err, result, fields) => {
                if (err)
                    throw console.log(err);
                if (result.length > 0) {
                    res.status(200).json({ rts: result });
                }
                else {
                    res.status(200).json({ rts: 'no registra' });
                }
            });
        }));
        this.router.get('/rts/description/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const word = req.params.id;
            yield database_1.default.query('SELECT * FROM rt WHERE description LIKE ?', `%${word}%`, (err, result, fields) => {
                if (err)
                    throw console.log(err);
                if (result.length > 0) {
                    res.status(200).json({ rts: result });
                }
                else {
                    res.status(200).json({ rts: 'no registra' });
                }
            });
        }));
        this.router.get('/rts/state/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const word = req.params.id;
            yield database_1.default.query('SELECT * FROM rt WHERE state LIKE ?', `%${word}%`, (err, result, fields) => {
                if (err)
                    throw console.log(err);
                if (result.length > 0) {
                    res.status(200).json({ rts: result });
                }
                else {
                    res.status(200).json({ rts: 'no registra' });
                }
            });
        }));
        this.router.get('/rts/date/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const word = req.params.id;
            yield database_1.default.query('SELECT * FROM rt WHERE date LIKE ?', `%${word}%`, (err, result, fields) => {
                if (err)
                    throw console.log(err);
                if (result.length > 0) {
                    res.status(200).json({ rts: result });
                }
                else {
                    res.status(200).json({ rts: 'no registra' });
                }
            });
        }));
    }
}
const rtRoute = new RtRoute();
exports.default = rtRoute.router;
