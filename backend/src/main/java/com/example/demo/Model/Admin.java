package com.example.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@DiscriminatorValue("Admin")
@Data
public class Admin extends User {
	@JsonIgnore
	@OneToMany(mappedBy = "admin", fetch = FetchType.LAZY)
	private List<Intervention> listintervontions;

}
