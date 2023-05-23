import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { AuthenticateUseCase } from "../authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"

let usersRepository: InMemoryUsersRepository,
	sut: AuthenticateUseCase

describe("Authenticate Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	it("should be able to authenticate", async () => {
		await usersRepository.create({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: await hash("12345678", 6)
		})

		const { user } = await sut.execute({
			email: "contato@devanderson.tech",
			password: "12345678"
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it("should not be able to authenticate with wrong email", async () => {
		await expect(() => sut.execute({
			email: "contato@devanderson.tech",
			password: "12345678"
		})).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it("should not be able to authenticate with wrong password", async () => {
		await usersRepository.create({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: await hash("12345678", 6)
		})

		await expect(() => sut.execute({
			email: "contato@devanderson.tech",
			password: "123"
		})).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
