package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Technicien;
import com.example.demo.Repository.TechnicienRepository;

@Service
public class TechnicienService {

	@Autowired
	TechnicienRepository technicienrepo;

	public Technicien saveTechnicien(Technicien technicien) {
		technicien.setRole("TECHNICIEN");
		technicien.setLogin(false);
		return technicienrepo.save(technicien);
	}

	public Optional<Technicien> getTechnicienById(int id) {
		return technicienrepo.findById(id);
	}

	public List<Technicien> getAllTechniciens() {
		return technicienrepo.findAll();
	}

	public void deleteTechnicien(int id) {
		technicienrepo.deleteById(id);
	}

	public Technicien updateTechnicien(int id, Technicien technicien) {
		if (technicienrepo.existsById(id)) {
			technicien.setId(id);
			technicien.setRole("TECHNICIEN");
			return technicienrepo.save(technicien);
		}
		return null;
	}

	public List<Technicien> searchTechniciens(String name, String specialite, String email) {
		return technicienrepo.searchTechniciens(name, specialite, email);
	}

	public List<Technicien> getByNameContaining(String name) {
		return technicienrepo.findByNameContaining(name);
	}
}
