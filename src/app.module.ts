import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { TransitionModule } from './transition/transition.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: process.env.NEO4J_URI,
      port: 7687,
      username: process.env.NEO4J_USERNAME,
      password: process.env.NEO4J_PASSWORD,
    }),
    TransitionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
