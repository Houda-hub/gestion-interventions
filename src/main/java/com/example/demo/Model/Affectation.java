package com.example.demo.Model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Data;

@Entity
@Data
public class Affectation {
	@EmbeddedId
	private TechInterId id = new TechInterId();
	private Date dateAffectation;
	private String status;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("id_technicien")
	@JoinColumn(name = "id_technicien")
	private Technicien technicien;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("id_intervention")
	@JoinColumn(name = "id_intervention")
	private Intervention intervention;

	private String technicienName;
	private String interventionTitre;

}
