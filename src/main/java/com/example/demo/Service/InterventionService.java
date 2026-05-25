package com.example.demo.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Affectation;
import com.example.demo.Model.Intervention;
import com.example.demo.Repository.AffectationRepository;
import com.example.demo.Repository.InterventionRepository;

@Service
public class InterventionService {

	@Autowired
	InterventionRepository interventionrepo;

	@Autowired
	AffectationRepository affectationrepo;

	private double calculateProgress(int interventionId) {
		List<Affectation> affectations = affectationrepo.findByInterventionId(interventionId);
		if (affectations.isEmpty()) return 0;
		long completed = affectations.stream().filter(a -> "TERMINE".equals(a.getStatus())).count();
		return Math.round((completed * 100.0 / affectations.size()) * 100.0) / 100.0;
	}

	private void setProgresses(List<Intervention> interventions) {
		for (Intervention inter : interventions) {
			inter.setProgress(calculateProgress(inter.getId()));
		}
	}

	public Intervention saveIntervention(Intervention intervention) {
		if (intervention.getStatus() == null) {
			intervention.setStatus("EN_ATTENTE");
		}
		if (intervention.getAdmin() != null && intervention.getAdmin().getName() != null) {
			intervention.setAdminName(intervention.getAdmin().getName());
		}
		return interventionrepo.save(intervention);
	}

	public Optional<Intervention> getInterventionById(int id) {
		Optional<Intervention> opt = interventionrepo.findById(id);
		opt.ifPresent(inter -> inter.setProgress(calculateProgress(id)));
		return opt;
	}

	public List<Intervention> getAllInterventions() {
		List<Intervention> interventions = interventionrepo.findAll();
		setProgresses(interventions);
		return interventions;
	}

	public void deleteIntervention(int id) {
		interventionrepo.deleteById(id);
	}

	public Intervention updateIntervention(int id, Intervention intervention) {
		if (interventionrepo.existsById(id)) {
			intervention.setId(id);
			Intervention saved = interventionrepo.save(intervention);
			saved.setProgress(calculateProgress(id));
			return saved;
		}
		return null;
	}

	public List<Intervention> searchInterventions(String titre, String status, Date dateDebut, Date dateFin) {
		List<Intervention> interventions = interventionrepo.searchInterventions(titre, status, dateDebut, dateFin);
		setProgresses(interventions);
		return interventions;
	}

	public List<Intervention> getInterventionsByAdminId(int adminId) {
		List<Intervention> interventions = interventionrepo.findByAdminId(adminId);
		setProgresses(interventions);
		return interventions;
	}

	public List<Intervention> getByTitreContaining(String titre) {
		List<Intervention> interventions = interventionrepo.findByTitreContaining(titre);
		setProgresses(interventions);
		return interventions;
	}

	public List<Intervention> getByStatus(String status) {
		List<Intervention> interventions = interventionrepo.findByStatus(status);
		setProgresses(interventions);
		return interventions;
	}
}
