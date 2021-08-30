DROP TABLE IF EXISTS has_product_store CASCADE;

-- HAS PRODUCT IN STORE
CREATE TABLE has_product_store (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  link_to_product TEXT
);