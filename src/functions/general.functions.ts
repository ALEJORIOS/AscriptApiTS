import { Model } from "mongoose";

export async function translator(id: string, model: Model<any>, key: string) {
    let returnObj: any = {};
    returnObj['_id'] = 0;
    returnObj[key] = 1;
    return (await model.findOne({ '_id': id }, returnObj))[key];
}

export async function translatorArray(id: Array<string> | undefined, model: Model<any>, key: string) {
    let returnObj: any = {};
    returnObj['_id'] = 0;
    returnObj[key] = 1;
    return (await model.find({ '_id': id }, returnObj)).map(prop => prop[key]);
}