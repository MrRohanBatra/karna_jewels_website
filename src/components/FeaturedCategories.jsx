
// import { Container, Row, Col } from 'react-bootstrap';
// import './FeaturedCategories.css';
// import { Link, useNavigate } from 'react-router-dom';

// // Data for categories
// const categories = [
//   {
//     name: "Ear Pasting",
//     image: "/pasting.png"
//   },
//   {
//     name: "Body Piercing",
//     image: "/piercing.png"
//   },
//   {
//     name: "Gold Implants",
//     image: "/gold_implant.png"
//   },
// ];

// const trending = [];
// //   {
// //     name: "Men's Textured Formal Blazer",
// //     image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCsZPsrhcEjOYsN8xNusbZuaL322lUjiXG8zTeXOFC4FC-1Lq5qAfwct8U5X5gcVfq0CFb_3WzUMMJaYBXkJ9O8337BENZ14DBSvhIh4c"
// //   },
// //   {
// //     name: "Elegant Evening Dress",
// //     image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSVdiveeV4k4YxRGTU-Ce6VDD53U76ZzR1U3kU6WQNtZUgK8kRvr1R8z256K64xvgi8mcX_VA8M4l-tnhwGhZ0ZO3Mh9OPHjPcvJ67Wq466LU1gj9tQnZMl0A"
// //   },
// //   {
// //     name: "Kid's Casual wear",
// //     image: "https://image.hm.com/assets/hm/d4/2c/d42c7fee05728ac1489fb004a9cdc204eb3c7af8.jpg?imwidth=1536"
// //   }
// // ];
// // const trending = [];
// function FeaturedCategories() {
//   const navi = useNavigate();

//   const navigateToSearch = (name) => {
//     navi(`/services?s=${encodeURIComponent(name)}`);
//   };

//   return (
//     <>
//       {/* Featured Section */}
//       <section className="py-5" id="featured">
//         <Container className="text-center">
//           <h2 className="fw-bold mb-5">Our Expertise</h2>
//           <Row>
//             {categories.map((category, index) => (
//               <Col md={4} key={index} className="mb-4">
//                 <div
//                   onClick={() => navigateToSearch(category.name)}
//                   className="category-card text-decoration-none cursor-pointer"
//                   role="button"
//                 >
//                   <div className="card-img-wrapper">
//                     <div
//                       className="card-img"
//                       style={{ backgroundImage: `url(${category.image})` }}
//                     ></div>
//                   </div>
//                   <p className="mt-3 fs-5 fw-semibold">{category.name}</p>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>

//       {/* Trending Section */}
//       <section className="py-5" id="trending">
//         <Container className="text-center">
//           <h2 className="fw-bold mb-5">Official Partner</h2>
//           <Row>
//             {trending.map((item, index) => (
//               <Col md={4} key={index} className="mb-4">
//                 <Link
//                   to={`/search?s=${encodeURIComponent(item.name)}`}
//                   className="category-card text-decoration-none"
//                 >
//                   <div className="card-img-wrapper">
//                     <div
//                       className="card-img"
//                       style={{ backgroundImage: `url(${item.image})` }}
//                     ></div>
//                   </div>
//                   <p className="mt-3 fs-5 fw-semibold">{item.name}</p>
//                 </Link>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </section>
//     </>
//   );
// }

// export default FeaturedCategories;
import { Container, Row, Col } from 'react-bootstrap';
import './FeaturedCategories.css';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: "Ear Pasting", image: "/pasting.png" },
  { name: "Body Piercing", image: "/piercing.png" },
  { name: "Gold Implants", image: "/gold_implant.png" },
];

const partners = [{
  "name": "Studex",
  "logo": "/studex.png",
}];

function FeaturedCategories() {
  const navi = useNavigate();

  const navigateToSearch = (name) => {
    navi(`/services?s=${encodeURIComponent(name)}`);
  };

  return (
    <>
      <section className="py-5" id="featured">
        <Container className="text-center">
          <h2 className="fw-bold mb-5">Our Expertise</h2>
          <Row>
            {categories.map((category, index) => (
              <Col md={4} key={index} className="mb-4">
                <div
                  onClick={() => navigateToSearch(category.name)}
                  className="category-card cursor-pointer"
                  role="button"
                >
                  <div className="card-img-wrapper">
                    <div
                      className="card-img"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                  </div>
                  <p className="mt-3 fs-5 fw-semibold">{category.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="py-5 " id="partners">
  <Container className="text-center">
    <h2 className="fw-bold mb-2">Official Partners</h2>
    <br />

    <Row className="align-items-center justify-content-center">
      {partners.map((partner, index) => (
        <Col
          xs={6}
          md={3}
          key={index}
          className="mb-4 d-flex justify-content-center"
        >
          <img
            src={partner.logo}
            alt={partner.name}
            style={{
              maxHeight: "70px",
              maxWidth: "160px",
              objectFit: "contain",
              filter: "grayscale(100%)",
              opacity: 0.85
            }}
          />
        </Col>
      ))}
    </Row>
  </Container>
</section>

    </>
  );
}

export default FeaturedCategories;
