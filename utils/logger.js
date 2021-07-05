import { when, isEmpty } from "ramda";

const lazyWarn = message => () => console.warn(message);
const envVarNotSet = variableName =>
  `Environment variable ${variableName} was not set.`;

const dbPassNotSet = envVarNotSet("DB_PASS");
const dbUserNotSet = envVarNotSet("DB_USER");
const warnIfEmpty = warningMessage => {
  const warnEmpty = lazyWarn(warningMessage);
  return when(isEmpty, warnEmpty);
};

export const warnDbUserEmpty = warnIfEmpty(dbUserNotSet);
export const warnDbPassEmpty = warnIfEmpty(dbPassNotSet);
