import { AuthController } from "../auth.controller";
import { AuthService } from "../../service/auth.service";
import { Request, Response } from "express";
import { HTTPSTATUS } from "../../configuration/http.config";

import { jest, describe, beforeEach, test, expect } from '@jest/globals';

jest.mock("../../service/auth.service");

describe("AuthController", () => {
  let authService: jest.Mocked<AuthService>;
  let authController: AuthController;
  let req: Partial<Request> & { sessionId?: string };
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;
  let cookieMock: jest.Mock;

  beforeEach(() => {
    authService = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController(authService);
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock, cookie: cookieMock }));
    cookieMock = jest.fn(() => ({ status: statusMock, json: jsonMock }));
    res = {
      status: statusMock,
      json: jsonMock,
      cookie: cookieMock,
    };
    req = {
      body: {},
      headers: {},
      cookies: {},
      sessionId: "session-id",
    };
  });

  test("register - success", async () => {
    const user = { id: "1", email: "test@example.com" };
    authService.register.mockResolvedValue({ user });
    req.body = { email: "test@example.com", password: "password" };

    await authController.register(req as Request, res as Response);

    expect(authService.register).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.CREATED);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User registered successfully",
      data: user,
    });
  });

  test("login - success without MFA", async () => {
    const user = { id: "1", email: "test@example.com" };
    const accessToken = "access-token";
    const refreshToken = "refresh-token";
    authService.login.mockResolvedValue({
      user,
      accessToken,
      refreshToken,
      mfaRequired: false,
    });
    req.body = { email: "test@example.com", password: "password" };
    req.headers = { "user-agent": "agent" };

    await authController.login(req as Request, res as Response);

    expect(authService.login).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User login successfully",
      mfaRequired: false,
      user,
    });
  });

  test("login - success with MFA required", async () => {
    const user = { id: "1", email: "test@example.com" };
    authService.login.mockResolvedValue({
      user,
      accessToken: null,
      refreshToken: null,
      mfaRequired: true,
    });
    req.body = { email: "test@example.com", password: "password" };
    req.headers = { "user-agent": "agent" };

    await authController.login(req as Request, res as Response);

    expect(authService.login).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Verify MFA authentication",
      mfaRequired: true,
      user,
    });
  });

  test("refreshToken - success with new refresh token", async () => {
    const accessToken = "new-access-token";
    const newRefreshToken = "new-refresh-token";
    authService.refreshToken.mockResolvedValue({
      accessToken,
      newRefreshToken,
    });
    req.cookies = { refreshToken: "old-refresh-token" };
    res.cookie = jest.fn(() => res);

    await authController.refreshToken(req as Request, res as Response);

    expect(authService.refreshToken).toHaveBeenCalledWith("old-refresh-token");
    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",
      newRefreshToken,
      expect.any(Object)
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "accessToken",
      accessToken,
      expect.any(Object)
    );
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Refresh access token successfully",
    });
  });

  test("refreshToken - missing refresh token throws UnauthorizedException", async () => {
    req.cookies = {};

    await expect(
      authController.refreshToken(req as Request, res as Response)
    ).rejects.toThrow("Missing refresh token");
  });

  test("verifyEmail - success", async () => {
    authService.verifyEmail.mockResolvedValue(undefined);
    req.body = { code: "verification-code" };

    await authController.verifyEmail(req as Request, res as Response);

    expect(authService.verifyEmail).toHaveBeenCalledWith("verification-code");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Email verified successfully",
    });
  });

  test("forgotPassword - success", async () => {
    authService.forgotPassword.mockResolvedValue(undefined);
    req.body = { email: "test@example.com" };

    await authController.forgotPassword(req as Request, res as Response);

    expect(authService.forgotPassword).toHaveBeenCalledWith("test@example.com");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Password reset email sent",
    });
  });

  test("resetPassword - success", async () => {
    authService.resetPassword.mockResolvedValue(undefined);
    req.body = { email: "test@example.com", password: "newpassword", code: "code" };
    const clearAuthenticationCookies = jest.fn(() => res);
    jest.mock("../../common/utils/cookie.util", () => ({
      clearAuthenticationCookies,
    }));

    await authController.resetPassword(req as Request, res as Response);

    expect(authService.resetPassword).toHaveBeenCalled();
    expect(clearAuthenticationCookies).toHaveBeenCalledWith(res);
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Reset Password successfully",
    });
  });

  test("logout - success", async () => {
    authService.logout.mockResolvedValue(undefined);
    req.sessionId = "session-id";

    await authController.logout(req as Request, res as Response);

    expect(authService.logout).toHaveBeenCalledWith("session-id");
    expect(statusMock).toHaveBeenCalledWith(HTTPSTATUS.OK);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User logout successfully",
    });
  });

  test("logout - missing sessionId throws NotFoundException", async () => {
    req.sessionId = undefined;

    await expect(authController.logout(req as Request, res as Response)).rejects.toThrow(
      "Session is invalid."
    );
  });
});
