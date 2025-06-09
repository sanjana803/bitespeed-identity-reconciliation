import { PrismaClient } from '@prisma/client';

class ContactStore {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findContacts(email?: string, phoneNumber?: string) {
    return this.prisma.contact.findMany({
      where: {
        OR: [
          { email: email || undefined },
          { phoneNumber: phoneNumber || undefined }
        ],
        deletedAt: null
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async findContactsByIds(ids: number[]) {
    return this.prisma.contact.findMany({
      where: {
        id: { in: ids },
        deletedAt: null
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async findRelatedContacts(current: any) {
    return this.prisma.contact.findMany({
      where: {
        OR: [
          { email: current.email || undefined },
          { phoneNumber: current.phoneNumber || undefined },
          { linkedId: current.id },
          { id: current.linkedId || undefined }
        ],
        deletedAt: null
      }
    });
  }

  async createContact(data: any) {
    return this.prisma.contact.create({ data });
  }

  async updateContact(id: number, data: any) {
    return this.prisma.contact.update({ where: { id }, data });
  }
}

export const contactStore = new ContactStore();
