package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Affectation;
import com.example.demo.Model.TechInterId;


public interface AffectationRepository extends JpaRepository <Affectation ,TechInterId> {

	List<Affectation> findByInterventionId(int interventionId);

	List<Affectation> findByTechnicienId(int technicienId);

	List<Affectation> findByStatus(String status);
}
