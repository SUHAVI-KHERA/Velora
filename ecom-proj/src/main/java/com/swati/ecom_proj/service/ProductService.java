package com.swati.ecom_proj.service;

import com.swati.ecom_proj.model.Product;
import com.swati.ecom_proj.repo.productRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private productRepo repo;

    public List<Product> getAllProducts() {

        return repo.findAll();
    }

    public Product getProductById(int id) {

        return repo.findById(id).orElse(null);
    }

    public Product addproduct(Product product, MultipartFile imageFile) throws IOException {

        String name = imageFile.getOriginalFilename();
        byte[]  data = imageFile.getBytes();
        String mimeType = imageFile.getContentType();


        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageDate(imageFile.getBytes());
        return repo.save(product);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        product.setImageDate(imageFile.getBytes());
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        return repo.save(product);
    }

    public void deleteProduct(int id) {

        repo.deleteById(id);

    }

}