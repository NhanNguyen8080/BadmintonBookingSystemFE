import { useForm } from "react-hook-form";
import { updateCenter } from "../../../api/apiManagerCenter";
import { updateExistingCenter } from "../../../services/centerService";
import { useEffect, useState } from "react";

const UpdateCenterModal = ({ isOpen, onClose, centerId, initialCenterData, onCenterUpdated }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [operatingTime, setOperatingTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [managerId, setManagerId] = useState('');

    const [imgAvatar, setImgAvatar] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        if (initialCenterData) {
            setName(initialCenterData.name);
            setLocation(initialCenterData.location);
            setOperatingTime(initialCenterData.operatingTime);
            setClosingTime(initialCenterData.closingTime);
            setManagerId(initialCenterData.managerName)
            setImgAvatar(initialCenterData.imgAvatar);
            setImageFiles(initialCenterData.centerImgUrls);
        } else {
            setName('');
            setLocation('');
            setOperatingTime('');
            setClosingTime('');
            setManagerId('');
            setImgAvatar(null);
            setImageFiles([]);
        }
    }, [initialCenterData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateExistingCenter(
                { centerId, name, location, operatingTime, closingTime, managerId },
                imgAvatar,
                imageFiles
            );
            onClose(); // Close the modal after successful update
            onCenterUpdated(response);  // Call the callback with the updated center
        } catch (error) {
            console.error('There was an error updating the center!', error);
        }
    };

    if (!isOpen) return null;

    const handleImgAvatarChange = (e) => {

        const file = e.target.files[0];
        // Read the file and set a data URL for displaying
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            setImgAvatar(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageFilesChange = (e) => {
        setImageFiles([...e.target.files]); // Lưu danh sách ImageFiles khi người dùng chọn file
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white w-1/3 p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Update Center</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Tên câu lạc bộ</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Địa điểm</label>
                        <textarea
                            value={location} onChange={(e) => setLocation(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Giờ mở cửa</label>
                        <input
                            type="time"
                            value={operatingTime}
                            onChange={(e) => setOperatingTime(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Giờ đóng cửa</label>
                        <input
                            type="time"
                            value={closingTime}
                            onChange={(e) => setClosingTime(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Quản lý ID</label>
                        <input
                            type="text"
                            value={managerId}
                            onChange={(e) => setManagerId(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Ảnh đại diện</label>
                        <input
                            type="file"
                            onChange={handleImgAvatarChange}
                            className="w-full border px-2 py-1 rounded"
                        />
                        <img
                            src={imgAvatar}
                            alt="new"
                            className="w-1/4"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Danh sách ảnh</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageFilesChange}
                            className="w-full border px-2 py-1 rounded"
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
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCenterModal;