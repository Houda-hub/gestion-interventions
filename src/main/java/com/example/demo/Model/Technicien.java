package com.example.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
@DiscriminatorValue("Technicien")
public class Technicien extends User {
	private String specialit;
	@JsonIgnore
	@OneToMany(mappedBy ="technicien", fetch = FetchType.LAZY)
	private List<Affectation> listaffectations;

}
