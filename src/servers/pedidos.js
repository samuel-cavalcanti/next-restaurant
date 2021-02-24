import plates from "./menu";

export const pedidos = [];

export function AddPedidos({ numberTable, idpedidos }) {
  const plate = plates.find((plate) => plate.id === idpedidos);

  const pedido = {
    numberTable,
    title: plate.title,
    description: plate.description,
    name: plate.name,
  };
  pedidos.push(pedido);
  return "Sucesso";
}
export function getPedidos(numberTable) {
  return pedidos.find((item) => item.numberTable === numberTable);
}
export function removePedidos(numberTable) {
  const index = pedidos.findIndex((item) => item.numberTable === numberTable);

  if (index !== -1) {
    return pedidos.splice(index, 1)[0];
  }
  return "Sucesso";
}

export default { AddPedidos, getPedidos, removePedidos, pedidos };
