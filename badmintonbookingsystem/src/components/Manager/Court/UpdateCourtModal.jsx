import { useEffect, useState } from "react";
import { updateCourt } from "../../../services/courtService";

const UpdateCourtModal = ({ isOpen, onClose, courtId, initialCourtData, onCourtUpdated }) => {
  const [courtName, setCourtName] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    if (initialCourtData) {
      setCourtName(initialCourtData.courtName);
      setImageFiles(initialCourtData.courtImgUrls);
    } else {
      setCourtName('');
      setImageFiles([]);
    }
  }, [initialCourtData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateCourt(courtId, courtName, imageFiles);
      console.log(imageFiles);
      onClose(); // Close the modal after successful update
      onCourtUpdated(response);  // Call the callback with the updated court
    } catch (error) {
      console.error('There was an error updating the court!', error);
    }
  };

  if (!isOpen) return null;

  const handleImageFilesChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/3 p-6 rounded shadow-lg">
        <h2 className="text-2xl mb-4">Chỉnh sửa sân</h2>
        <form onSubmit={handleSubmit}>
          {/* Center Name */}
          <div className="mb-4">
            <label className="block mb-1">Tên sân</label>
            <input
              type="text"
              value={courtName}
              onChange={(e) => setCourtName(e.target.value)}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          {/* Image List */}
          <div className="mb-4">
            <label className="block mb-1">Ảnh</label>
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
              Trở lại
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );

};

export default UpdateCourtModal;