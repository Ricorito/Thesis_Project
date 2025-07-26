export const handleUpload = (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json("No file uploaded.");
  res.status(200).json(file.filename);
};
