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

import com.example.demo.Model.Admin;
import com.example.demo.Model.User;
import com.example.demo.Service.AdminService;
import com.example.demo.Service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminCTRL {
	
	@Autowired
	UserService userserv;
	@Autowired
	AdminService adminserv;

	@PostMapping("/signup")
	public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
		if (adminserv.existsByEmail(admin.getEmail())) {
			return ResponseEntity.badRequest().body("Email déjà utilisé");
		}
		Admin saved = adminserv.saveAdmin(admin);
		return ResponseEntity.ok(saved);
	}
	
	@GetMapping
	public ResponseEntity<List<Admin>> getAllAdmins() {
		return ResponseEntity.ok(adminserv.getAllAdmins());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getAdminById(@PathVariable int id) {
		Optional<Admin> opt = adminserv.getAdminById(id);
		if (opt.isPresent()) {
			return ResponseEntity.ok(opt.get());
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
		Admin updated = adminserv.updateAdmin(id, admin);
		if (updated != null) {
			return ResponseEntity.ok(updated);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable int id) {
		if (adminserv.getAdminById(id).isPresent()) {
			adminserv.deleteAdmin(id);
			return ResponseEntity.ok("Admin supprimé");
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
		User user = userserv.login(email, password);
		if (user != null) {
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.badRequest().body("Email ou mot de passe incorrect");
	}
}
