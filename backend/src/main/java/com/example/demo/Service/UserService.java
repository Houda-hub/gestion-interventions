package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userrepo;

	public User saveUser(User user) {
		return userrepo.save(user);
	}

	public Optional<User> getUserById(int id) {
		return userrepo.findById(id);
	}

	public List<User> getAllUsers() {
		return userrepo.findAll();
	}

	public void deleteUser(int id) {
		userrepo.deleteById(id);
	}

	public Optional<User> getUserByEmail(String email) {
		return userrepo.findUserByEmail(email);
	}

	public boolean existsByEmail(String email) {
		return userrepo.findUserByEmail(email).isPresent();
	}

	public User login(String email, String password) {
		Optional<User> optUser = userrepo.findUserByEmail(email);
		if (optUser.isPresent()) {
			User user = optUser.get();
			if (user.getPassword().equals(password)) {
				user.setLogin(true);
				return userrepo.save(user);
			}
		}
		return null;
	}
}
