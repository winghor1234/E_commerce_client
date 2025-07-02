// rafce
import { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";


const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // code body
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    // code
    console.log(orderId, orderStatus);
    changeOrderStatus(token, orderId, orderStatus)
      .then(() => {
        // console.log(res);
        toast.success("ອັບເດດສະຖານະສຳເລັດ");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ຍັງບໍ່ໄດ້ດຳເນີນການ":
        return "bg-gray-200";
      case "ກຳລັງດຳເນີນການ":
        return "bg-blue-200";
      case "ສຳເລັດ":
        return "bg-green-200";
      case "ຍົກເລີກ":
        return "bg-red-200";
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border">
              <th>ລຳດັບ</th>
              <th>ຜູ້ໃຊ້ງານ</th>
              <th>ວັນທີ</th>
              <th>ສິນຄ້າ</th>
              <th>ລວມ</th>
              <th>ສະຖານະ</th>
              <th>ຈັດການ</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((item, index) => {
              // console.log(item);
              return (
                <tr key={index} className="border">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <p>{item.orderedBy.email}</p>
                    <p>{item.orderedBy.address}</p>
                  </td>

                  <td>
                    {dateFormat(item.createdAt)}
                  </td>

                  <td className="px-2 py-4">
                    {item.products?.map((product, index) => (
                      <li key={index}>
                        {product.product.title} {"  "}
                        <span className="text-sm">
                          {product.count} x{" "}
                          {numberFormat(product.product.price)}
                        </span>
                      </li>
                    ))}
                  </td>

                  <td>{numberFormat(item.cartTotal)}</td>

                  <td>
                    <span
                      className={`${getStatusColor(item.orderStatus)} px-2 py-1 
rounded-full`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={item.orderStatus}
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                    >
                      <option>ຍັງບໍ່ໄດ້ດຳເນີນການ</option>
                      <option>ກຳລັງດຳເນີນການ</option>
                      <option>ສຳເລັດ</option>
                      <option>ຍົກເລີກ</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
