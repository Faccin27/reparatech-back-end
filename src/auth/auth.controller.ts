import { Body, Controller, Get, HttpException, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleStrategy } from "./auth.google.stategy";
import { GoogleAuth } from "./guards/auth.google.guard";
import { Response } from "express";
import axios from "axios";

@Controller("auth")
@UseGuards(GoogleAuth)
export class AuthController{
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly googleStreategy:GoogleStrategy){};

    @Get("/google/token")
    private async getOAuthAcessToken(){};

    @Get("/google/callback")
    private async callBackURL(@Res()res:Response,@Req()req){
        try{
            const user = req.user;

            res.redirect(`http://localhost:3000?token=${JSON.stringify(user)}`);
            return res.status(202).send(user);
        } catch(err){
            this.logger.error(`${err.message}`);
            throw new HttpException({server:`${err.message}`},err.status);
        };
    };

    @Post('/create-event')
    async createEvent(@Res()res:Response,@Body() body: any) {
      try {
        const { token, summary, description, startDateTime, endDateTime } = body;
  
        const calendarId = 'd336a0ad3c2bc7f36bf2b71d83cc43cc61b1569491af18379989fa2b4979f297@group.calendar.google.com'; 
  
        const response = await axios.post(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
          {
            summary,
            description,
            start: { dateTime: startDateTime },
            end: { dateTime: endDateTime },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
  
        return res.status(201).send(response.data); 
      } catch (err) {
        this.logger.error(`Erro ao criar evento: ${err.message}`);
        throw new HttpException(err.response?.data || 'Erro ao criar evento', err.response?.status || 500);
      };
    };
};