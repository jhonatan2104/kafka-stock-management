import { Injectable } from "@nestjs/common";
import { FirestoreProvider } from "src/core/firestore.provider";

@Injectable()
export class StockService {
    constructor(
        private provider: FirestoreProvider
    ){}

    public async withdrawFromStock(idMedicine: string, amount: number): Promise<void> {
        try {
            const medicineStockRef = this.provider.db.collection('stock').doc(idMedicine)
            const increment = this.provider.incrementFieldValue(amount*-1)

            await medicineStockRef.update({
                amount: increment
            })

        } catch (error) {
            throw new Error('Database Erro' + error)
        }
    }
}