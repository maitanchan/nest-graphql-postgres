import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BooksModule } from './books/books.module';

@Module({

  imports: [

    GraphQLModule.forRoot<ApolloDriverConfig>({

      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    }),

    TypeOrmModule.forRoot({

      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '20d191080',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true

    }),

    BooksModule

  ],

})
export class AppModule { }
