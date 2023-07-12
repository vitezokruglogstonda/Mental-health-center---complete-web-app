import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { environment } from './environments/environment';
import * as connectRedis from 'connect-redis'
import { REDIS } from './modules/redis/redis.constants';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  let bodyParser = require('body-parser');
  let path = require("path");
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //const RedisStore = connectRedis(session);
  app.enableCors({
    credentials: true,
    origin: "http://localhost:4200"
  })
  app.use(bodyParser.json({limit: '50mb'}));
  app.useStaticAssets(path.join(__dirname, "..", '../'));
  // app.use(
  //   session({
  //     store: new RedisStore({ client: REDIS, logErrors: true }),
  //     secret: environment.session_secret,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       maxAge: 3600000,
  //     }
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
