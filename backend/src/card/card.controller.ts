import { FastifyReply } from 'fastify';
import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { SearchService } from '../search/search.service';

@Controller('/api/card')
export class CardController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/:cardId/sources')
  async getSources(@Res() response: FastifyReply, @Param('cardId', ParseIntPipe) cardId: number): Promise<void> {
    const result = await this.searchService.searchSources(cardId, { filterUserView: true });
    response.status(HttpStatus.OK).send(result);
  }

  @Get('/:cardId/source/:sourceId')
  async getSourceDetails(
    @Res() response: FastifyReply,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('sourceId', ParseIntPipe) sourceId: number,
  ): Promise<void> {
    const items = await this.searchService.searchSourceById(cardId, sourceId, { filterUserView: true });
    response.status(HttpStatus.OK).send({ items });
  }

  @Post('/:cardId/source/:sourceId')
  async postSourceDetails(
    @Res() response: FastifyReply,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('sourceId', ParseIntPipe) sourceId: number,
    @Body('fileIds') fileIds: number[],
  ): Promise<void> {
    await this.searchService.addSourcesToDownloadQueue(cardId, sourceId, fileIds);
    response.status(HttpStatus.OK).send();
  }
}
