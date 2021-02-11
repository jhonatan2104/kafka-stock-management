import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreProvider } from './core/firestore.provider';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';

@Module({
  imports: [],
  controllers: [AppController, StockController],
  providers: [AppService, FirestoreProvider, StockService],
})
export class AppModule {}
