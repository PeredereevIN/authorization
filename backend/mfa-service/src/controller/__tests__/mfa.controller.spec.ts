import { MfaController } from "../mfa.controller";
import { MfaService } from "../../service/mfa.service";
import { Request, Response } from "express";
import { HTTPSTATUS } from "../../configuration/http.config";

import { jest, describe, beforeEach, test, expect } from '@jest/globals';

jest.mock("../../service/mfa.service");

describe("MfaController", () => {
  let mfaService: jest.Mocked<MfaService>;
  let mfaController: MfaController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    mfaService = new MfaService() as jest.Mocked<MfaService>;
    mfaController = new MfaController(mfaService);
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    res = {
      status: statusMock,
      json: jsonMock,
    };
    req = {
      body: {},
      headers: {},
    };
  });

  test("generateMFASetup - success", async () => {
    const result = { secret: "secret", qrImageUrl: "url", message: "Setup generated" };
    mfaService.generateMFASetup.mockResolvedValue(result);

    await mfaController.generateMFASetup(req as Request, res as Response);

    expect(mfaService.generateMFASetup).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith(result);
  });

  test("verifyMFASetup - success", async () => {
    const userPreferences = { mfaEnabled: true };
    const message = "MFA verified";
    mfaService.verifyMFASetup.mockResolvedValue({ userPreferences, message });
    req.body = { code: "123456", secretKey: "secret" };

    await mfaController.verifyMFASetup(req as Request, res as Response);

    expect(mfaService.verifyMFASetup).toHaveBeenCalledWith(req, "123456", "secret");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({ message, userPreferences });
  });

  test("revokeMFA - success", async () => {
    const userPreferences = { mfaEnabled: false };
    const message = "MFA revoked";
    mfaService.revokeMFA.mockResolvedValue({ message, userPreferences });

    await mfaController.revokeMFA(req as Request, res as Response);

    expect(mfaService.revokeMFA).toHaveBeenCalledWith(req);
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({ message, userPreferences });
  });

  test("verifyMFAForLogin - success", async () => {
    const accessToken = "access-token";
    const refreshToken = "refresh-token";
    const user = { id: "1", email: "test@example.com" };
    mfaService.verifyMFAForLogin.mockResolvedValue({ accessToken, refreshToken, user });
    req.body = { code: "123456", email: "test@example.com" };
    req.headers = { "user-agent": "agent" };
    res.cookie = jest.fn(() => res);
    res.status = jest.fn(() => res);
    res.json = jest.fn();

    await mfaController.verifyMFAForLogin(req as Request, res as Response);

    expect(mfaService.verifyMFAForLogin).toHaveBeenCalledWith("123456", "test@example.com", "agent");
    expect(res.cookie).toHaveBeenCalledWith("accessToken", accessToken, expect.any(Object));
    expect(res.cookie).toHaveBeenCalledWith("refreshToken", refreshToken, expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: "Verified & login successfully",
      user,
    });
  });
});
