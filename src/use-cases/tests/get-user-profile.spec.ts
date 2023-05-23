import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { GetUserProfileUseCase } from "../get-user-profile"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

let usersRepository: InMemoryUsersRepository,
	sut: GetUserProfileUseCase

describe("Get User Profile Use Case", () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileUseCase(usersRepository)
	})

	it("should be able to get user profile", async () => {
		const { id } = await usersRepository.create({
			name: "Anderson",
			email: "contato@devanderson.tech",
			password: "12345678"
		})

		const { user } = await sut.execute({ userId: id })

		expect(user.id).toEqual(expect.any(String))
		expect(user.name).toEqual("Anderson")
	})

	it("should not be able to get user profile with wrong id", async () => {
		await expect(() => sut.execute({
			userId: "non-existing-id"
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
