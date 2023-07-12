import { Body, Controller, Get, Inject, Put, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { HelpCall } from 'src/entities/help-call.entity';
import { UserType } from 'src/enums/user-type.enum';
import { HelpCallDto } from 'src/models/help-call.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { OperatorService } from './operator.service';

@Controller('operator')
export class OperatorController {
    constructor(private readonly operatorService: OperatorService) { }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.CallOperator)
    @Get("help-calls")
    async getCallList(): Promise<HelpCall[]>{
        return await this.operatorService.getCallList();
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.CallOperator)
    @Put("done")
    async callDone(@Body() call: {id: number}): Promise<number>{
        return await this.operatorService.callDone(call.id);
    }
}
