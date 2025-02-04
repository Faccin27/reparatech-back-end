import { Body, Controller, Get, HttpException, Logger, Post, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleStrategy } from "./auth.google.stategy";
import { GoogleAuth } from "./guards/auth.google.guard";
import { Response } from "express";
import axios from "axios";

@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private readonly googleStrategy: GoogleStrategy) {}

    @Get("/google")
    @UseGuards(GoogleAuth)
    async googleAuth() {
        // This route will be handled by Passport
    }

    @Get("/google/callback")
    @UseGuards(GoogleAuth)
    private async callBackURL(@Res() res: Response, @Req() req) {
        try {
            const user = req.user;
            // Pegando apenas o access_token do usuário
            const token = user.accessToken;
            
            const html = `
                <!DOCTYPE html>
                <html>
                <body>
                    <script>
                        window.opener.postMessage(
                            { type: 'AUTH_SUCCESS', token: '${token}' }, 
                            'https://reparatech-3x56.vercel.app'
                        );
                        window.close();
                    </script>
                </body>
                </html>
            `;
            
            res.send(html);
        } catch (err) {
            this.logger.error(`Callback error: ${err.message}`);
            throw new HttpException({ server: `${err.message}` }, err.status || 500);
        }
    }

    @Post('/create-event')
    async createEvent(@Body() body: any, @Res() res: Response) {
        try {
            const { token, summary, description, startDateTime, endDateTime } = body;

            if (!token) {
                throw new HttpException('Token não fornecido', 401);
            }

            const calendarId = '67d70082a9e2eddf52395ab6317f2ff89194d183075f8fab355754e9691e9e6b@group.calendar.google.com';

            try {
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
                    }
                );

                return res.status(201).json(response.data);
            } catch (axiosError) {
                this.logger.error(`Google Calendar API error: ${axiosError.message}`);
                if (axiosError.response?.status === 401) {
                    throw new HttpException('Token de autenticação expirado ou inválido', 401);
                }
                throw new HttpException(
                    axiosError.response?.data?.error?.message || 'Erro ao criar evento no Google Calendar',
                    axiosError.response?.status || 500
                );
            }
        } catch (err) {
            this.logger.error(`Create event error: ${err.message}`);
            throw new HttpException(
                err.response?.message || err.message || 'Erro ao criar evento',
                err.status || 500
            );
        }
    }
}