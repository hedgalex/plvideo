import { Controller, Get, Param, ParseEnumPipe } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { EResource } from '~shared/.consts';

@Controller('/api/list')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get('/:type')
  async getDetails(@Param('type', new ParseEnumPipe(EResource)) type: EResource): Promise<void> {
    console.info(type);
    return;
  }
}
