const express = require("express");
const router = express.Router();

const db = require("../models");
const Expense = db.Expense;
const Category = db.Category;

const dayjs = require("dayjs");
const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

router.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 12; // 12 items per page
  const userId = req.user.id;
  const sortBy = req.query.sortBy;

    // dropdown box setting
    const sortOptionsMap = {
      housing_asc: { categoryFilter: 1, order: [["name", "ASC"]] },
      transportation_asc: { categoryFilter: 2, order: [["name", "ASC"]] },
      leisure_asc: { categoryFilter: 3, order: [["name", "ASC"]] },
      food_asc: { categoryFilter: 4, order: [["name", "ASC"]] },
      others_asc: { categoryFilter: 5, order: [["name", "ASC"]] },
      name_asc: { order: [["name", "ASC"]] },
      name_desc: { order: [["name", "DESC"]] },
      date_asc: { order: [["date", "ASC"]] },
      date_desc: { order: [["date", "DESC"]] },
      amount_asc: { order: [["amount", "ASC"]] },
      amount_desc: { order: [["amount", "DESC"]] },
    };

  try {

    const { categoryFilter, order } = sortOptionsMap[sortBy] || {};
    let whereCondition = { userId };
    if (categoryFilter !== undefined) {
      whereCondition.categoryId = categoryFilter;
    }
    const orderOption = order || [["name", "ASC"]];

    // calculate the total amount of expenses
    const totalAmount = await Expense.sum("amount", { where: whereCondition });

    // retrieve all expenses
    const expenses = await Expense.findAll({
      attributes: ["id", "name", "date", "amount", "userId", "categoryId"],
      where: whereCondition,
      order: orderOption,
      offset: (page - 1) * limit,
      limit,
      raw: true,
    });

    const categoriesData = await Category.findAll({
      attributes: ["id", "name", "icon"],
      raw: true,
    });

    // Convert category data into an object indexed by id for easy lookup
    const categoriesMap = {};
    categoriesData.forEach((category) => {
      categoriesMap[category.id] = category;
    });

    // Map categoryId to corresponding icon and name, and format the date
    expenses.forEach((expense) => {
      const category = categoriesMap[expense.categoryId];
      if (category) {
        expense.categoryName = category.name;
        expense.icon = category.icon;
      }
      expense.formattedDate = formatDate(new Date(expense.date));
    });

    res.render("index", {
      expenses,
      categoriesData,
      totalAmount,
      order: sortBy,
      prev: page > 1 ? page - 1 : page, // if the current page > 1 , minus 1 ; otherwise, show the current page
      next: page + 1,
      page, // the current page
    });
  } catch (error) {
    error.errorMessage = "Failed to load";
    next(error);
  }
})

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/", (req, res, next) => {
  const { name, date, amount, categoryId } = req.body;
  const userId = req.user.id;

  return Expense.create({ name, date, amount, userId, categoryId })
    .then(() => {
      req.flash("success", "Added successfully");
      res.redirect("/Expense-Tracker");
    })
    .catch((error) => {
      error.errorMessage = "Failed to create";
      next(error);
    });
});

router.get("/:id/edit", (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  return Expense.findByPk(id, {
    attributes: ["id", "name", "date", "amount", "userId", "categoryId"],
    raw: true,
  })
    .then((expense) => {
      if (!expense) {
        req.flash("error", "Data not found");
        return res.redirect("/Expense-Tracker");
      }
      if (expense.userId !== userId) {
        req.flash("error", "Unauthorized access");
        return res.redirect("/Expense-Tracker");
      }
      expense.formattedDate = formatDate(new Date(expense.date));

      res.render("edit", {
        expense,
        date: expense.formattedDate,
      });
    })
    .catch((error) => {
      error.errorMessage = "Failed to edit";
      next(error);
    });
});

router.put("/:id", (req, res, next) => {
  const { name, date, amount, categoryId } = req.body;
  const id = req.params.id;
  const userId = req.user.id;

  return Expense.findByPk(id, {
    attributes: ["id", "name", "date", "amount", "userId", "categoryId"],
  }).then((expense) => {
    if (!expense) {
      req.flash("error", "Data not found");
      return res.redirect("/Expense-Tracker");
    }
    if (expense.userId !== userId) {
      req.flash("error", "Unauthorized access");
      return res.redirect("/Expense-Tracker");
    }
    expense.formattedDate = formatDate(new Date(expense.date));
    
    return expense
      .update({ name, date, amount, categoryId })
      .then(() => {
        console.log("expense", expense);
        req.flash("success", "Edited successfully");
        res.redirect("/Expense-Tracker");
      })
      .catch((error) => {
        error.errorMessage = "Failed to edit";
        next(error);
      });
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  return Expense.findByPk(id, {
    attributes: ["id", "name", "date", "amount", "userId", "categoryId"],
  }).then((expense) => {
    if (!expense) {
      req.flash("error", "Data not found");
      return res.redirect("/Expense-Tracker");
    }
    if (expense.userId !== userId) {
      req.flash("error", "Unauthorized access");
      return res.redirect("/Expense-Tracker");
    }
    return expense.destroy()
      .then(() => {
        req.flash("success", "Deleted successfully");
        res.redirect("/Expense-Tracker");
      })
      .catch((error) => {
        error.errorMessage = "Failed to delete";
        next(error);
      });
  });
});

// 匯出路由器
module.exports = router;
