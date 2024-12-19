import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { SessionDto } from './dto/session.dto';
import { Session } from '@prisma/client';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Mutation(() => SessionDto)
  async createSession(@Args('userId') userId: string): Promise<Session> {
    return this.sessionService.createSession(userId);
  }

  @Query(() => [SessionDto])
  async getSessionsByUserId(@Args('userId') userId: string): Promise<Session[]> {
    return this.sessionService.getSessionsByUserId(userId);
  }

  @Mutation(() => SessionDto)
  async deleteSession(@Args('id') id: string): Promise<Session> {
    return this.sessionService.deleteSession(id);
  }
}
