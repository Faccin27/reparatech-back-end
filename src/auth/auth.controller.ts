import { Controller, Get, HttpException, Logger, Req, Res, UseGuards } from "@nestjs/common";
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

    //@Get("/google/callback")
    //private async callBackURL(@Res()res:Response,@Req()req):Promise<Response>{
    //    try{
    //        const user = req.user;
//
    //        return res.status(202).send(user);
    //    } catch(err){
    //        this.logger.error(`${err.message}`);
    //        throw new HttpException({server:`${err.message}`},err.status);
    //    };
    //};
};