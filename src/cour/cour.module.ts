import { Module } from '@nestjs/common';
import { CourService } from './cour.service';
import { CourController } from './cour.controller';
import { Cour } from './entities/cour.entity';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Cour])],
  controllers: [CourController],
  providers: [CourService],
  exports: [CourService]
})
export class CourModule {}
