const statusMessages = {
  200: "success",
  201: "Create success",
  400: "fail",
  401: "Unauthorized",
  404: "Not found"
};

const genRespObjWithMessages =
  (messages) =>
  (code) =>
  (data = []) => {
    return {
      code,
      status: messages[code],
      data,
      count: data.length
    };
  };

const genResponseObject = genRespObjWithMessages(statusMessages);

const OK = genResponseObject(200);
const CREATED = genResponseObject(201);
const FAIL = genResponseObject(400);
const NOT_FOUND = genResponseObject(404);
const UNAUTHORIZED = genResponseObject(401);

export { OK, CREATED, FAIL, NOT_FOUND, UNAUTHORIZED };
