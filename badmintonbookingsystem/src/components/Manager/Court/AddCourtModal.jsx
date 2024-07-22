import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addNewCenter } from '../../../services/centerService';


const AddCourtModal = ({ isOpen, onClose, onCourtAdded }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imgAvatar, setImgAvatar] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    const onSubmit = async (data) => {
        const { name, location, operatingTime, closingTime, managerId } = data;
        const files = imageFiles.length > 0 ? Array.from(imageFiles) : [];

        try {
            const response = await addNewCenter(
                { name, location, operatingTime, closingTime, managerId },
                imgAvatar,
                files
            );
            onClose();
            onCourtAdded(response);
        } catch (error) {
            console.error('Error creating center:', error);
        }
    };

    const handleImgAvatarChange = (e) => {
        setImgAvatar(e.target.files[0]); // Lưu ImgAvatar khi người dùng chọn file
    };

    const handleImageFilesChange = (e) => {
        setImageFiles([...e.target.files]); // Lưu danh sách ImageFiles khi người dùng chọn file
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Tạo mới sân</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block mb-1">Tên sân</label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full border px-2 py-1 rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Ảnh sân</label>
                        <input
                            type="file"
                            onChange={handleImgAvatarChange}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Ảnh khác</label>
                        <input
                            type="file"
                            onChange={handleImageFilesChange}
                            className="w-full border px-2 py-1 rounded"
                            multiple
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}
                        >
                            Trở lại
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Thêm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourtModal;
