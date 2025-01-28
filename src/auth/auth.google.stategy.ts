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
            scope: [
                "email",
                "profile",
                "https://www.googleapis.com/auth/calendar",
                "https://www.googleapis.com/auth/calendar.events"
            ],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        try {
            const userInfo = {
                accessToken,
                refreshToken,
                email: profile.emails[0].value,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                picture: profile.photos[0].value,
            };

            this.logger.debug('User authenticated successfully');
            this.logger.debug(`Email: ${userInfo.email}`);

            done(null, userInfo);
        } catch (error) {
            this.logger.error(`Validation error: ${error.message}`);
            done(error, null);
        }
    }
}