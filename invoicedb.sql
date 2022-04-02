CREATE DATABASE invoicedb;

use invoicedb;

CREATE TABLE products (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   brand VARCHAR(100) NOT NULL,
   item VARCHAR(255) NOT NULL,
   partnumber VARCHAR(255),
   price DECIMAL(8,2) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW()
);
