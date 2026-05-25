package com.example.demo.Controller;

import java.util.Date;
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

import com.example.demo.Model.Intervention;
import com.example.demo.Service.InterventionService;

@RestController
@RequestMapping("/api/interventions")
public class InterventionController {

	@Autowired
	InterventionService interventionServ;

	@PostMapping
	public ResponseEntity<?> createIntervention(@RequestBody Intervention intervention) {
		Intervention saved = interventionServ.saveIntervention(intervention);
		return ResponseEntity.ok(saved);
	}

	@GetMapping
	public ResponseEntity<List<Intervention>> getAllInterventions() {
		return ResponseEntity.ok(interventionServ.getAllInterventions());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getInterventionById(@PathVariable int id) {
		Optional<Intervention> opt = interventionServ.getInterventionById(id);
		if (opt.isPresent()) {
			return ResponseEntity.ok(opt.get());
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateIntervention(@PathVariable int id, @RequestBody Intervention intervention) {
		Intervention updated = interventionServ.updateIntervention(id, intervention);
		if (updated != null) {
			return ResponseEntity.ok(updated);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteIntervention(@PathVariable int id) {
		if (interventionServ.getInterventionById(id).isPresent()) {
			interventionServ.deleteIntervention(id);
			return ResponseEntity.ok("Intervention supprimée");
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/search")
	public ResponseEntity<List<Intervention>> searchInterventions(
			@RequestParam(required = false) String titre,
			@RequestParam(required = false) String status,
			@RequestParam(required = false) Date dateDebut,
			@RequestParam(required = false) Date dateFin) {
		return ResponseEntity.ok(interventionServ.searchInterventions(titre, status, dateDebut, dateFin));
	}

	@GetMapping("/admin/{adminId}")
	public ResponseEntity<List<Intervention>> getInterventionsByAdminId(@PathVariable int adminId) {
		return ResponseEntity.ok(interventionServ.getInterventionsByAdminId(adminId));
	}

	@GetMapping("/status/{status}")
	public ResponseEntity<List<Intervention>> getByStatus(@PathVariable String status) {
		return ResponseEntity.ok(interventionServ.getByStatus(status));
	}
}
