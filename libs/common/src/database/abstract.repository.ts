import { NotFoundException } from '@nestjs/common';
import { PrismaService } from './PrismaServices';
import { Prisma, AbstractDocument } from '@prisma/client'; // Import your generated Prisma client

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly model: Prisma.ModelName, // This represents the Prisma model name
  ) {}

  async create(document: Omit<TDocument, 'id'>): Promise<TDocument> {
    return this.prismaService[this.model].create({
      data: document,
    });
  }

  async findOne(
    filterQuery: Prisma.AbstractDocumentWhereUniqueInput,
  ): Promise<TDocument> {
    const foundDocument = await this.prismaService[this.model].findUnique({
      where: filterQuery,
    });

    if (!foundDocument) {
      throw new NotFoundException('Document not found');
    }

    return foundDocument;
  }

  async findOneAndUpdate(
    filterQuery: Prisma.AbstractDocumentWhereUniqueInput,
    updateQuery: Prisma.AbstractDocumentUpdateInput,
  ): Promise<TDocument> {
    const updatedDocument = await this.prismaService[this.model].update({
      where: filterQuery,
      data: updateQuery,
    });

    if (!updatedDocument) {
      throw new NotFoundException('Document not found');
    }

    return updatedDocument;
  }

  async find(
    filterQuery: Prisma.AbstractDocumentWhereUniqueInput,
  ): Promise<TDocument[]> {
    return this.prismaService[this.model].findMany({
      where: filterQuery,
    });
  }

  async findOneAndDelete(
    filterQuery: Prisma.AbstractDocumentWhereUniqueInput,
  ): Promise<TDocument> {
    const deletedDocument = await this.prismaService[this.model].delete({
      where: filterQuery,
    });

    if (!deletedDocument) {
      throw new NotFoundException('Document not found');
    }

    return deletedDocument;
  }
}
