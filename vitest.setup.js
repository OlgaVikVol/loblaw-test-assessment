import { server } from "./src/mocks/node.js";
import { beforeAll, afterEach, afterAll } from "vitest";
import '@testing-library/jest-dom';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
