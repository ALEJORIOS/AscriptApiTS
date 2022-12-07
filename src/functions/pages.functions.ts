import { PAGES_MODEL, PARAM_MODEL, USER_MODEL } from "../schemas";
import { translatorArray } from "./general.functions";

export async function getNavPages() {
    return await PAGES_MODEL.find({ nav: true });
}

export async function getPrivatePages(username: string) {
    const privatePages = await USER_MODEL.findOne({ username }, {tabs: 1, _id: 0});
    return await translatorArray(privatePages?.tabs, PAGES_MODEL, 'route');
}

export async function getPhrase() {
    return await PARAM_MODEL.findOne({ name: 'phrase' });
}

export async function getPublicNavPages() {
    return await PAGES_MODEL.find({public: true, nav: true}).sort({order: 1});
}