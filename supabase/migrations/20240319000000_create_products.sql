CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data if the table is empty
INSERT INTO products (name, description, price, image_url)
SELECT 
  'Basic Plan',
  'Entry level plan for small teams',
  1999,
  '/images/products/basic.png'
WHERE NOT EXISTS (SELECT 1 FROM products);

INSERT INTO products (name, description, price, image_url)
SELECT 
  'Pro Plan',
  'Advanced features for growing teams',
  4999,
  '/images/products/pro.png'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Pro Plan');

INSERT INTO products (name, description, price, image_url)
SELECT 
  'Enterprise Plan',
  'Full feature set for large organizations',
  9999,
  '/images/products/enterprise.png'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Enterprise Plan'); 