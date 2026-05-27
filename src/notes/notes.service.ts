import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {} //masukkan prisma service ke dalam class

  insert(dto: CreateNoteDto, userId: number) { //masukkan note baru
    return this.prisma.note.create({
      data: { ...dto, userId } //simpan userid di tabel
    });
  }

  findAll(userId: number) { //ambil semua note
    return this.prisma.note.findMany({
      where: { userId }, //hanya ambil note yang userIdnya cocok
    });
  }

  async findOne(id: number, userId: number) { //ambil note by id
    const note = await this.prisma.note.findUnique({ where: { id } });
    if(!note) {
      throw new NotFoundException(`Note dengan id ${id} tidak ditemukan`);
    }
    if(note.userId !== userId) {
      throw new NotFoundException(`Note dengan id ${id} ora enek`) //cek kepemilikan note dengan userId
    }
    return note;
  }

  async update(id: number, dto: UpdateNoteDto, userId: number) { //edit note
    const note = await this.prisma.note.findUnique({ where: { id } });
    if(!note) {
      throw new NotFoundException(`Note dengan id ${id} gak ada bosku`);
    }
    if(note.userId !== userId) {
      throw new NotFoundException(`Note dengan id ${id} tidak ditemukan`)
    }
    return this.prisma.note.update({ where: { id }, data: dto });
  }

  async remove(id: number, userId: number) { //hapus note
    const note = await this.prisma.note.findUnique({ where: { id } });
    if(!note) {
      throw new NotFoundException(`Gak ada bos, ngarep lu anjinq`);
    }
    if(note.userId !== userId) {
      throw new NotFoundException(`Gak ada anjing dibilang batu amat awmu bloq`)
    }
    return this.prisma.note.delete({ where: { id } });
  }
}