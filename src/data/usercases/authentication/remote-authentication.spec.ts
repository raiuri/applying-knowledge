import { describe, test, expect } from 'vitest'
import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../../data/mocks/mock-http-client'
import { mockAuthentication } from '../../../domain/mocks/mock-authentication'
import { InvalidCredentialsError } from '../../../domain/errors/invalid-credential-error'
import { HttpStatusCode } from '../../protocols/http/http-response'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication,
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body ', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)

    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  test('Should throw IvalidCredentialError if HttpPostClietn returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthentication())
  
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})