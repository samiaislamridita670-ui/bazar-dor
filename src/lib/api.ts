
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.abcz.workers.dev/api/bazardor"
).replace(/\/+$/, "");

async function fetchAPI(endpoint: string) {
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Invalid JSON from ${url}. Response: ${text.slice(0, 200)}`
    );
  }
}

function extractArray(data: unknown): any[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object") {
    if ("products" in data && Array.isArray(data.products)) {
      return data.products;
    }

    if ("categories" in data && Array.isArray(data.categories)) {
      return data.categories;
    }
  }

  return [];
}

export async function getProducts() {
  const data = await fetchAPI("/products");
  return extractArray(data);
}

export async function getCategories() {
  const data = await fetchAPI("/categories");
  return extractArray(data);
}

export async function getProduct(slug: string) {
  const products = await getProducts();

  const product = products.find(
    (item: { slug?: string }) => item.slug === slug
  );

  if (!product) {
    throw new Error(`Product not found: ${slug}`);
  }

  return product;
}

export async function getProductsByCategory(category: string) {
  const products = await getProducts();

  return products.filter(
    (product: { category?: string }) => product.category === category
  );
}

export async function getLimitedProducts(limit: number) {
  const products = await getProducts();

  return products.slice(0, Math.max(0, limit));
}
