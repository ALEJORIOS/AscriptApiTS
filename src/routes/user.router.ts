import express, { Request, Response } from 'express';
import { getPrivatePages, getPublicNavPages } from '../functions/pages.functions';
import { createUser, findRegister, login, verifyEmail, verifyToken, verifyUsername } from '../functions/users.functions';


const router = express.Router();

router.get('/find', (req: Request, res: Response) => {
    const reqString: string = req.query.string as string;
    findRegister(reqString, true)
        .then(response => res.json(response))
        .catch(err => {
            console.error(err);
            res.send('ERROR');
        })
})

router.post('/register', async(req: Request, res: Response) => {
    createUser(req.body)
    .then(response => res.json({msg: 'SUCCESS'}))
    .catch(err => {
        console.error(err);
        res.send('ERROR')
    })
})


router.post('/login', async(req: Request, res: Response) => {
    login(req.body.username, req.body.password)
    .then(response => res.json(response))
    .catch(err => {
        console.error(err);
        res.send('ERROR')
    })
})

router.get('/verify-username', async(req: Request, res: Response) => {
    const reqUsername: string = req.query.username as string;
    verifyUsername(reqUsername)
    .then(response => res.json(response))
    .catch(err => {
        console.error(err);
        res.send('ERROR')
    })
})

router.get('/verify-email', async(req: Request, res: Response) => {
    const reqEmail: string = req.query.email as string;
    verifyEmail(reqEmail)
    .then(response => res.json(response))
    .catch(err => {
        console.error(err);
        res.send('ERROR')
    })
})

router.get('/private-pages', async(req: Request, res: Response) => {
    getPrivatePages(req.body.decoded.username)
    .then(response => res.json(response))
    .catch(err => {
        console.error(err);
        res.send('ERROR')
    })
})

router.get('/nav-public', async(req: Request, res: Response) => {
    getPublicNavPages()
    .then(response => res.json(response))
    .catch(err => {
        console.error(err);
        res.send('ERROR')
    })
})

router.get('/verifyToken', (req: Request, res: Response) => {
    res.json(verifyToken());
})

router.put('/hard-update', (req: Request, res: Response) => {

})

router.patch('/update', (req: Request, res: Response) => {

})

export const userRouter = router;