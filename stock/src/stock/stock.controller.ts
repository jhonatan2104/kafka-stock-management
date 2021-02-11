import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StockService } from './stock.service';

@Controller()
export class StockController {
    constructor(
        private readonly stockService: StockService
    ){}

    @MessagePattern('eventmedicine')
    async withdrawFromStock(@Payload() message) {
        console.log("Listem Message ", message)

        try {
            const body = message.value

            if(body.id_medicine && body.amount) {
                await this.stockService.withdrawFromStock(body.id_medicine, body.amount)
                console.log("Message Handled")
            } else {
                console.log("Message Refused")
            }
        } catch (e) {
            console.log(e)
        }
    }
}
