const { product, user, category, productCategory } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = data.map((item) => {
      return {
        ...item,
        image: process.env.FILE_PATH + item.image,
      };
    });

    res.send({
      status: "success...",
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

exports.addProduct = async (req, res) => {
  try {
    const data = req.body;

    // code here
    let newProduct = await product.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
    });

    newProduct = JSON.parse(JSON.stringify(newProduct));

    newProduct = {
      ...newProduct,
      image: process.env.FILE_PATH + newProduct.image,
    };

    // code here
    res.send({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await product.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
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

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    let replaceImage = products.image.replace(process.env.url, "");
    fs.unlink(`./uploads/${replaceImage}`, (error) => {
      if (error) {
        throw error;
      }
    });
    await product.update(
      {
        ...req.body,
        image: process.env.url + req.file.filename,
        idUser: req.user.id,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.status(201).json({
      status: "succes",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      error: "server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
