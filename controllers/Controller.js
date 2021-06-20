class Controller {
  constructor(Model) {
    this._model = Model;
  }

  static query = async callback => {
    try {
      const entities = await callback();
      res.status(200).json({
        status: "success",
        results: entities.length,
        data: {
          entities,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "fail",
      });
    }
  };

  index = async (req, res, next) => {
    try {
      const entities = await this._model.find();
      res.status(200).json({
        status: "success",
        results: entities.length,
        data: {
          entities,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "fail",
      });
    }
  };
}
