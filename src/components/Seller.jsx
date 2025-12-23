import { useState } from "react";
import { Container, Form, Button, Card, Image } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./FirebaseAuth";
import { uploadToCloudinary } from "../utils/util";

function Seller() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("Gold");
  const [purity, setPurity] = useState("22K");
  const [type, setType] = useState("stud");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Upload images to Cloudinary
  const handleImageUpload = async (files) => {
    setLoading(true);
    try {
      const urls = [];
      for (let file of files) {
        const url = await uploadToCloudinary(file);
        urls.push(url);
      }
      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      alert("Image upload failed");
    }
    setLoading(false);
  };

  // Remove uploaded image
  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  // Save product to Firestore
  const handleSave = async () => {
    if (!title || images.length === 0) {
      alert("Title and at least one image required");
      return;
    }

    const product = {
      id: `earring-${Date.now()}`,
      title,
      description: description || "",
      category: "earring",
      type,
      material,
      purity: material === "Gold" ? purity : "",
      price: price ? Number(price) : null,
      price_note: `Prices may vary based on ${material} rate and design`,
      images,
      visible: true,
      featured: false,
      order: 0,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "products"), product);

    alert("Product saved successfully");

    // Reset form
    setTitle("");
    setDescription("");
    setMaterial("Gold");
    setPurity("22K");
    setType("stud");
    setPrice("");
    setImages([]);
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4">Seller Upload Panel</h3>

        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        {/* Description (optional, AI-ready) */}
        <Form.Group className="mb-3">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            // placeholder="Leave empty — AI will generate later"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Type */}
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="stud">Stud</option>
            <option value="hoop">Hoop</option>
            <option value="ring">Ring</option>
          </Form.Select>
        </Form.Group>

        {/* Material */}
        <Form.Group className="mb-3">
          <Form.Label>Material</Form.Label>
          <Form.Select
            value={material}
            onChange={(e) => {
              const value = e.target.value;
              setMaterial(value);
              if (value !== "Gold") setPurity("");
            }}
          >
            <option>Gold</option>
            <option>Silver</option>
          </Form.Select>
        </Form.Group>

        {/* Purity (Gold only) */}
        {material === "Gold" && (
          <Form.Group className="mb-3">
            <Form.Label>Purity</Form.Label>
            <Form.Control
              value={purity}
              onChange={(e) => setPurity(e.target.value)}
            />
          </Form.Group>
        )}

        {/* Price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Optional"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        {/* Upload Images */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
          />
        </Form.Group>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="d-flex gap-2 flex-wrap mb-3">
            {images.map((img) => (
              <div key={img} style={{ position: "relative" }}>
                <Image
                  src={img}
                  rounded
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                  }}
                />
                <Button
                  size="sm"
                  variant="danger"
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => removeImage(img)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}

        {loading && <p>Uploading images...</p>}

        <Button variant="success" disabled={loading} onClick={handleSave}>
          Save Product
        </Button>
      </Card>
    </Container>
  );
}

export default Seller;
