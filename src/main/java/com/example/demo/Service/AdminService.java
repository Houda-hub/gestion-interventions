package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Admin;
import com.example.demo.Repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository adminrepo;

	public Admin saveAdmin(Admin admin) {
		admin.setRole("ADMIN");
		admin.setLogin(false);
		return adminrepo.save(admin);
	}

	public Optional<Admin> getAdminById(int id) {
		return adminrepo.findById(id);
	}

	public List<Admin> getAllAdmins() {
		return adminrepo.findAll();
	}

	public void deleteAdmin(int id) {
		adminrepo.deleteById(id);
	}

	public Admin updateAdmin(int id, Admin admin) {
		if (adminrepo.existsById(id)) {
			admin.setId(id);
			admin.setRole("ADMIN");
			return adminrepo.save(admin);
		}
		return null;
	}

	public boolean existsByEmail(String email) {
		return adminrepo.findAll().stream().anyMatch(a -> a.getEmail().equals(email));
	}
}
