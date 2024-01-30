import * as jwt from "jsonwebtoken";
import getEnv from "./getEnv";
import { JwtPayload } from "jsonwebtoken";
import { refreshTokensRepository } from "@/db/repositories/RefreshTokensRepository";
import { ApiError } from "@/errors/ApiError";

class JwtTokensService {
  generateTokens = (userId: string) => {
    const accessToken = jwt.sign(
      { userId },
      getEnv("ACCESS_TOKEN_SECRET") as string,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      { userId },
      getEnv("REFRESH_TOKEN_SECRET") as string,
      { expiresIn: "30d" }
    );
    return { accessToken, refreshToken };
  };

  validateRefreshToken = async (token: string) => {
    return jwt.verify(token, getEnv("REFRESH_TOKEN_SECRET") as string);
  };
  validateAccessToken = async (token: string) => {
    return jwt.verify(token, getEnv("ACCESS_TOKEN_SECRET") as string);
  };
  refreshAccessToken = async (token: string) => {
    const { userId } = (await this.validateRefreshToken(token)) as JwtPayload;
    const { refreshToken: tokenFromDb } =
      await refreshTokensRepository.getRefreshToken(userId);
    if (!tokenFromDb) {
      throw ApiError.Unauthorized();
    }
    if (tokenFromDb !== token) {
      throw ApiError.Unauthorized();
    }
    const tokens = await this.generateTokens(userId);
    return tokens;
  };
}
const jwtTokensService = new JwtTokensService();
export default jwtTokensService;
