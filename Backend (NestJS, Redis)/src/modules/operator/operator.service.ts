import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelpCall } from 'src/entities/help-call.entity';
import { HelpCallDto } from 'src/models/help-call.model';
import { Repository } from 'typeorm';

@Injectable()
export class OperatorService {
    constructor(@InjectRepository(HelpCall) private helpCallRepo: Repository<HelpCall>){}

    async getCallList(): Promise<HelpCall[]>{
        return await this.helpCallRepo.createQueryBuilder("help_call")
            .where("help_call.processed = :status" , {status: false})
            .getMany();
    }

    async callDone(id: number): Promise<number>{
        let call: HelpCall = await this.helpCallRepo.createQueryBuilder("help_call")
            .where("help_call.id = :id", {id: id})
            .getOne();
        call.processed = true;
        await this.helpCallRepo.save(call);
        return id;
    }

    async requestHelpCall(name: string, phone: string): Promise<HelpCall | undefined>{
        let hcRequest: HelpCall = await this.helpCallRepo.createQueryBuilder("help_call")
          .where("help_call.guestPhoneNumber = :phone", { phone: phone })
          .andWhere("help_call.processed = :status", { status: false })
          .getOne();
        if(hcRequest){
          return undefined;
        }else{
          let newHelpCall: HelpCall = this.helpCallRepo.create({
            guestName: name,
            guestPhoneNumber: phone,
            processed: false
          });
          await this.helpCallRepo.save(newHelpCall);
          return newHelpCall;
        }
      }
}
