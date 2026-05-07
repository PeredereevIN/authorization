import { SessionController } from "../session.controller";
import { SessionService } from "../../service/session.service";
import { Request, Response } from "express";
import { HTTPSTATUS } from "../../configuration/http.config";

import { jest, describe, beforeEach, test, expect } from '@jest/globals';

jest.mock("../../service/session.service");

describe("SessionController", () => {
  let sessionService: jest.Mocked<SessionService>;
  let sessionController: SessionController;
  let req: Partial<Request> & { sessionId?: string; user?: { id: string } };
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    sessionService = new SessionService() as jest.Mocked<SessionService>;
    sessionController = new SessionController(sessionService);
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    res = {
      status: statusMock,
      json: jsonMock,
    };
    req = {
      params: {},
      user: { id: "user-id" },
      sessionId: "session-id",
    };
  });

  test("getAllSession - success", async () => {
    const sessions = [
      { id: "session1", toObject: () => ({ id: "session1" }) },
      { id: "session2", toObject: () => ({ id: "session2" }) },
    ];
    sessionService.getAllSession.mockResolvedValue({ sessions });

    await sessionController.getAllSession(req as Request, res as Response);

    expect(sessionService.getAllSession).toHaveBeenCalledWith("user-id");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Retrieved all session successfully",
      sessions: [
        { id: "session1" },
        { id: "session2", isCurrent: true },
      ],
    });
  });

  test("getSession - success", async () => {
    const user = { id: "user-id", email: "test@example.com" };
    sessionService.getSessionById.mockResolvedValue({ user });

    await sessionController.getSession(req as Request, res as Response);

    expect(sessionService.getSessionById).toHaveBeenCalledWith("session-id");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Session retrieved successfully",
      user,
    });
  });

  test("getSession - missing sessionId throws NotFoundException", async () => {
    req.sessionId = undefined;

    await expect(sessionController.getSession(req as Request, res as Response)).rejects.toThrow(
      "Session ID not found. Please log in."
    );
  });

  test("deleteSession - success", async () => {
    req.params = { id: "session-id" };
    await sessionController.deleteSession(req as Request, res as Response);

    expect(sessionService.deleteSession).toHaveBeenCalledWith("session-id", "user-id");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Session remove successfully",
    });
  });
});
