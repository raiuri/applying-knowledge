import { describe, test, expect } from 'vitest'
import { HttpPostClient } from '../../protocols/http/httpPostClient'
import { RemoteAuthentication } from './remote-authentication'

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL ', async () => {

    class HttpPostClientSpy implements HttpPostClient {
      url?: string

      async post(url: string): Promise<any> {
        this.url = url
        return Promise.resolve
      }
    }

    const url = 'any url'
    const httpPostClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClient)
    await sut.auth()

    expect(httpPostClient.url).toBe(url)
  })
})