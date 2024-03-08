import { EnvVariables } from "@/constants/envs";

const getEnv = (envName: EnvVariables) => {
  return process.env[envName] as string;
};
export default getEnv;
