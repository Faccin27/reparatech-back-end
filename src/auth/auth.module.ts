import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleAuth } from "./guards/auth.google.guard";

@Module({
    imports:[],
    controllers:[AuthController],
    providers:[AuthService,GoogleAuth],
})
export class AuthModule{};