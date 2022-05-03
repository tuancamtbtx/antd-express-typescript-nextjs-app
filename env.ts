import { envs } from './env.config';

const envGlobal = (): ENVIRONMENT | NodeJS.ProcessEnv => {
  return process.browser ? window.__ENV__ : process.env;
};

export type ENV = {
  [key: string]: string;
};

export default envGlobal;

export const createEnvsFromList = (): ENV => {
  const env = {};
  envs.forEach((envKey) => {
    env[envKey] = envGlobal()[envKey];
  });
  return env;
};
