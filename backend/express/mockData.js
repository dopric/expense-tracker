const data = {
    categories: [
        { id: 1, name: 'Food & Drinks', budget: 1000 },
        { id: 2, name: 'Housing', budget: 2000 },
        { id: 3, name: 'Transportation', budget: 500 },
        { id: 4, name: 'Utilities', budget: 300 },
        { id: 5, name: 'Healthcare', budget: 200 },
        { id: 6, name: 'Insurance', budget: 100 },
        { id: 7, name: 'Clothing', budget: 300 },
        { id: 8, name: 'Education', budget: 200 },
        { id: 9, name: 'Entertainment', budget: 100 },
        { id: 10, name: 'Miscellaneous', budget: 200 }
    ],
    expenses: [
        { id: 1, categoryId: 1, description: 'Groceries', amount: 200 },
        { id: 2, categoryId: 1, description: 'Dining Out', amount: 100 },
        { id: 3, categoryId: 2, description: 'Rent', amount: 1000 },
        { id: 4, categoryId: 3, description: 'Gas', amount: 50 },
        { id: 5, categoryId: 3, description: 'Parking', amount: 25 },
        { id: 6, categoryId: 4, description: 'Electricity', amount: 100 },
        { id: 7, categoryId: 4, description: 'Water', amount: 50 },
        { id: 8, categoryId: 5, description: 'Doctor', amount: 100 },
        { id: 9, categoryId: 5, description: 'Medicine', amount: 50 },
        { id: 10, categoryId: 6, description: 'Car Insurance', amount: 100 },
        { id: 11, categoryId: 7, description: 'Shoes', amount: 100 },
        { id: 12, categoryId: 7, description: 'Shirts', amount: 100 },
        { id: 13, categoryId: 8, description: 'Books', amount: 100 },
        { id: 14, categoryId: 9, description: 'Concert', amount: 100 },
        { id: 15, categoryId: 10, description: 'Gift', amount: 100 }
    ]
}

module.exports = data;
