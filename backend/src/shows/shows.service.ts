import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shows } from '../entities/shows';
import { Repository } from 'typeorm';
import { Episodes } from '../entities/episodes';

@Injectable()
export class ShowsService {
  constructor(
    @InjectRepository(Shows)
    private showsRepository: Repository<Shows>,
    @InjectRepository(Episodes)
    private episodesRepository: Repository<Episodes>,
  ) {}
}
