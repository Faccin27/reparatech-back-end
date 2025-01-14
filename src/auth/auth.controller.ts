import { Controller, Get, HttpException, Logger, Res, UseGuards } from "@nestjs/common";
import { GoogleStrategy } from "./auth.google.stategy";
import { GoogleAuth } from "./guards/auth.google.guard";
import { Response } from "express";

@Controller("auth")
@UseGuards(GoogleAuth)
export class AuthController{
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly googleStreategy:GoogleStrategy){};

    @Get("/google/token")
    private async getOAuthAcessToken(){};

    @Get(process.env.GOOGLE_CALLBACK_URL1)
    private async callBackURL(@Res()res:Response):Promise<Response>{
        try{
            const token = await this.googleStreategy.validate();

            return res.status(202).send(token)
        } catch(err){
            this.logger.error(`${err.message}`);
            throw new HttpException({server:`${err.message}`},err.status);
        };
    };
};