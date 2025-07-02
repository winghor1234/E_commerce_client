// rafce
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { useForm } from "react-hook-form";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    email: z.string().email({ message: "ອີເມວບໍ່ຖືກຕ້ອງ" }),
    password: z.string().min(8, { message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວ" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "ລະຫັດຜ່ານບໍ່ຕົງກັນ",
    path: ["confirmPassword"],
  });

  
  const Register = () => {
    // Javascript
    const [passwordScore, setPasswordScore] = useState(0);
    const actionRegister = useEcomStore((state) => state.actionRegister);
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };
  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // console.log(passwordScore);
    // if (passwordScore < 3) {
    //   toast.warning("Password บ่ Strong!!!!!");
    //   return;
    // }
    // console.log("ok ลูกพี่");
    // Send to Back
    try {
      const res = await actionRegister(data);
      // console.log(res.data);
      toast.success(res.data);
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  // const tam = Array.from(Array(5))
  // console.log(tam)
  // console.log(passwordScore);
  return (
    <div
      className="min-h-screen flex 
    items-center justify-center bg-gray-100"
    >
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">ລົງທະບຽນ</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <h2>ອີເມວ:</h2>
              <input
                {...register("email")}
                placeholder="ອີເມວ"
                className={`border w-full px-3 py-2 rounded
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent
            ${errors.email && "border-red-500"}
            `}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <h2>ລະຫັດຜ່ານ:</h2>
              <input
                {...register("password")}
                placeholder="ລະຫັດຜ່ານ"
                type="password"
                className={`border w-full px-3 py-2 rounded
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent
              ${errors.password && "border-red-500"}
              `}
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1" key={index}>
                      <div
                        className={`rounded h-2 ${passwordScore <= 2
                            ? "bg-red-500"
                            : passwordScore < 4
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }
              `}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input {...register("confirmPassword")}
                type="password"
                placeholder="Confirm ລະຫັດຜ່ານ"
                className={`border w-full px-3 py-2 rounded
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent
                ${errors.confirmPassword && "border-red-500"}
                `}
              />


              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              className="bg-blue-500 rounded-md
             w-full text-white font-bold py-2 shadow
             hover:bg-blue-700
             ">
              ລົງທະບຽນ
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
