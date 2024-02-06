import { React, useState } from "react";
import Axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Table from "./Table";
import Swal from "sweetalert2";

const Form = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState();

  const [products, setProducts] = useState([]);

  const [edit, setEdit] = useState(false);

  // Agregar elementos del form a la db

  const add = (e) => {
    e.preventDefault();
    Axios.post(
      "http://localhost:3001/create",
      {
        category: category,
        name: name,
        description: description,
        price: price,
      },
      {
        timeout: 5000,
      }
    )
      .then(() => {
        // Luego de guardar la informacion, la renderizamos en pantalla automaticamente
        getProducts();
        cleanInputs();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `<strong>${name}</strong> agregado`,
          showConfirmButton: true,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error al registrar el producto");
      });
  };

  // Actualizar producto

  const update = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update", {
      id: id,
      category: category,
      name: name,
      description: description,
      price: price,
    }).then(() => {
      // Luego de guardar la informacion, la renderizamos en pantalla automaticamente
      getProducts();
      cleanInputs();
      Swal.fire({
          position: "center",
          icon: "success",
          title: `<strong>${name}</strong> actualizado`,
          showConfirmButton: true,
          timer: 3000,
        });
    });
  };

  // Editar producto

  const editProduct = (product) => {
    setEdit(true);

    setCategory(product.category);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setId(product.id);
  };

  // Traer elementos ya guardados en la db para renderizarlos

  const getProducts = () => {
    Axios.get("http://localhost:3001/productos").then((response) => {
      setProducts(response.data);
    });
  };

  getProducts();

  // Limpiar inputs

  const cleanInputs = () => {
    setCategory("");
    setName("");
    setDescription("");
    setPrice("");
    setId("");
    setEdit(false);
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      // Luego de guardar la informacion, la renderizamos en pantalla automaticamente
      getProducts();
      cleanInputs();
      Swal.fire({
          position: "center",
          icon: "success",
          title: `<strong>${name}</strong> eliminado`,
          showConfirmButton: true,
          timer: 3000,
        });
    });
  };

  return (
    <>
      {/* FORMULARIO */}

      <div className="w-full flex justify-start py-10">
        <Card className="w-full border border-gray-300 overflow-hidden">
          <Typography
            className="w-full flex justify-center bg-blue-gray-50/30 py-4 rounded-t-lg border-b"
            variant="h4"
            color="blue-gray"
          >
            Registro de productos
          </Typography>

          <form className="w-full">
            <div className="my-8 flex flex-col gap-6">
              <div className="flex items-center px-4">
                <Typography className="font-semibold py-2 px-4 bg-blue-gray-50/45 rounded-l-lg border border-gray-500 border-r-0">
                  Categoría
                </Typography>
                <Input
                  type="text"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  value={category}
                  size="lg"
                  placeholder="Categoría"
                  className=" !border-t-gray-500 focus:!border-t-gray-900 rounded-l-none !border-l-[0.5px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="flex items-center px-4">
                <Typography className="font-semibold py-2 px-4 bg-blue-gray-50/45 rounded-l-lg border border-gray-500 border-r-0">
                  Nombre
                </Typography>
                <Input
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  size="lg"
                  placeholder="Nombre"
                  className=" !border-t-gray-500 focus:!border-t-gray-900 rounded-l-none !border-l-[0.5px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="flex items-center px-4">
                <Typography className="font-semibold py-2 px-4 bg-blue-gray-50/45 rounded-l-lg border border-gray-500 border-r-0">
                  Descripción
                </Typography>
                <Input
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  size="lg"
                  placeholder="Descripción"
                  className=" !border-t-gray-500 focus:!border-t-gray-900 rounded-l-none !border-l-[0.5px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div className="flex items-center px-4">
                <Typography className="font-semibold py-2 px-4 bg-blue-gray-50/45 rounded-l-lg border border-gray-500 border-r-0">
                  Precio
                </Typography>
                <Input
                  type="number"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  size="lg"
                  placeholder="Precio"
                  className=" !border-t-gray-500 focus:!border-t-gray-900 rounded-l-none !border-l-[0.5px]"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
            </div>
            <div className="w-full flex justify-center bg-blue-gray-50/30 py-4 rounded-b-lg border-t">
              {edit ? (
                <div className="flex gap-4">
                  <Button
                    onClick={update}
                    color="blue"
                    className="capitalize text-base"
                  >
                    Actualizar
                  </Button>
                  <Button
                    onClick={cleanInputs}
                    variant="outlined"
                    color="red"
                    className="capitalize text-base"
                  >
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={add}
                  className="bg-green-700 capitalize text-base"
                >
                  Registrar
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* TABLA */}

      <Table products={products} editProduct={editProduct} deleteProduct={deleteProduct} />
    </>
  );
};

export default Form;
