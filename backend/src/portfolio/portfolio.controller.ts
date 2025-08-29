import { Controller, Post, Put, Get, Body, Param, Query } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) { }

  @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get('project')
  getProjects() {
    return this.portfolioService.findByType('project');
  }

  @Get('experience')
  getExperience() {
    return this.portfolioService.findByType('experience');
  }

  @Get('personal')
  getPersonal() {
    return this.portfolioService.findByType('personal');
  }

  @Get('skill')
  getSkills() {
    return this.portfolioService.findByType('skill');
  }

  @Get('faq')
  getFaq() {
    return this.portfolioService.findByType('faq');
  }

  // @Get('search')
  // vectorSearch(@Query('q') query: string, @Query('limit') limit?: number) {
  //   return this.portfolioService.vectorSearch(query, limit ? parseInt(limit) : 5);
  // }
}