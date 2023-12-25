import { randomUUID } from "crypto";
import request from "supertest";

const url: string = "http://localhost:3000/api";

export const testWithoutId = async (method: string, path: string) => {
  test("Check the endpoint when not givin id", async () => {
    //@ts-ignore
    const response = await request(url)[method](path);
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeTruthy();
    expect(response.body.message).toBeTruthy();
  });
};

export const testWithtInvalidId = async (method: string, path: string) => {
  test("Check the endpoint when givin valid id", async () => {
    const id = randomUUID();
    //@ts-ignore
    const response = await request(url)[method](`${path}${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.property).toEqual("SUCCESS");
    expect(response.body).toBeTruthy();
    expect(response.body.data).toEqual([]);
  });
};

export const testWithValidId = (method: string, path: string, id: string) => {
  test("Check the endpoint when givin valid id", async () => {
    //@ts-ignore
    const response = await request(url)[method](`${path}${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.property).toEqual("SUCCESS");
    expect(response.body).toBeTruthy();
    expect(response.body.data).toBeTruthy();
  });
};
