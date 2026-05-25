package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Technicien;
import com.example.demo.Service.TechnicienService;

@RestController
@RequestMapping("/api/techniciens")
public class TechnicienController {

	@Autowired
	TechnicienService technicienServ;

	@PostMapping
	public ResponseEntity<?> createTechnicien(@RequestBody Technicien technicien) {
		Technicien saved = technicienServ.saveTechnicien(technicien);
		return ResponseEntity.ok(saved);
	}

	@GetMapping
	public ResponseEntity<List<Technicien>> getAllTechniciens() {
		return ResponseEntity.ok(technicienServ.getAllTechniciens());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getTechnicienById(@PathVariable int id) {
		Optional<Technicien> opt = technicienServ.getTechnicienById(id);
		if (opt.isPresent()) {
			return ResponseEntity.ok(opt.get());
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateTechnicien(@PathVariable int id, @RequestBody Technicien technicien) {
		Technicien updated = technicienServ.updateTechnicien(id, technicien);
		if (updated != null) {
			return ResponseEntity.ok(updated);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTechnicien(@PathVariable int id) {
		if (technicienServ.getTechnicienById(id).isPresent()) {
			technicienServ.deleteTechnicien(id);
			return ResponseEntity.ok("Technicien supprimé");
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/search")
	public ResponseEntity<List<Technicien>> searchTechniciens(
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String specialite,
			@RequestParam(required = false) String email) {
		return ResponseEntity.ok(technicienServ.searchTechniciens(name, specialite, email));
	}

	@GetMapping("/search/name")
	public ResponseEntity<List<Technicien>> searchByName(@RequestParam String name) {
		return ResponseEntity.ok(technicienServ.getByNameContaining(name));
	}
}
