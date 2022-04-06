import { Request, Response } from "express";
import { FinshOrderService } from '../../services/order/FinshOrderService'

class FinshOrderController {
    async handle(req: Request, res: Response) {
        const { order_id } = req.body;

        const finishOrderService = new FinshOrderService();

        const order = await finishOrderService.execute({
            order_id
        })

        return res.json(order);
    }
}

export { FinshOrderController }