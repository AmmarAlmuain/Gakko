import request from "supertest";
import { TStudent, VStudent } from "./student.validation";
import { falsyStudents, student, updatedStudent } from "./student.data";
import { createStudent, getStudent } from "./student.logic";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
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

describe("Student endpoints: Get, Post, Put, Delete", () => {
  describe("Post /api/student", () => {
    test("Check student validation with invalid data", async () => {
      falsyStudents.forEach((student) => {
        expect(VStudent.safeParse(student)["success"]).toBe(false);
      });
    });
    test("Check student validation with valid data", () => {
      expect(VStudent.safeParse(student)["success"]).toBe(true);
    });
    test("Check createStudent function when give invalid data", async () => {
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
      expect(await createStudent(falsyStudents[3] as TStudent, supabase)).toBe(
        false
      );
      expect(supabase.from).toHaveBeenCalledWith("Students");
    });
    test("Check createStudent function when give valid data", async () => {
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
      expect(await createStudent(student, supabase)).toBe(student);
      expect(supabase.from).toHaveBeenCalledWith("Students");
    });
    test("Check the endpoint when givin invalid body", async () => {
      const response = await request(url).post("/student");
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeTruthy();
      expect(response.body.message).toBeTruthy();
    });
    test("Check the endpoint when givin valid body", async () => {
      const response = await request(url)
        .post("/student")
        .send({
          id: uuid,
          ...student,
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeTruthy();
      expect(response.body.data).toBeTruthy();
    });
  });
  describe("Get /api/student/:id", () => {
    testWithoutId("get", "/student/");
    testWithtInvalidId("get", "/student/");
    testWithValidId("get", "/student/", uuid);
  });
  describe("Put /api/student/:id", () => {
    testWithoutId("put", "/student/");
    test("Check the endpoint by sending empty body request", async () => {
      const response = await request(url).put(`/student/${uuid}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeTruthy();
    });
    test("Check the endpoint by sending body request", async () => {
      const response = await request(url)
        .put(`/student/${uuid}`)
        .send(updatedStudent);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });
  describe("Delete /api/student/:id", () => {
    testWithoutId("delete", "/student/");
    testWithtInvalidId("delete", "/student/");
    testWithValidId("delete", `/student/`, uuid);
  });
});
