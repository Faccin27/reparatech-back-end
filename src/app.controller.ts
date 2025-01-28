import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppCOntroler{
    @Get()
    public async hello(@Res()res:Response){
        return res.status(200).json({server:"Hello"});
    }
};