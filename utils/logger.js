import { when, isEmpty } from "ramda";
// eslint-disable-next-line no-unused-vars
const logWarning = message => variable => console.warn(message);
const envVarNotSet = variableName =>
  `Environment variable ${variableName} was not set.`;

const dbPassNotSet = envVarNotSet("DB_PASS");
const dbUserNotSet = envVarNotSet("DB_USER");
const warnIfEmpty = warningMessage => {
  const tapWarnEmpty = logWarning(warningMessage);
  return when(isEmpty, tapWarnEmpty);
};

export const warnDbUserEmpty = warnIfEmpty(dbUserNotSet);
export const warnDbPassEmpty = warnIfEmpty(dbPassNotSet);
