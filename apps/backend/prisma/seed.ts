import { faker } from '@faker-js/faker';
import { PrismaClient } from '../src/generated/prisma/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as process from 'node:process';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pgDriver = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter: pgDriver });

async function main(): Promise<void> {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const userIds = [];

  /// Create 20 users
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        authSchId: faker.string.uuid(),
        email: faker.internet.email(),
        username: faker.internet.username(),
      },
    });

    userIds.push(user.authSchId);
  }

  const postIds = [];

  /// Create 3 posts for each user
  for (const userId of userIds) {
    for (let i = 1; i <= 3; i++) {
      const post = await prisma.post.create({
        data: {
          postId: faker.number.int({ max: 2147483647 }),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
          visible: true,
          authorId: userId,
        },
      });

      postIds.push(post.postId);
    }
  }

  /// Create 2 comments for each post
  for (const postId of postIds) {
    for (let i = 1; i <= 2; i++) {
      await prisma.comment.create({
        data: {
          commentId: faker.number.int({ max: 2147483647 }),
          content: faker.lorem.sentence(),
          postId: postId,
          authorId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
        },
      });
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
