import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/slices/authSlice";
import SignUpModal from "./SignUpModal";
import { authenticatedUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function SignInModal() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const decoded = await authenticatedUser(dispatch, data);
      console.log(decoded);
      const currentTime = Date.now() / 1000;
      console.log(currentTime);
      setIsSignInOpen(false);
      if (decoded.role === 'Admin') {
        navigate("/admin/accounts");
      } else if (decoded.role === 'Manager') {
        navigate("/manager/courts");
      }
    } catch (error) {
      // Handle error inside authenticateUser
    }
  };

  function closeSignInModal() {
    setIsSignInOpen(false);
  }

  function openSignInModal() {
    setIsSignInOpen(true);
  }

  function closeSignUpModal() {
    setIsSignUpOpen(false);
  }

  function openSignUpModal() {
    setIsSignUpOpen(true);
  }

  function closeForgotPasswordModal() {
    setIsForgotPasswordOpen(false);
  }

  function openForgotPasswordModal() {
    setIsForgotPasswordOpen(true);
  }

  return (
    <>
      <div>
        <button
          type="button"
          onClick={openSignInModal}
          className="text-gray-700 transition-colors duration-300 rounded-md hover:text-black hover:bg-gray-100 py-2 px-4"
        >
          Đăng Nhập
        </button>

        <button
          type="button"
          onClick={openSignUpModal} // Assuming you have a function to open the sign-up modal
          className="border border-orange-500 text-orange-500 py-2 px-4 rounded-md hover:bg-orange-100 transition duration-300"
        >
          Đăng Ký
        </button>
      </div>

      <Transition appear show={isSignInOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeSignInModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                  <div className="flex">
                    <div className="flex flex-col items-center justify-center w-1/2 bg-gradient-to-r from-orange-500 to-black text-white p-8 space-y-5">
                      <h1 className="text-3xl font-bold">Tham gia với chúng tôi!</h1>
                      <p className="text-center">
                        Chúng tôi rất vui khi có bạn ở đây. Nếu bạn chưa có tài khoản, hãy tạo một tài khoản để nhận ưu đãi đặc biệt!
                      </p>
                      <button
                        className="flex items-center bg-white text-orange-500 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => {
                          closeSignInModal();
                          openSignUpModal();
                        }}
                      >
                        Tạo Tài Khoản
                      </button>
                    </div>
                    <div className="bg-white w-1/2 p-8">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          {...register("email", {
                            required: "Vui lòng nhập email của bạn.",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Email không hợp lệ.",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            className={`w-full p-3 border-2 rounded-lg ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                            {...register("password", { required: 'Mật khẩu là bắt buộc' })}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <FontAwesomeIcon
                              icon={showPassword ? faEyeSlash : faEye}
                              className="cursor-pointer text-gray-400"
                              onClick={togglePasswordVisibility}
                            />
                          </div>
                        </div>
                        {errors.password && (
                          <p className="text-red-400 text-sm">{errors.password.message}</p>
                        )}

                        <button
                          type="button"
                          className="text-orange-500 underline text-left hover:text-black hover:bg-orange-100 hover:underline-offset-4 transition duration-300 ease-in-out"
                          onClick={() => {
                            closeSignInModal();
                            openForgotPasswordModal();
                          }}
                        >
                          Quên mật khẩu?
                        </button>

                        <button
                          type="submit"
                          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
                        >
                          Đăng nhập
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <SignUpModal
        isOpen={isSignUpOpen}
        closeModal={closeSignUpModal}
        openSignInModal={openSignInModal}
      />
    </>
  );
}