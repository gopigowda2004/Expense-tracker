package com.expensetracker.repository;

import com.expensetracker.entity1.Expense;
import com.expensetracker.entity1.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
}
