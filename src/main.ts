import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/src/app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  await app.listen(process.env.SERVER_PORT || 3000);
  const url = await app.getUrl();
  console.log(`server start on ${url}`);
}
bootstrap();
