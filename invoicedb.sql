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

CREATE TABLE invoice (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   total DECIMAL(8,2) NOT NULL,
   invoice_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoice_line (
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   item VARCHAR(255) NOT NULL,
   price DECIMAL(8,2) NOT NULL,
   quantity INT NOT NULL,
   amount DECIMAL(8,2) NOT NULL,
   invoice_id INT,
   created_at TIMESTAMP DEFAULT NOW(),
   FOREIGN KEY (invoice_id) REFERENCES invoice(id)
);


