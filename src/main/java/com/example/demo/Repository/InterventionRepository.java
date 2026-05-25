package com.example.demo.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Intervention;


public interface InterventionRepository extends JpaRepository < Intervention,Integer> {

	List<Intervention> findByTitreContaining(String titre);

	List<Intervention> findByStatus(String status);

	List<Intervention> findByDateIntervention(Date dateIntervention);

	@Query("SELECT i FROM Intervention i WHERE " +
	       "(:titre IS NULL OR i.titre LIKE %:titre%) AND " +
	       "(:status IS NULL OR i.status = :status) AND " +
	       "(:dateDebut IS NULL OR i.dateIntervention >= :dateDebut) AND " +
	       "(:dateFin IS NULL OR i.dateIntervention <= :dateFin)")
	List<Intervention> searchInterventions(@Param("titre") String titre,
			@Param("status") String status,
			@Param("dateDebut") Date dateDebut,
			@Param("dateFin") Date dateFin);

	List<Intervention> findByAdminId(int adminId);
}
