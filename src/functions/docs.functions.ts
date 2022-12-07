import { StorageConnection } from "../DBStorage.connection";
import { DOC_MODEL, PARAM_MODEL, USER_MODEL } from "../schemas";
import { translator } from "./general.functions";
import { findById } from "./users.functions";

export async function getSeq() {
    return await PARAM_MODEL.findOneAndUpdate({ name: 'sequence' }, { $inc: { value: 1 } });
}

export async function getCurrentSeq() {
    return await PARAM_MODEL.findOne({ name: 'sequence' }, { value: 1, _id: 0 });
}

export async function currentSeq() {
    return await PARAM_MODEL.findOne({ name: 'sequence' });
}
// const images = await downloadImages(DBDocs.map(doc => doc['_doc'].thumbnail || "cld-sample-2"));
// const docs = DBDocs.map((doc, index) => ({...doc['_doc'], image: images[index]}));

export async function previewTrends(take: number) {
    if (!take) {
        take = 5;
    }
    const DBDocs = await DOC_MODEL.find({ trend: true }, { name: 1, author: 1, views: 1, likes: 1, description: 1, thumbnail: 1, seq: 1 }).limit(take);
    const docs = DBDocs.map((doc: any) => ({...doc['_doc']}));
    const processedDocs = await addImageData(docs);
    processedDocs.forEach((doc: any) => {
        delete doc.thumbnail;
        delete doc['_id'];
    })
    return await translateAuthor(processedDocs);
}

async function translateAuthor(docs: Array<any>) {
    let translatedDocs: Array<any> = [];
    return new Promise((res) => {
        docs.forEach(async (doc) => {
            translatedDocs.push(({
                ...doc,
                author: await translator(doc.author, USER_MODEL, "name")
            }));
            if(translatedDocs.length === docs.length) res(translatedDocs);
        })
    })
}

async function addImageData(docs: Array<any>): Promise<any> {
    let processedDoc: Array<any> = [];
    return new Promise((res) => {
        docs.forEach(async(doc) => {
            processedDoc.push(({
                ...doc,
                image: await downloadImage(doc.thumbnail || "cld-sample-2")
            }));
            if(processedDoc.length === docs.length) res(processedDoc);
        })
    })
} 

export async function read(docSeq: number) {
    let document: any = await DOC_MODEL.findOne({ seq: docSeq });
    try {
        await findById(document?.author || "")
            .then((res: any) => document.author = res.username)
            .catch(err => console.error(err))
        return document;
    } catch (error) {
        return null;
    }
}

export async function save(name: string, author: string, date: string, content: string, seq: number) {
    try {
        return await DOC_MODEL.create({
            name,
            author,
            date,
            content,
            seq,
            publish: false
        })
    } catch (error) {
        return error;
    }
}

export async function publish(name: string, author: string, date: string, content: string, seq: number) {
    try {
        return await DOC_MODEL.create({
            name,
            author,
            date,
            content,
            seq,
            publish: true,
            trend: true
        })
    } catch (error) {
        return error;
    }
}

export async function uploadImg() {

}

export function downloadImages(imagesId: Array<string>) {
    return new Promise((res) => {
        let imageArray: Array<any> = [];
        imagesId.forEach(async id => {
            try {
                const result = await (await StorageConnection()).api.resource(id);
                // const result = await GLOBAL.Storage.api.resource(id);
                imageArray.push({ format: result.format, size: result.bytes, url: result.secure_url });
            } catch (error) {
                console.error(error);
                imageArray.push({ code: 5, msg: "Error" });
            }
            if (imagesId.length === imageArray.length) {
                res(imageArray);
            }
        })
    })

}

export async function downloadImage(imageId: string) {
    return new Promise(async(res) => {
        try {
            const resource = await (await StorageConnection()).api.resource(imageId);
            // const resource = await GLOBAL.Storage.api.resource(imageId);
            res(resource);
        } catch (error) {
            console.error(error);
            const err = { code: 5, msg: "Error"};
            res(err)
        }
    })
}