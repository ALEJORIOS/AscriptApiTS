import { PAGES_MODEL, USER_MODEL } from "../schemas";
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { translator } from "./general.functions";

export async function createUser(newUserData: any) {
    let obj = {
        username: newUserData.username,
        password: newUserData.password,
        email: newUserData.email,
        name: newUserData.name,
        status: 'UNVERIFIED',
        tabs: ['Home', 'Communities', 'Write', 'Sponsor', 'Read'],
        creationDate: new Date(),
        country: '',
        donor: false,
        attempts: {
            attempts: 0,
            lastIP: ''
        }
    }
    await bcrypt.hash(newUserData.password, 13).then(res => {
        obj.password = res;
    })
    return await USER_MODEL.create(obj);
}

export async function login(user: string, password: string) {
    let confirmation: number;
    const userData = await USER_MODEL.findOne({ username: user });
    return new Promise(async(res) => {
        if (userData === null) {
            res({ status: -1 });
        } else if (userData.status === 'BLOCKED') {
            res({ status: 2 });
        } else {
            await bcrypt.compare(password, userData?.password || "").then(res => {
                confirmation = res ? 1 : 0;
            })
            if (confirmation === 1) {
                const JWT_SECRET_KEY: Secret = process.env.JWT_KEY || "";
                let token = jwt.sign({ name: userData.name, username: userData.username }, JWT_SECRET_KEY);
                await USER_MODEL.findOneAndUpdate({ _id: userData._id }, { attempts: { attempts: 0 } });
                res({ status: 1, value: token, landing: await translator(userData?.landing || "", PAGES_MODEL, 'route') });
            } else {
                if (userData.attempts.attempts >= 3) {
                    await USER_MODEL.findOneAndUpdate({ _id: userData._id }, { status: 'BLOCKED' });
                } else {
                    await USER_MODEL.findOneAndUpdate({ _id: userData._id }, { $inc: { "attempts.attempts": 1 } });
                }
                res({ status: 0 });
            }
        }
    })
}

export function verifyToken() {
    return {
        code: 1,
        message: 'valid Token'
    }
}

function update() {

}

function hardUpdate() {

}

function checkExistence(userData: any) {

}

export async function verifyUsername(username: string) {
    return await USER_MODEL.findOne({ username }) ? false : true;
}

export async function verifyEmail(email: string) {
    return await USER_MODEL.findOne({ email }) ? false : true;
}

export async function findRegister(stringToCompare: string, ableEmails: boolean = true) {
    if (!stringToCompare) {
        return {}
    }
    if (ableEmails) {
        return await USER_MODEL.find({ $or: [{ username: { $regex: new RegExp(stringToCompare), $options: "i" } }, { email: { $regex: new RegExp(stringToCompare), $options: "i" } }] });
    } else {
        return await USER_MODEL.find({ username: { $regex: new RegExp(stringToCompare), $options: "i" } });
    }
}

export async function findById(id: string) {
    return await USER_MODEL.findOne({ _id: id });
}

function setToken() {

}

function test() {

}