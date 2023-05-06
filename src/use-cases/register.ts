import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

interface RegisterUseCaseResponse {
	user: User
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute(data: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const hasUser = await this.usersRepository.findByEmail(data.email)

		if (hasUser) throw new UserAlreadyExistsError()

		data.password = await hash(data.password, 6)
		const user = await this.usersRepository.create({
			name: data.name,
			email: data.email,
			password: data.password
		})

		return { user }
	}
}
