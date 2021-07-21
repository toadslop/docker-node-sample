import { pipe, otherwise, andThen } from "ramda";

const statusMessages = { 200: "success", 201: "Create success", 400: "fail" };

const genRespObjWithMessages = (messages) => (code) => (data) => {
  return {
    code,
    status: messages[code],
    data,
    count: data.length
  };
};

const genResponseObject = genRespObjWithMessages(statusMessages);

const OK = genResponseObject(200);
const FAIL = genResponseObject(400);

const find = (Model) => async () => {
  const results = await Model.find();
  return OK(results);
};

const findById = (Model) => async (id) => {
  const results = await Model.findById(id);
  return OK(results);
};

const createEntity = (Model) => async (body) => {
  const results = await Model.create(body);
  return OK(results);
};

const findByIdAndUpdate = (Model) => async (id, body) => {
  const results = await Model.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });
  return OK(results);
};

const findByIdAndDelete = (Model) => async (id) => {
  const results = await Model.findByIdAndDelete(id);
  return OK(results);
};

const error = () => FAIL([]);

const returnResObj = (resObj) => resObj;

const tryCrud = (crudFunc) =>
  pipe(crudFunc, otherwise(error), andThen(returnResObj));

export {
  find,
  findById,
  error,
  returnResObj,
  tryCrud,
  createEntity,
  findByIdAndUpdate,
  findByIdAndDelete
};
