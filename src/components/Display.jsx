import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseAuth";
import Earring from "./Earing/earing";
import { cdn } from "../utils/util";

function CollectionItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /* ================== FETCH FROM FIRESTORE ================== */
  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));

        if (!mounted) return;

        const parsed = snap.docs.map(
          (doc) => new Earring({ id: doc.id, ...doc.data() })
        );

        setItems(parsed);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
    return () => (mounted = false);
  }, []);

  /* ================== LOADING STATE ================== */
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  const item = items.find((e) => e.id === id && e.visible);

  if (!item) {
    return (
      <Container className="py-5 text-center">
        <h3>Item not found</h3>
        <Button variant="success" href="tel:+919818002047">
          Call Now
        </Button>
      </Container>
    );
  }

  const similar = items.filter(
    (e) => e.id !== item.id && e.category === item.category && e.visible
  );

  /* ================== UI ================== */
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={9}>
          <link
            rel="preload"
            as="image"
            href={cdn(item.images[0], 900)}
          />
          <Card className="border-0 shadow-lg p-4 rounded-4 bg-body-tertiary">
            <Row>
              {/* LEFT: IMAGE GALLERY */}
              <Col md={6} className="text-center">
                <Image
                  src={cdn(item.images[heroIndex], 900)}
                  alt={item.title}
                  fluid
                  fetchpriority="high"
                  decoding="async"
                  className="rounded-4 shadow-sm mb-3"
                  style={{
                    maxHeight: "500px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                />


                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  {item.images.map((img, index) => (
                    <Image
                      key={index}
                      src={cdn(img, 150)}
                      loading="lazy"
                      decoding="async"
                      onClick={() => setHeroIndex(index)}
                      className={`rounded-3 ${heroIndex === index
                        ? "border border-success border-3"
                        : ""
                        }`}
                      style={{
                        height: "80px",
                        width: "70px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </Col>

              {/* RIGHT: DETAILS */}
              <Col md={6} className="ps-md-5 mt-4 mt-md-0">
                <h3 className="fw-bold mb-2">{item.title}</h3>

                <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                  {item.type && (
                    <Badge bg="light" className="text-uppercase px-3 py-2 border">
                      {item.type}
                    </Badge>
                  )}
                  {item.material && (
                    <Badge
                      bg="info"
                      text="light"
                      className="text-uppercase px-3 py-2 border"
                    >
                      {item.material}
                    </Badge>
                  )}
                  {item.purity && (
                    <Badge bg="light" text="dark" className="px-3 py-2 border">
                      {item.purity}
                    </Badge>
                  )}
                </div>

                <p className="mb-3">{item.description}</p>

                {item.price && (
                  <div className="mb-3">
                    <p className="fw-bold fs-5 mb-0 text-dark">
                      {item.formattedPrice()}
                    </p>
                    {item.priceNote && (
                      <p className="text-muted small mb-0">
                        {item.priceNote}
                      </p>
                    )}
                  </div>
                )}

                <div className="d-flex flex-column gap-3 mt-4">
                  <Button size="lg" variant="success" href="tel:+919818002047">
                    Call Now
                  </Button>

                  <Button
                    size="lg"
                    variant="outline-success"
                    href={`https://wa.me/919818002047?text=${encodeURIComponent(
                      `Hi, I am looking for "${item.title}".\n\n` +
                      `${item.material ? `Material: ${item.material}` : ""}` +
                      `${item.purity ? ` (${item.purity})` : ""}\n` +
                      `${item.price ? `Price: ${item.formattedPrice()}\n` : ""}\n` +
                      `Please share more details.\n\n` +
                      `Product link:\n${window.location.href}`
                    )}`}
                    target="_blank"
                  >
                    WhatsApp Us
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>

          {/* SIMILAR ITEMS */}
          {similar.length > 0 && (
            <div className="mt-5">
              <h4 className="fw-bold mb-3 border-bottom pb-2">
                Similar Designs
              </h4>
              <Row className="g-4">
                {similar.slice(0, 3).map((s) => (
                  <Col sm={6} md={4} key={s.id}>
                    <Card
                      className="h-100 shadow-sm border-0 hover-card"
                      onClick={() => navigate(`/display/${s.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src={cdn(s.primaryImage(), 400)}
                        loading="lazy"
                        decoding="async"
                        className="rounded-top"
                        style={{ height: "220px", objectFit: "cover" }}
                      />

                      <Card.Body>
                        <Card.Title className="fw-semibold">
                          {s.title}
                        </Card.Title>
                        <Card.Text className="text-muted small">
                          {s.material} {s.purity && `• ${s.purity}`}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CollectionItem;
