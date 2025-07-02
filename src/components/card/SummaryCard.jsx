// rafce
import  { useState, useEffect } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";


const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res)
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning("ກະລຸນາປ້ອນທີ່ຢູ່ຂອງທ່ານ");
    }
    saveAddress(token, address)
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("ກະລຸນາປ້ອນທີ່ຢູ່ຂອງທ່ານກ່ອນ");
    }
    navigate("/user/payment");
  };

  console.log(products);

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap gap-4">
        {/* Left */}
        <div className="w-2/4">
          <div
            className="bg-gray-100 p-4 rounded-md 
          border shadow-md space-y-4"
          >
            <h1 className="font-bold text-lg">ທີ່ຢູ່ໃນການຈັດສົ່ງ</h1>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ກະລຸນາປ້ອນທີ່ຢູ່"
              className="w-full px-2 rounded-md"
            />
            <button
              onClick={hdlSaveAddress}
              className="bg-blue-500 text-white
            px-4 py-2 rounded-md shadow-md hover:bg-blue-700
            hover:scale-105 hover:translate-y-1 hover:duration-200"
            >
              ບັນທຶກທີ່ຢູ່
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/4">
          <div
            className="bg-gray-100 p-4 rounded-md 
          border shadow-md space-y-4"
          >
            <h1 className="text-lg font-bold">ຄຳສັ່ງຊື້ຂອງທ່ານ</h1>

            {/* Item List */}

            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm">
                      ຈຳນວນ : {item.count} x {numberFormat(item.product.price) }
                    </p>
                  </div>

                  <div>
                    <p className="text-red-500 font-bold">
                      { numberFormat(item.count * item.product.price)     }
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <div className="flex justify-between">
                <p>ຄ່າຈັດສົ່ງ:</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ສ່ວນຫຼູດ:</p>
                <p>0.00</p>
              </div>
            </div>

            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">ລາຄາລວມ:</p>
                <p className="text-red-500 font-bold text-lg">{numberFormat(cartTotal) }</p>
              </div>
            </div>

            <hr />
            <div>
              <button
                onClick={hdlGoToPayment}
                // disabled={!addressSaved}
                className="bg-green-400 w-full p-2 rounded-md
              shadow-md text-white hover:bg-green-600"
              >
                ດຳເນີນການຊຳລະເງິນ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
