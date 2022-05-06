export default function imageUploaded(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return reader.result;
  };
  return reader;
}
