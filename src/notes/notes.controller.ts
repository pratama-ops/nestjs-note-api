import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  insert(@Body() createNoteDto: CreateNoteDto, @Req() req: any) {
    //req.user.userId = id user yang sedang login dan @Request = cara controller tau siapa yg login dari JWT token yg dikirim user
    return this.notesService.insert(createNoteDto, req.user.userId); //handle POST /notes lalu teruskan ke service
  }

  @Get()
  findAll(@Req() req: any) {
    return this.notesService.findAll(req.user.userId); //handle GET /notes lalu teruskan ke service
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.notesService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req: any) {
    return this.notesService.update(+id, updateNoteDto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.notesService.remove(+id, req.user.userId);
  }
}