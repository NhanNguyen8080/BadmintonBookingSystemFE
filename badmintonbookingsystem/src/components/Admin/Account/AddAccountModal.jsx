import { useForm } from "react-hook-form";
import { fetchRoles } from "../../../services/accountService";
import { useEffect, useState } from "react";
import { createAccount } from "../../../api/apiAdminAccount";

const AddAccountModal = ({ isOpen, onClose, onAccountAdded }) => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [roleId, setRoleId] = useState('');
    const [roleIdArray, setRoleIdArray] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const managerData= await fetchRoles();

                setRoleIdArray(managerData)
            } catch (error) {
                console.log(error);
            }
        };
  
        fetchData();
    }, []);

    const onSubmit = async (data) => {
      const { email, password, confirmedPassword, fullName, phoneNumber, roleId } = data;
      
      try {
        console.log(data)
        const response = await createAccount(
            email, password, confirmedPassword, fullName, phoneNumber, roleId
        );
        onClose(); 
        onAccountAdded(response); 
      } catch (error) {
        console.error('Error creating account:', error);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white w-1/3 p-6 rounded shadow-lg">
          <h2 className="text-2xl mb-4">Create a new account</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required!',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email! Please enter your email in example@domain.com format.'
                  },
                  minLength: {
                    value: 8,
                    message: 'Email must have at least 8 characters!'
                  }
                })}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            {/* PASSWORD */}
            <div className="mb-4">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                {...register('password', { 
                  required: 'Password is required!',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters'
                  },
                  pattern: {
                    value: /[!@#$%^&*(),.?":{}|<>]/,
                    message: 'Password must contain at least one special character'
                  }
                })}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {/* CONFIRM PASSWORD */}
            <div className="mb-4">
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                {...register('confirmedPassword', { 
                  required: 'Confirming password is required',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match'
                })}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.confirmedPassword && <p className="text-red-500">{errors.confirmedPassword.message}</p>}
            </div>
            {/* FULL NAME */}
            <div className="mb-4">
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                {...register('fullName', { required: 'Full name is required' })}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>
            {/* PHONE NUMBER */}
            <div className="mb-4">
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                {...register('phoneNumber', { required: 'Phone number is required' })}
                className="w-full border px-2 py-1 rounded"
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
            </div>
            {/* ROLE */}
            <div className="mb-4">
              <label className="block mb-1">Role</label>
              <select
                {...register('roleId', { required: 'Role is required' })}
                className="w-full border px-2 py-1 rounded"
              >
                <option value="">Select role</option>
                {roleIdArray.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
              {errors.roleId && <p className="text-red-500">{errors.roleId.message}</p>}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Back
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }    
  export default AddAccountModal;