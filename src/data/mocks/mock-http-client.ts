import { HttpPostClient, HttpPostParams } from "../protocols/http/httpPostClient"

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post(params: HttpPostParams): Promise<any> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve
  }
}