-- Create the database
CREATE DATABASE ProductsDB;

-- Use the database
USE ProductsDB;

-- Create the categories table
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(50) NOT NULL
);

-- Insert sample data into the categories table
INSERT INTO Categories (CategoryName)
VALUES 
('Rainy'),
('Sunny'),
('Snowy'),
('Windy');

-- Create the products table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    CategoryID INT,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    DateAdded DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Insert sample data into the products table
INSERT INTO Products (ProductName, CategoryID, Price, StockQuantity)
VALUES 
('Sunglasses', 2, 199.99, 75),
('SnowShovel', 3, 59.99, 80),
('WinterJacket', 3, 299.99, 60),
('Windbreaker', 4, 149.99, 120),
('Kite', 4, 29.99, 40);
('RainBoots', 1, 89.99, 200),
('Sunscreen', 2, 10.97, 150);