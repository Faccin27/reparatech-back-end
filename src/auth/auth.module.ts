import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleAuth } from "./guards/auth.google.guard";
import { GoogleStrategy } from "./auth.google.stategy";

@Module({
    imports:[],
    controllers:[AuthController],
    providers:[AuthService,GoogleAuth,GoogleStrategy],
})
export class AuthModule{};