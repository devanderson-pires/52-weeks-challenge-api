import { beforeEach, describe, expect, it } from "vitest"
import { RegisterUseCase } from "../register"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { UserAlreadyExistsError } from "../errors/user-already-exists-error"
import { compare } from "bcryptjs"

let usersRepository: InMemoryUsersRepository,
	sut: RegisterUseCase

describe("Register Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new RegisterUseCase(usersRepository)
	})

	it("should be able to register", async () => {
		const { user } = await sut.execute({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: "12345678"
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it("shoud generate password hash", async () => {
		const { user } = await sut.execute({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: "12345678"
		})

		const isPasswordCorrectlyHashed = await compare("12345678", user.password)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it("should not be able to register with same email", async () => {
		await sut.execute({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: "12345678"
		})

		await expect(() => sut.execute({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: "12345678"
		})).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
