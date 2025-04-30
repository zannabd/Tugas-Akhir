import React from "react";

const FilePreview = ({ fileUrl }) => {
  if (!fileUrl) return null;

  // Jika file adalah PDF
  if (fileUrl.endsWith(".pdf")) {
    return (
      <div style={{display:"flex", flexDirection:"column"}}>
        <iframe
          src={fileUrl}
          width="30%"
          height="50px"
          style={{ border: "none" }}
          title="PDF Preview"
        />
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      </div>
    );
  }

  // Jika file adalah gambar
  if (fileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
    return (
      <div>
        <p>Preview Image</p>
        <img
          src={fileUrl}
          alt="Preview"
          style={{ width: "300px", height: "auto" }}
        />
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          Download Image
        </a>
      </div>
    );
  }

  return null;
};

export default FilePreview;
