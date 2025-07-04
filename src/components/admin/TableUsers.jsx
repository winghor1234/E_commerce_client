// rafce
import  { useState, useEffect } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import { toast } from "react-toastify";
const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // code body
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changeUserStatus(token, value)
      .then(() => {
        // console.log(res);
        handleGetUsers(token);
        toast.success("ອັບເດດສະຖານະສຳເລັດ");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };
    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("ອັບເດດສະຖານະສຳເລັດ");
      })
      .catch((err) => console.log(err));
  };

  // console.log(users);
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <table className="w-full">
        <thead>
          <tr>
            <th>ລຳດັບ</th>
            <th>ອິເມວ</th>
            {/* <th>วันที่แก้ไขล่าสุด</th> */}
            <th>ສິດ</th>
            <th>ສະຖານະ</th>
            <th>ຈັດການ</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((el, i) => (
            <tr key={el.id}>
              <td>{i + 1}</td>
              <td>{el.email}</td>
              {/* <td>{el.updatedAt}</td> */}

              <td>
                <select
                  onChange={(e) => handleChangeUserRole(el.id, e.target.value)}
                  value={el.role}
                >
                  <option>ຜູ້ໃຊ້</option>
                  <option>ຜູ້ດູເເລ</option>
                </select>
              </td>

              <td>{el.enabled ? "ເປີດໃຊ້ງານ" : "ປິດໃຊ້ງານ"}</td>
              <td>
                <button
                  className="bg-yellow-500 text-white 
                  p-1 rounded-md shadow-md"
                  onClick={() => handleChangeUserStatus(el.id, el.enabled)}
                >
                  {el.enabled ? "ເປີດໃຊ້ງານ" : "ປິດໃຊ້ງານ"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
