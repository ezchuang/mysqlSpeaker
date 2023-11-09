import express, { Request, Response, IRouter } from 'express';
import { CreateDbObj, CreateObj } from 'models/interfaces/QueryObjInterfaces';
import { db } from 'app'
import CreateService from 'models/services/CreateService'


const createApi: IRouter = express.Router();

const createService = new CreateService(db.getPool());

/* 寫一個 middleware 驗證使用者 */
/* 多寫一個 model 用來檢測使用者 */


createApi.post('/createDb', async (req: Request, res: Response) => {
    try {
        /* 做 token 轉換後，未完成 */
        const userID = req.body.creatorUsername

        const params: CreateDbObj = {
            dbName : req.body.dbName,
            creatorUsername : userID,
        }
        const data = await createService.createDb(params); // true or error

        return res.status(200).json({ 'data': data });
    } catch(err) {
        return res.status(500).json({ 'error': err });
    }
});

createApi.post('/createTable', async (req: Request, res: Response) => {
    try {
        const params: CreateObj = {
            dbName : req.body.dbName,
            table : req.body.table,
            columns: req.body.columns,
        }
        const data = await createService.create(params);

        return res.status(200).json({ 'data': data });
    } catch(err) {
        return res.status(500).json({ 'error': err });
    }
});

export default createApi;