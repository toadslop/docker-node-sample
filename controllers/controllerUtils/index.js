import { pipe, otherwise, andThen } from "ramda";
import { OK, CREATED, FAIL } from "./responses.js";

const find = (Model) => async () => {
  const results = await Model.find();
  return OK(results);
};

const after = (crudFunc) => (afterFunc) => {
  return (data) => {
    const result = crudFunc(data);
    return afterFunc(result);
  };
};

const findOne = (Model) => async (data) => {
  const result = await Model.findOne(data);
  return OK(result);
};

const findById = (Model) => async (id) => {
  const results = await Model.findById(id);
  return OK(results);
};

const createEntity = (Model) => async (body) => {
  const results = await Model.create(body);
  return CREATED(results);
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
  findOne,
  findById,
  error,
  returnResObj,
  tryCrud,
  createEntity,
  findByIdAndUpdate,
  findByIdAndDelete,
  after
};
