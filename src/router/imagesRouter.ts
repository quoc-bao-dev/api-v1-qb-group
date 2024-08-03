import { Router } from 'express';
import path from 'path';

const imageRouter = Router();

imageRouter.get('/:file', (req, res) => {
    const { file } = req.params;
    const filePath = path.join(__dirname, '..', '..', 'uploads', file);
    res.sendFile(filePath);
});
export default imageRouter;
