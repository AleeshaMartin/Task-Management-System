package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Members {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long value;
	private String label;
    private Long project_id;

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getValue() {
		return value;
	}
	public void setValue(Long value) {
		this.value = value;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	@Override
	public String toString() {
		return "Members [id=" + id + ", value=" + value + ", label=" + label + ", getId()=" + getId() + ", getValue()="
				+ getValue() + ", getLabel()=" + getLabel() + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	public Members(Long id, Long value, String label) {
		super();
		this.id = id;
		this.value = value;
		this.label = label;
	}
	public Members() {
		super();
	}
	public Long getProject_id() {
		return project_id;
	}
	public void setProject_id(Long projectid) {
		this.project_id = projectid;
	}
	
	

}
