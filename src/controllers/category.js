const { category } = require("../../models");

exports.getCategorys = async (req, res) => {
  try {
    const data = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.AddCategory = async (req, res) => {
  try {
    const data = req.body;
    await category.create(data);

    res.status(201).send({
      status: "status",
      message: "Add Category Succes",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await category.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        category: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.update(req.body, {
      where: {
        id,
      },
    });
    res.status(201).send({
      status: "success",
      message: "Update Success",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Failed",
      message: "Update fail Server Error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete Category id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
