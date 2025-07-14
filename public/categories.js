const predefinedCategories = {
    "Food & Drink": {
        "Restaurant": ["American", "Asian", "Italian", "Mexican", "Japanese", "Chinese", "Sushi", "Takeout", "Gourmet"],
        "Cafe": ["Coffee Shop", "Tea House", "Bakery"],
        "Bar": ["Pub", "Sports Bar", "Cocktail Lounge"],
        // Add more subs/sub-subs as needed
    },
    "Home Services": {
        "Cleaning": ["House Cleaning", "Carpet Cleaning", "Window Washing"],
        "Plumbing": ["Repair", "Installation", "Emergency"],
        "Electrical": ["Wiring", "Lighting", "Appliance Repair"],
        // Add more
    },
    "Professional Services": {
        "Real Estate": ["Residential", "Commercial", "Land", "Agent", "Broker"],
        "Legal": ["Family Law", "Criminal Defense", "Business Law"],
        "Financial": ["Accounting", "Tax Preparation", "Financial Planning"],
        // Add more
    },
    "Retail": {
        "Clothing": ["Men's", "Women's", "Children's", "Designer"],
        "Electronics": ["Computers", "Phones", "Appliances"],
        "Books": ["New", "Used", "Specialty"],
        // Add more
    },
    "Entertainment": {
        "Movies": ["Theater", "Drive-In"],
        "Theater": ["Live Shows", "Musicals"],
        "Amusement Parks": ["Theme Parks", "Water Parks"],
        // Add more
    },
    "Health": {
        "Gym": ["Fitness Center", "Yoga Studio", "CrossFit"],
        "Medical": ["Clinic", "Hospital", "Specialist"],
        "Dental": ["General", "Orthodontics", "Cosmetic"],
        // Add more
    },
    "Education": {
        "Schools": ["Elementary", "High School", "College"],
        "Tutoring": ["Math", "Science", "Languages"],
        "Classes": ["Art", "Music", "Cooking"],
        // Add more
    },
    "Other": []  // Flat options if no subs
};

export { predefinedCategories };