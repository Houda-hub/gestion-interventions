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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Affectation;
import com.example.demo.Model.TechInterId;
import com.example.demo.Service.AffectationService;

@RestController
@RequestMapping("/api/affectations")
public class AffectationController {

	@Autowired
	AffectationService affectationServ;

	@PostMapping("/assign")
	public ResponseEntity<?> assignerIntervention(
			@RequestParam int technicienId,
			@RequestParam int interventionId) {
		Affectation affectation = affectationServ.assignerIntervention(technicienId, interventionId);
		if (affectation != null) {
			return ResponseEntity.ok(affectation);
		}
		return ResponseEntity.badRequest().body("Technicien ou Intervention introuvable");
	}

	@GetMapping
	public ResponseEntity<List<Affectation>> getAllAffectations() {
		return ResponseEntity.ok(affectationServ.getAllAffectations());
	}

	@GetMapping("/intervention/{interventionId}")
	public ResponseEntity<List<Affectation>> getByInterventionId(@PathVariable int interventionId) {
		return ResponseEntity.ok(affectationServ.getAffectationsByInterventionId(interventionId));
	}

	@GetMapping("/technicien/{technicienId}")
	public ResponseEntity<List<Affectation>> getByTechnicienId(@PathVariable int technicienId) {
		return ResponseEntity.ok(affectationServ.getAffectationsByTechnicienId(technicienId));
	}

	@GetMapping("/status/{status}")
	public ResponseEntity<List<Affectation>> getByStatus(@PathVariable String status) {
		return ResponseEntity.ok(affectationServ.getAffectationsByStatus(status));
	}

	@PutMapping("/status")
	public ResponseEntity<?> updateStatus(
			@RequestParam int technicienId,
			@RequestParam int interventionId,
			@RequestParam String newStatus) {
		Affectation updated = affectationServ.updateStatus(technicienId, interventionId, newStatus);
		if (updated != null) {
			return ResponseEntity.ok(updated);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping
	public ResponseEntity<?> deleteAffectation(
			@RequestParam int technicienId,
			@RequestParam int interventionId) {
		TechInterId id = new TechInterId();
		id.setId_technicien(technicienId);
		id.setId_intervention(interventionId);
		Optional<Affectation> opt = affectationServ.getAffectationById(id);
		if (opt.isPresent()) {
			affectationServ.deleteAffectation(technicienId, interventionId);
			return ResponseEntity.ok("Affectation supprimée");
		}
		return ResponseEntity.notFound().build();
	}
}
