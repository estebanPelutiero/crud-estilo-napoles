import { React, useState } from "react";
import Axios from "axios";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Table from "./Table";

const Form = () => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [products, setProducts] = useState([]);

  // Agregar elementos del form a la db

  const add = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create", {
      category: category,
      name: name,
      description: description,
      price: price,
    }).then(() => {
      // Luego de guardar la informacion, la renderizamos en pantalla automaticamente

      getProducts();
      alert("Producto registrado");
    });
  };

  // Traer elementos ya guardados en la db para renderizarlos

  const getProducts = () => {
    Axios.get("http://localhost:3001/productos").then((response) => {
      setProducts(response.data);
    });
  };

  getProducts();

  return (
    <>
      {/* FORMULARIO */}

      <div className="w-full flex justify-start px-4 py-8">
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
                  type="text"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
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
              <Button onClick={add} className="bg-green-700">
                Registrar
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* TABLA */}

      <Table products={products}/>

    </>
  );
};

export default Form;
