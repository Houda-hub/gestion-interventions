package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Model.Technicien;

public interface TechnicienRepository extends JpaRepository <Technicien ,Integer>{
	
	List<Technicien> findByNameContaining(String name);

	List<Technicien> findBySpecialitContaining(String specialite);

	List<Technicien> findByEmail(String email);

	@Query("SELECT t FROM Technicien t WHERE " +
	       "(:name IS NULL OR t.name LIKE %:name%) AND " +
	       "(:specialite IS NULL OR t.specialit LIKE %:specialite%) AND " +
	       "(:email IS NULL OR t.email = :email)")
	List<Technicien> searchTechniciens(String name, String specialite, String email);
}
