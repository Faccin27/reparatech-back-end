import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    private readonly logger = new Logger(GoogleStrategy.name);

    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
        });
    }

    private async validate(accessToken?: string, refreshToken?: string, profile?: any, done?: VerifyCallback): Promise<any> {
        const userInfo = {
            token: accessToken,
        };

        this.logger.debug(userInfo);

        done(null, userInfo);
    }
}
