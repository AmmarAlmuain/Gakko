import { createClient } from "@supabase/supabase-js";
import { falsyTeachers, teacher, updatedTeacher } from "./teacher.data";
import { createTeacher } from "./teacher.logic";
import { TTeacher, VTeacher } from "./teacher.validation";
import "dotenv/config";
import request from "supertest";
import {
  testWithoutId,
  testWithtInvalidId,
  testWithValidId,
} from "../../test.fragment";
import { v4 as uuidv4 } from "uuid";

const url: string = "http://localhost:3000/api";
const uuid = uuidv4();

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

describe("Teacher endpoints: Get, Post, Put, Delete", () => {
  describe("Post /api/teacher", () => {
    test("Check teacher validation with invalid data", () => {
      falsyTeachers.forEach((teacher) => {
        expect(VTeacher.safeParse(teacher)["success"]).toBe(false);
      });
    });
    test("Check teacher validation with invalid data", () => {
      expect(VTeacher.safeParse(teacher)["success"]).toBe(true);
    });
    test("Check createTeacher function when give invalid data", async () => {
      supabase.from = jest.fn().mockImplementation((collection) => {
        return {
          insert: jest.fn().mockImplementation((student) => {
            return {
              select: jest.fn().mockImplementation(() => {
                return Promise.resolve({
                  data: null,
                  error: new Error("Insert failed!"),
                });
              }),
            };
          }),
        };
      });
      expect(await createTeacher(falsyTeachers[3] as TTeacher, supabase)).toBe(
        false
      );
      expect(supabase.from).toHaveBeenCalledWith("Teachers");
    });
    test("Check createTeacher function when give valid data", async () => {
      supabase.from = jest.fn().mockImplementation((collection) => {
        return {
          insert: jest.fn().mockImplementation((student) => {
            return {
              select: jest.fn().mockImplementation(() => {
                return Promise.resolve({
                  data: student,
                  error: null,
                });
              }),
            };
          }),
        };
      });
      expect(await createTeacher(teacher, supabase)).toBe(teacher);
      expect(supabase.from).toHaveBeenCalledWith("Teachers");
    });
    test("Check the endpoint with invalid request body", async () => {
      const response = await request(url).post("/teacher/");
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeTruthy();
      expect(response.body.message).toBeTruthy();
    });
    test("Check the endpoint with valid request body", async () => {
      const response = await request(url)
        .post("/teacher/")
        .send({
          id: uuid,
          ...teacher,
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeTruthy();
      expect(response.body.data).toBeTruthy();
    });
  });
  describe("Get /api/teacher/:id", () => {
    testWithoutId("get", "/teacher/");
    testWithtInvalidId("get", "/teacher/");
    testWithValidId("get", "/teacher/", uuid);
  });
  describe("Put /api/teacher/:id", () => {
    testWithoutId("put", "/teacher/");
    test("Check the endpoint by sending empty body request", async () => {
      const response = await request(url).put(`/teacher/${uuid}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeTruthy();
    });
    test("Check the endpoint by sending body request", async () => {
      const response = await request(url)
        .put(`/teacher/${uuid}`)
        .send(updatedTeacher);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });
  describe("Delete /api/student/:id", () => {
    testWithoutId("delete", "/teacher/");
    testWithtInvalidId("delete", "/teacher/");
    testWithValidId("delete", `/teacher/`, uuid);
  });
});
