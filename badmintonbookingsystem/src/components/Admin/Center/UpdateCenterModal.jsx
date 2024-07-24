import { updateExistingCenter } from "../../../services/centerService";
import { useEffect, useState } from "react";
import { fetchManagers } from "../../../services/accountService";

const UpdateCenterModal = ({ isOpen, onClose, centerId, initialCenterData, onCenterUpdated }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [operatingTime, setOperatingTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [managerId, setManagerId] = useState('');
    const [managerIdArray, setManagerIdArray] = useState("");
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const managerData= await fetchManagers();
                setManagerIdArray(managerData)
            } catch (error) {
                console.log(error);
            }
        };
  
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateExistingCenter(
                centerId, name, location, operatingTime, closingTime, managerId, imgAvatar,
                imageFiles

            );
            console.log(imgAvatar, imageFiles);
            onClose(); // Close the modal after successful update
            onCenterUpdated(response);  // Call the callback with the updated center
        } catch (error) {
            console.error('There was an error updating the center!', error);
        }
    };

    if (!isOpen) return null;

    const handleImgAvatarChange = (e) => {

        const file = e.target.files[0];

        setImgAvatar(file);
    };

    const handleImageFilesChange = (e) => {
        setImageFiles([...e.target.files]);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-1/3 p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Update Center</h2>
            <form onSubmit={handleSubmit}>
              {/* Center Name */}
              <div className="mb-4">
                <label className="block mb-1">Center Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              {/* Location */}
              <div className="mb-4">
                <label className="block mb-1">Location</label>
                <textarea
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              {/* Opening Time */}
              <div className="mb-4">
                <label className="block mb-1">Opening Time</label>
                <input
                  type="time"
                  value={operatingTime}
                  onChange={(e) => setOperatingTime(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              {/* Closing Time */}
              <div className="mb-4">
                <label className="block mb-1">Closing Time</label>
                <input
                  type="time"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                  required
                />
              </div>
              {/* Manager */}
              <div className="mb-4">
                <select
                  id="managerId"
                  value={managerId}
                  onChange={(e) => setManagerId(e.target.value)}
                  className="w-full p-2 border-2 border-teal-950 rounded"
                  required
                >
                  <option value="">Manager</option>
                  {managerIdArray.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.fullName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Avatar Image */}
              <div className="mb-4">
                <label className="block mb-1">Avatar Image</label>
                <img
                  src={imgAvatar}
                  alt="new"
                  className="object-scale-down h-24 w-48"
                />
                <input
                  type="file"
                  onChange={handleImgAvatarChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              {/* Image List */}
              <div className="mb-4">
                <label className="block mb-1">Image List</label>
                <input
                  type="file"
                  multiple
                  onChange={handleImageFilesChange}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={onClose}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      );
      
};

export default UpdateCenterModal;