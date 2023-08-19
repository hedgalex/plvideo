import { FastifyReply } from 'fastify';
import { Controller, Get, HttpStatus, Param, ParseIntPipe, Res } from '@nestjs/common';
import { SearchService } from '../search/search.service';

@Controller('/api/card')
export class CardController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/:cardId/sources')
  async getSources(@Res() response: FastifyReply, @Param('cardId', ParseIntPipe) cardId: number): Promise<void> {
    const result = await this.searchService.searchSources(cardId);
    response.status(HttpStatus.OK).send(result);
    return;
  }
}
