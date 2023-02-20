import axios from 'axios';
import { cloudName, defaultUploadTag, uploadPreset } from './cloudinaryConfig';

export const uploadToCloudinary = ({
  file,
  fileType,
  successCallback,
  failureCallback,
}) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`;
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', uploadPreset);
  data.append('tags', defaultUploadTag);
  axios
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => successCallback(response.data))
    .catch((err) => {
      const error = new Error(err);
      failureCallback({ event: error });
    });
};
