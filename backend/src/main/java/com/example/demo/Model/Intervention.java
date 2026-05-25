package com.example.demo.Model;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Intervention {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String titre;
	private String description;
	private Date dateIntervention;
	private String status;

	private double progress;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private Admin admin;

	private String adminName;

	@JsonIgnore
	@OneToMany(mappedBy="intervention", fetch = FetchType.LAZY)
	private List<Affectation> listaffectation;

}
