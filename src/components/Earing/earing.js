class Earring {
  constructor(data = {}) {
    this.id = data.id || "";
    this.title = data.title || "";
    this.category = data.category || "earring";
    this.type = data.type || ""; // stud, hoop, ring
    this.description = data.description || "";
    this.material = data.material || "";
    this.purity = data.purity || "";
    this.useCase = data.use_case || [];
    this.images = data.images || [];

    // ✅ PRICE RELATED (NEW)
    this.price = data.price ?? null; // number or null
    this.currency = data.currency || "INR";
    this.priceNote =
      data.price_note || "Prices may vary based on gold rate and design";

    this.cta = data.cta || { primary: "call", secondary: "whatsapp" };
    this.featured = data.featured ?? false;
    this.visible = data.visible ?? true;
    this.order = data.order ?? 0;
  }

  // ---- Helpers (UI-friendly) ----

  primaryImage() {
    return this.images[0] || "/placeholder-earring.png";
  }

  hasUseCase(use) {
    return this.useCase.includes(use);
  }

  isFeatured() {
    return this.featured && this.visible;
  }

  formattedPrice() {
    if (!this.price) return null;
    return `₹${this.price.toLocaleString("en-IN")}`;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      type: this.type,
      description: this.description,
      material: this.material,
      purity: this.purity,
      use_case: this.useCase,
      images: this.images,
      price: this.price,
      currency: this.currency,
      price_note: this.priceNote,
      cta: this.cta,
      featured: this.featured,
      visible: this.visible,
      order: this.order
    };
  }
}

export default Earring;
