import { HttpException } from "@nestjs/common";

export class Functions{

    createResponse(msg:string,description:string,status:number){
        throw new HttpException({msg,description},status);
      }
}