import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Page } from './entities/page.entity';
import { HelpCallDto } from './models/help-call.model';
import { QuoteDto } from './models/quote.model';
import { OperatorService } from './modules/operator/operator.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    //private readonly operatorService: OperatorService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("fillData")
  async enterTestData(): Promise<string>{
    await this.appService.fillDatabase();
    return "Data entered successfuly";
  }

  @Get("get-sidenav-items")
  async getAllPages(): Promise<Page[]>{
    return await this.appService.getPages();
  }

  @Get("user-quotes")
  async getQuotes(): Promise<QuoteDto[]>{
    return await this.appService.getQuotes();
  }

  // @Post("help-call-request")
  // async requestHelpCall(@Body() request: HelpCallDto): Promise<boolean>{
  //   return await this.operatorService.requestHelpCall(request);
  // }
}
