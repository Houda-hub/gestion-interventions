package com.example.demo.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Affectation;
import com.example.demo.Model.Intervention;
import com.example.demo.Model.TechInterId;
import com.example.demo.Model.Technicien;
import com.example.demo.Repository.AffectationRepository;
import com.example.demo.Repository.InterventionRepository;
import com.example.demo.Repository.TechnicienRepository;

@Service
public class AffectationService {

	@Autowired
	AffectationRepository affectationrepo;

	@Autowired
	TechnicienRepository technicienrepo;

	@Autowired
	InterventionRepository interventionrepo;

	public Affectation saveAffectation(Affectation affectation) {
		if (affectation.getDateAffectation() == null) {
			affectation.setDateAffectation(new Date());
		}
		if (affectation.getStatus() == null) {
			affectation.setStatus("ASSIGNE");
		}
		return affectationrepo.save(affectation);
	}

	public Affectation assignerIntervention(int technicienId, int interventionId) {
		Optional<Technicien> optTech = technicienrepo.findById(technicienId);
		Optional<Intervention> optInter = interventionrepo.findById(interventionId);

		if (optTech.isPresent() && optInter.isPresent()) {
			Affectation affectation = new Affectation();
			TechInterId id = new TechInterId();
			id.setId_technicien(technicienId);
			id.setId_intervention(interventionId);
			affectation.setId(id);
			affectation.setTechnicien(optTech.get());
			affectation.setIntervention(optInter.get());
			affectation.setTechnicienName(optTech.get().getName());
			affectation.setInterventionTitre(optInter.get().getTitre());
			affectation.setDateAffectation(new Date());
			affectation.setStatus("ASSIGNE");
			return affectationrepo.save(affectation);
		}
		return null;
	}

	public Optional<Affectation> getAffectationById(TechInterId id) {
		return affectationrepo.findById(id);
	}

	public List<Affectation> getAllAffectations() {
		return affectationrepo.findAll();
	}

	public void deleteAffectation(int technicienId, int interventionId) {
		TechInterId id = new TechInterId();
		id.setId_technicien(technicienId);
		id.setId_intervention(interventionId);
		affectationrepo.deleteById(id);
	}

	public List<Affectation> getAffectationsByInterventionId(int interventionId) {
		return affectationrepo.findByInterventionId(interventionId);
	}

	public List<Affectation> getAffectationsByTechnicienId(int technicienId) {
		return affectationrepo.findByTechnicienId(technicienId);
	}

	public List<Affectation> getAffectationsByStatus(String status) {
		return affectationrepo.findByStatus(status);
	}

	public Affectation updateStatus(int technicienId, int interventionId, String newStatus) {
		TechInterId id = new TechInterId();
		id.setId_technicien(technicienId);
		id.setId_intervention(interventionId);
		Optional<Affectation> opt = affectationrepo.findById(id);
		if (opt.isPresent()) {
			Affectation affectation = opt.get();
			affectation.setStatus(newStatus);
			affectationrepo.save(affectation);

			List<Affectation> allAffectations = affectationrepo.findByInterventionId(interventionId);
			long total = allAffectations.size();
			long completed = allAffectations.stream().filter(a -> "TERMINE".equals(a.getStatus())).count();

			if (total > 0 && completed == total) {
				Optional<Intervention> optInter = interventionrepo.findById(interventionId);
				optInter.ifPresent(inter -> {
					inter.setStatus("TERMINE");
					interventionrepo.save(inter);
				});
			}

			return affectation;
		}
		return null;
	}

	public double getProgressPercentage(int interventionId) {
		List<Affectation> affectations = affectationrepo.findByInterventionId(interventionId);
		if (affectations.isEmpty()) return 0;
		long completed = affectations.stream().filter(a -> "TERMINE".equals(a.getStatus())).count();
		return Math.round((completed * 100.0 / affectations.size()) * 100.0) / 100.0;
	}
}
