import React from "react";
import { Card, Button, Typography } from "@material-tailwind/react";

const Table = ({ products, editProduct, deleteProduct }) => {
  const TABLE_HEAD = ["#", "Categoría", "Nombre", "Descripción", "Precio", " "];

  return (
    <Card className="overflow-scroll mb-10 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.10)] w-full">
      <table className="w-full table-auto text-left rounded-lg ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-semibold leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product, key) => {
            return (
              <tr key={product.id} className="even:bg-blue-gray-50/50 truncate">
                <td className="p-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.category}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {product.description}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-normal"
                  >
                    $ {product.price}
                  </Typography>
                </td>
                <td className="py-4 pl-4 flex gap-2">
                  <Button
                    type="button"
                    className="px-4 py-2 text-xs capitalize font-normal"
                    onClick={() => editProduct(product)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    color="red"
                    onClick={() => deleteProduct(product)}
                    className="px-4 py-2 text-xs capitalize font-normal"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
