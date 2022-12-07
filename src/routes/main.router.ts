import { Router, Request, Response } from 'express';
import { currentSeq, getSeq } from '../functions/docs.functions';
import { getNavPages, getPhrase } from '../functions/pages.functions';

const router = Router();

router.get('/nav-pages', (req, res) => {
    getNavPages()
        .then(response => res.json(response))
        .catch(err => console.error(err))
})

router.get('/seq', (req, res) => {
    getSeq()
        .then(response => res.json(response))
        .catch(err => {
            console.error(err);
            res.json({ msg: 'ERROR' });
        })
})

router.get('/current', (req, res) => {
    currentSeq()
        .then(response => res.json(response))
        .catch(err => {
            console.error(err);
            res.json({ msg: 'ERROR' });
        })
})

router.get('/phrase', (req, res) => {
    getPhrase()
        .then(response => res.json(response?.value))
        .catch(err => {
            console.error(err);
            res.json({ msg: 'ERROR' })
        })
})

export const mainRouter = router;