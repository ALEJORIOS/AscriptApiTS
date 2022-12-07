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
Object.defineProperty(exports, "__esModule", { value: true });
exports.translatorArray = exports.translator = void 0;
function translator(id, model, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let returnObj = {};
        returnObj['_id'] = 0;
        returnObj[key] = 1;
        return (yield model.findOne({ '_id': id }, returnObj))[key];
    });
}
exports.translator = translator;
function translatorArray(id, model, key) {
    return __awaiter(this, void 0, void 0, function* () {
        let returnObj = {};
        returnObj['_id'] = 0;
        returnObj[key] = 1;
        return (yield model.find({ '_id': id }, returnObj)).map(prop => prop[key]);
    });
}
exports.translatorArray = translatorArray;
