import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
	result: {
		forumUser: {
			name: {
				needs: {},
				async compute(forumUser) {
					const [result] =
						(await prisma.$queryRaw`SELECT * FROM auth.users WHERE id::text = ${forumUser.userId} LIMIT 1`) as Array<any>;

					if (!result) {
						return null;
					}

					return result;
				}
			}
		}
	}
});

const res = await prisma.forumUser.findFirst({});

console.log(await res?.name);

prisma.$disconnect();
