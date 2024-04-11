import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourService } from './cour.service';
import { CreateCourDto } from './dto/create-cour.dto';
import { UpdateCourDto } from './dto/update-cour.dto';

@Controller('cour')
export class CourController {
  constructor(private readonly courService: CourService) {}

  @Post()
  create(@Body() createCourDto: CreateCourDto) {
    return this.courService.create(createCourDto);
  }

  @Get()
  findAll() {
    return this.courService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courService.findOne(id);
  }

  @Get('day/:day')
  findOneByDay(@Param('day') day: number) {
    return this.courService.findOneByDay(day);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCourDto: UpdateCourDto) {
    return this.courService.update(id, updateCourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.courService.remove(id);
  }
}
