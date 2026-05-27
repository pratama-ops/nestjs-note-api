import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {} //masukkan prisma service ke dalam class

  insert(dto: CreateNoteDto) { //masukkan note baru
    return this.prisma.note.create({ data: dto });
  }

  findAll() { //ambil semua note
    return this.prisma.note.findMany();
  }

  async findOne(id: number) { //ambil note by id
    const note = await this.prisma.note.findUnique({ where: { id } });
    if(!note) {
      throw new NotFoundException(`Note dengan id ${id} tidak ditemukan`);
    }
    return note;
  }

  async update(id: number, dto: UpdateNoteDto) { //edit note
    const note = await this.prisma.note.findUnique({ where: { id } });
    if(!note) {
      throw new NotFoundException(`Note dengan id ${id} gak ada bosku`);
    }
    return this.prisma.note.update({ where: { id }, data: dto });
  }

  async remove(id: number) { //hapus note
    const note = await this.prisma.note.findUnique({ where: { id } });
    if(!note) {
      throw new NotFoundException(`Gak ada bos, ngarep lu anjinq`);
    }
    return this.prisma.note.delete({ where: { id } });
  }
}