import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function getServerSideProps() {
  // run on the server
  const posts = await prisma.post.findMany({
      orderBy: {
          createdAt: 'asc',
      }
  })
  return {
    props: {
      posts : JSON.parse(JSON.stringify(posts)),
    },
  }
};