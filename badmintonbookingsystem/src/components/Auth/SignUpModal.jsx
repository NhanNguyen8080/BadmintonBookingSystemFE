import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signUpUser } from "../../services/authService";

export default function SignUpModal({ isOpen, closeModal, openSignInModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        const { email, password, confirmedPassword, fullName, phoneNumber } = data;

        try {
            const response = await signUpUser({
                email,
                password,
                confirmedPassword,
                fullName,
                phoneNumber,
            });
            console.log("Sign-up successful:", response);
            toast.success("Sign up successful");
            // dispatch(login(response.user)); // Uncomment and adjust if needed
            closeModal();
        } catch (error) {
            console.error("Sign-up failed:", error);
        }
    };

    const handleSignInClick = () => {
        closeModal();
        openSignInModal();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
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
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                                <div className="flex">
                                    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-500 to-black text-white w-1/2 p-10 space-y-5">
                                        <h1 className="text-4xl font-bold">Tham gia với chúng tôi!</h1>
                                        <p className="text-center text-lg">
                                            Chúng tôi rất vui khi có bạn ở đây.
                                            Nếu bạn chưa có tài khoản, hãy tạo một tài khoản để nhận ưu đãi đặc biệt!
                                        </p>
                                        <button
                                            className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-200"
                                            onClick={handleSignInClick}
                                        >
                                            Bạn đã có tài khoản? <span className="text-black">Đăng nhập ngay</span>
                                        </button>
                                    </div>
                                    <div className="w-1/2 p-10">
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-3xl font-semibold text-center mb-6">Đăng ký tài khoản</h2>
                                            <input
                                                type="text"
                                                placeholder="Họ Tên Của Bạn"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                {...register("fullName", { required: true })}
                                            />
                                            {errors.fullName && (
                                                <p className="text-red-500 text-sm">Vui lòng nhập tên của bạn.</p>
                                            )}
                                            <input
                                                type="text"
                                                placeholder="Số Điện Thoại"
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                {...register("fullName", { required: true })}
                                            />
                                            {errors.fullName && (
                                                <p className="text-red-500 text-sm">Vui lòng nhập số điện thoại của bạn.</p>
                                            )}
                                            <input
                                                type="email"
                                                placeholder="Địa Chỉ Email"
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
                                                    placeholder="Mật Khẩu"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    {...register("password", { required: true })}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                    <FontAwesomeIcon
                                                        icon={showPassword ? faEyeSlash : faEye}
                                                        className="cursor-pointer text-gray-500"
                                                        onClick={togglePasswordVisibility}
                                                    />
                                                </div>
                                            </div>
                                            {errors.password && (
                                                <p className="text-red-500 text-sm">Vui lòng nhập mật khẩu.</p>
                                            )}
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Nhập Lại Mật Khẩu"
                                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    {...register("confirmPassword", {
                                                        required: true,
                                                        validate: (value) => value === watch("password"),
                                                    })}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                    <FontAwesomeIcon
                                                        icon={showPassword ? faEyeSlash : faEye}
                                                        className="cursor-pointer text-gray-500"
                                                        onClick={togglePasswordVisibility}
                                                    />
                                                </div>
                                            </div>
                                            {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                                                <p className="text-red-500 text-sm">Vui lòng nhập đầy đủ.</p>
                                            )}
                                            {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                                                <p className="text-red-500 text-sm">Mật khẩu không giống.</p>
                                            )}
                                            <button
                                                type="submit"
                                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
                                            >
                                                Đăng ký
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
    );
}