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
    Axios.post("http://localhost:3001/create", {
      category: category,
      name: name,
      description: description,
      price: price,
    })
      .then(() => {
        // Luego de guardar la informacion, la renderizamos en pantalla automaticamente
        getProducts();
        cleanInputs();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `<strong class="text-[#3085d6]">${name}</strong> agregado`,
          showConfirmButton: true,
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parse(JSON.stringify(error)).message,
        });
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
    })
      .then(() => {
        // Luego de guardar la informacion, la renderizamos en pantalla automaticamente
        getProducts();
        cleanInputs();
        Swal.fire({
          position: "center",
          icon: "success",
          html: `<strong class="text-[#3085d6]">${name}</strong> actualizado`,
          showConfirmButton: true,
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parse(JSON.stringify(error)).message,
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

  // Eliminar un producto

  const deleteProduct = (product) => {
    console.log("1");
    Swal.fire({
      title: "Confirmar eliminado",
      html: `<p>Realmente desea eliminar <span class="text-[#3085d6]"> ${product.name} </span>?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("llego hasta aqui");
        Axios.delete(`http://localhost:3001/delete/${product.id}`)
          .then(() => {
            getProducts();
            cleanInputs();
            Swal.fire({
              title: "Eliminado!",
              html: `<span class="text-[#3085d6]">${product.name}</span> fue eliminado.`,
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text:
                JSON.parse(JSON.stringify(error)).message === "Network Error"
                  ? "Intente más tarde"
                  : JSON.parse(JSON.stringify(error)).message,
            });
          });
      }
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
                    type="button"
                    onClick={update}
                    color="blue"
                    className="capitalize text-base"
                  >
                    Actualizar
                  </Button>
                  <Button
                    type="button"
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
                  type="button"
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

      <Table
        products={products}
        editProduct={editProduct}
        deleteProduct={deleteProduct}
      />
    </>
  );
};

export default Form;
