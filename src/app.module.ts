import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppCOntroler } from './app.controller';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponível em toda aplicação
      envFilePath: '.env',
    }),
  ],
  controllers: [AppCOntroler],
  providers: [],
})
export class AppModule {}
