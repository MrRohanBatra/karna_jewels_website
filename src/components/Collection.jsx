import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseAuth";
import Earring from "./Earing/earing";
import "../CSS/collection.css";
import { cdn } from "../utils/util";

/* ================== ANIMATIONS (PERF SAFE) ================== */

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

/* ================== COMPONENT ================== */

function Collections() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));

        if (!mounted) return;

        const parsed = snap.docs
          .map((doc) => new Earring({ id: doc.id, ...doc.data() }))
          .filter((item) => item.visible)
          .sort(() => Math.random() - 0.5);

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

  return (
    <Container className="my-5">
      {/* ================== HEADING ================== */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Our Collections</h1>
        <p className="text-muted">
          Price depends on jewellery weight and design
        </p>
      </div>

      {/* ================== LOADING SPINNER ================== */}
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* ================== GRID ================== */}
      {!loading && (
        <motion.div
          variants={containerVariants}
          initial={false}
          animate="visible"
        >
          <Row className="g-4">
            {items.map((item) => (
              <Col key={item.id} xs={12} sm={6} lg={4}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -6,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                >
                  <Card
                    className="h-100 border-0 shadow-sm collection-card"
                    onClick={() => navigate(`/display/${item.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* IMAGE */}
                    <div className="position-relative">
                      <Image
                        src={cdn(item.primaryImage(), 400)}
                        alt={item.title}
                        className="card-img-top object-fit-cover"
                        style={{ height: "260px" }}
                        loading="lazy"
                        decoding="async"
                      />

                      {item.type && (
                        <Badge
                          bg="dark"
                          className="position-absolute top-0 end-0 m-2 px-3 py-2 text-uppercase"
                        >
                          {item.type }
                        </Badge>
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fw-semibold mb-1">
                        {item.title}
                      </Card.Title>

                      <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                        {item.material && (
                          <Badge
                            bg="info"
                            text="light"
                            className="px-3 py-2 border"
                          >
                            {item.material}
                          </Badge>
                        )}

                        {item.purity && (
                          <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 border"
                          >
                            {item.purity}
                          </Badge>
                        )}
                      </div>

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

                      <Button
                        variant="success"
                        className="mt-auto fw-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = "tel:+919818002047";
                        }}
                      >
                        Call Now
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      )}
    </Container>
  );
}

export default Collections;
