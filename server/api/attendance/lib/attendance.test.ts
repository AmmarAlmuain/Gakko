import { createClient } from "@supabase/supabase-js";
import {
  attendance,
  falsyAttendances,
  updatedAttendance,
} from "./attendance.data";
import { TAttendance, VAttendance } from "./attendance.validation";
import { createAttendance } from "./attendance.logic";
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

describe("Attendance endpoints: Get, Post, Put, Delete", () => {
  describe("Post /api/attendance", () => {
    test("Check attendance validation with invalid data", () => {
      falsyAttendances.forEach((attendance: TAttendance) => {
        expect(VAttendance.safeParse(attendance)["success"]).toBe(false);
      });
    });
    test("Check attendance validation with invalid data", () => {
      expect(VAttendance.safeParse(attendance)["success"]).toBe(true);
    });
    test("Check createAttendance function when give invalid data", async () => {
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
      expect(
        await createAttendance(falsyAttendances[3] as TAttendance, supabase)
      ).toBe(false);
      expect(supabase.from).toHaveBeenCalledWith("Attendances");
    });
    test("Check createAttendance function when give valid data", async () => {
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
      expect(await createAttendance(attendance, supabase)).toBe(attendance);
      expect(supabase.from).toHaveBeenCalledWith("Attendances");
    });
    test("Check the endpoint with invalid request body", async () => {
      const response = await request(url).post("/attendance/");
      expect(response.statusCode).toBe(400);
      expect(response.body).toBeTruthy();
      expect(response.body.message).toBeTruthy();
    });
    test("Check the endpoint with valid request body", async () => {
      attendance["studentId"] = "e56e5d36-2b0c-4615-a16f-efdf53c5f48a";
      const response = await request(url)
        .post("/attendance/")
        .send({
          id: uuid,
          ...attendance,
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toBeTruthy();
      expect(response.body.data).toBeTruthy();
    });
  });
  describe("Get /api/teacher/:id", () => {
    testWithoutId("get", "/attendance/");
    testWithtInvalidId("get", "/attendance/");
    testWithValidId(
      "get",
      "/attendance/",
      "e56e5d36-2b0c-4615-a16f-efdf53c5f48a"
    );
  });
  describe("Put /api/attendance/:id", () => {
    testWithoutId("put", "/attendance/");
    test("Check the endpoint by sending empty body request", async () => {
      const response = await request(url).put(`/attendance/${uuid}`);
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBeTruthy();
    });
    test("Check the endpoint by sending body request", async () => {
      const response = await request(url)
        .put(`/attendance/e56e5d36-2b0c-4615-a16f-efdf53c5f48a`)
        .send(updatedAttendance);
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });
  describe("Delete /api/attendance/:id", () => {
    testWithoutId("delete", "/attendance/");
    testWithtInvalidId("delete", "/attendance/");
    testWithValidId("delete", `/attendance/`, uuid);
  });
});
