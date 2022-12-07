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
exports.downloadImage = exports.downloadImages = exports.uploadImg = exports.publish = exports.save = exports.read = exports.previewTrends = exports.currentSeq = exports.getCurrentSeq = exports.getSeq = void 0;
const DBStorage_connection_1 = require("../DBStorage.connection");
const schemas_1 = require("../schemas");
const general_functions_1 = require("./general.functions");
const users_functions_1 = require("./users.functions");
function getSeq() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schemas_1.PARAM_MODEL.findOneAndUpdate({ name: 'sequence' }, { $inc: { value: 1 } });
    });
}
exports.getSeq = getSeq;
function getCurrentSeq() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schemas_1.PARAM_MODEL.findOne({ name: 'sequence' }, { value: 1, _id: 0 });
    });
}
exports.getCurrentSeq = getCurrentSeq;
function currentSeq() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schemas_1.PARAM_MODEL.findOne({ name: 'sequence' });
    });
}
exports.currentSeq = currentSeq;
// const images = await downloadImages(DBDocs.map(doc => doc['_doc'].thumbnail || "cld-sample-2"));
// const docs = DBDocs.map((doc, index) => ({...doc['_doc'], image: images[index]}));
function previewTrends(take) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!take) {
            take = 5;
        }
        const DBDocs = yield schemas_1.DOC_MODEL.find({ trend: true }, { name: 1, author: 1, views: 1, likes: 1, description: 1, thumbnail: 1, seq: 1 }).limit(take);
        const docs = DBDocs.map((doc) => (Object.assign({}, doc['_doc'])));
        const processedDocs = yield addImageData(docs);
        processedDocs.forEach((doc) => {
            delete doc.thumbnail;
            delete doc['_id'];
        });
        return yield translateAuthor(processedDocs);
    });
}
exports.previewTrends = previewTrends;
function translateAuthor(docs) {
    return __awaiter(this, void 0, void 0, function* () {
        let translatedDocs = [];
        return new Promise((res) => {
            docs.forEach((doc) => __awaiter(this, void 0, void 0, function* () {
                translatedDocs.push((Object.assign(Object.assign({}, doc), { author: yield (0, general_functions_1.translator)(doc.author, schemas_1.USER_MODEL, "name") })));
                if (translatedDocs.length === docs.length)
                    res(translatedDocs);
            }));
        });
    });
}
function addImageData(docs) {
    return __awaiter(this, void 0, void 0, function* () {
        let processedDoc = [];
        return new Promise((res) => {
            docs.forEach((doc) => __awaiter(this, void 0, void 0, function* () {
                processedDoc.push((Object.assign(Object.assign({}, doc), { image: yield downloadImage(doc.thumbnail || "cld-sample-2") })));
                if (processedDoc.length === docs.length)
                    res(processedDoc);
            }));
        });
    });
}
function read(docSeq) {
    return __awaiter(this, void 0, void 0, function* () {
        let document = yield schemas_1.DOC_MODEL.findOne({ seq: docSeq });
        try {
            yield (0, users_functions_1.findById)((document === null || document === void 0 ? void 0 : document.author) || "")
                .then((res) => document.author = res.username)
                .catch(err => console.error(err));
            return document;
        }
        catch (error) {
            return null;
        }
    });
}
exports.read = read;
function save(name, author, date, content, seq) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield schemas_1.DOC_MODEL.create({
                name,
                author,
                date,
                content,
                seq,
                publish: false
            });
        }
        catch (error) {
            return error;
        }
    });
}
exports.save = save;
function publish(name, author, date, content, seq) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield schemas_1.DOC_MODEL.create({
                name,
                author,
                date,
                content,
                seq,
                publish: true,
                trend: true
            });
        }
        catch (error) {
            return error;
        }
    });
}
exports.publish = publish;
function uploadImg() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
exports.uploadImg = uploadImg;
function downloadImages(imagesId) {
    return new Promise((res) => {
        let imageArray = [];
        imagesId.forEach((id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (yield (0, DBStorage_connection_1.StorageConnection)()).api.resource(id);
                // const result = await GLOBAL.Storage.api.resource(id);
                imageArray.push({ format: result.format, size: result.bytes, url: result.secure_url });
            }
            catch (error) {
                console.error(error);
                imageArray.push({ code: 5, msg: "Error" });
            }
            if (imagesId.length === imageArray.length) {
                res(imageArray);
            }
        }));
    });
}
exports.downloadImages = downloadImages;
function downloadImage(imageId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = yield (yield (0, DBStorage_connection_1.StorageConnection)()).api.resource(imageId);
                // const resource = await GLOBAL.Storage.api.resource(imageId);
                res(resource);
            }
            catch (error) {
                console.error(error);
                const err = { code: 5, msg: "Error" };
                res(err);
            }
        }));
    });
}
exports.downloadImage = downloadImage;
