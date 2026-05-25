package com.example.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.Objects;

@Embeddable
@Data
public class TechInterId {
	@Column(name ="intervention_id")
	private int id_intervention;
	@Column(name ="technicien_id")
	private int id_technicien;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		TechInterId that = (TechInterId) o;
		return id_intervention == that.id_intervention && id_technicien == that.id_technicien;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id_intervention, id_technicien);
	}
}
