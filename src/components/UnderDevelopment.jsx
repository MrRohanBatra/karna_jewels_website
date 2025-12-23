import { Container, Card, Spinner, Badge } from "react-bootstrap";

function Under() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center text-center"
      style={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #141e30, #243b55)",
      }}
    >
      <Card
        className="p-5 shadow-lg"
        style={{
          maxWidth: "520px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <div style={{ fontSize: "3.5rem" }}>⚠️</div>

        <h1 className="fw-bold mt-3">Under Development</h1>

        <p className="text-muted mt-2">
          We’re working hard to bring something amazing 🚀
        </p>

        <div className="mt-4">
          <Spinner animation="border" variant="danger" />
        </div>

        <Badge bg="danger" className="mt-4 px-3 py-2">
          Coming Soon
        </Badge>
      </Card>
    </Container>
  );
}

export default Under;
