import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {

    const gqlHost = GqlArgumentsHost.create(host);
    const { req } = gqlHost.getContext();

    const errorResponse = exception.getResponse() as {
      message?: string | string[];
    };
    const message =
      Array.isArray(errorResponse.message)
        ? errorResponse.message.join(', ')
        : errorResponse.message || exception.message;

    return new ApolloError(message, exception.getStatus().toString());
  }
}
