import { Prisma } from "@prisma/client"
import { UsersRepository } from "../users-repository"
import { prisma } from "lib/prisma"

export class PrismaUsersRepository implements UsersRepository {
	async create(data: Prisma.UserCreateInput) {
		return await prisma.user.create({ data })
	}

	async findByEmail(email: string) {
		return await prisma.user.findUnique({ where: { email } })
	}

	async findById(id: string) {
		return await prisma.user.findUnique({ where: { id } })
	}
}
