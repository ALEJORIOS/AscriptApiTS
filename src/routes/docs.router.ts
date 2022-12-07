import express, { Request, Response } from 'express';
import { downloadImage, getCurrentSeq, getSeq, previewTrends, publish, read, save, uploadImg } from '../functions/docs.functions';

const router = express.Router();

router.get('/preview-trends', (req: Request, res: Response) => {
    const reqTake = ~~(req.query.take as string);
    previewTrends(reqTake)
        .then((response: any) => res.json(response))
        .catch((err: any) => {
            console.error(err);
            res.send('ERROR');
        })
})

router.get('/read', (req: Request, res: Response) => {
    const reqSeq = ~~(req.query.seq as string);
    read(reqSeq)
        .then((response: any) => res.send(response))
        .catch((err: any) => {
            console.error(err);
            res.json({ msg: 'ERROR' });
        })
})

router.get('/seq', (req: Request, res: Response) => {
    getSeq()
        .then((response: any) => res.json(response.value))
        .catch((err: any) => {
            console.error(err);
            res.json({ msg: 'ERROR' });
        })
})

router.get('/current-seq', (req: Request, res: Response) => {
    getCurrentSeq()
        .then((response: any) => res.json(response.value))
        .catch((err: any) => {
            console.error(err);
            res.json({ msg: 'ERROR' });
        })
})

router.post('/save-doc', (req: Request, res: Response) => {
    save(req.body.name, req.body.author, req.body.date, req.body.content, req.body.seq)
        .then((response: any) => res.json(response))
        .catch((err: any) => {
            console.error(err);
            res.json({ msg: 'ERROR' })
        })
})

router.post('/publish-doc', (req: Request, res: Response) => {
    publish(req.body.name, req.body.author, req.body.date, req.body.content, req.body.seq)
        .then((response: any) => res.json(response))
        .catch((err: any) => {
            console.error(err);
            res.json({ msg: 'ERROR' })
        })
})

router.get('/download-img', async(req: Request, res: Response) => {
    downloadImage(req.headers.id as string)
        .then((response: any) => res.json(response))
        .catch((err: any) => {
            console.error(err);
            res.json({ msg: 'ERROR' })
        })
})
export const docsRouter = router;

function readBodyAsBuffer(req: any) {
    return new Promise((resolve, reject) => {
        let buffer = Buffer.alloc(0);
        req.setEncoding(null);
        req.on("data", (chunk: any) => (buffer = Buffer.concat([buffer, Buffer.from(chunk)])));
        req.on("end", () => resolve(buffer));
        req.on("error", reject);
    })
}