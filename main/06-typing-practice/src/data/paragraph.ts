class Paragraphs {
  paragraphs: { easy: string[]; moderate: string[]; hard: string[] } = {
    easy: [
      "The sun rises in the east, and it sets in the west. Every morning begins with golden light spreading across the sky, waking birds and people alike. At night, the sun goes down, the moon shines, and stars twinkle brightly in the dark sky. This daily cycle of sunrise and sunset reminds us that time never stops, and each day is a new opportunity.",

      "Water is one of the most important resources for life. We use it for drinking, cooking, cleaning, and growing crops. Animals and plants also depend on water to survive. Without water, life cannot exist on Earth. That is why people say, 'Water is life.' We must save it and never waste it.",

      "Books are wonderful friends that teach, guide, and inspire us. They take us into new worlds and allow us to experience stories from different times and places. Reading regularly improves our knowledge and also helps us relax after a long day. Good books stay in our minds forever.",

      "Good health is the greatest wealth a person can have. To stay healthy, we must eat nutritious food, drink clean water, and exercise daily. Sleeping well and waking up on time also keep the body strong. When we are healthy, we can enjoy life better and work hard toward our dreams.",

      "Nature is beautiful with trees, rivers, mountains, and skies. It provides us with fresh air, food, and water. Birds sing sweetly in the morning, flowers spread their fragrance, and greenery makes our world lively. We must protect nature and keep our environment clean for the future.",
    ],
    moderate: [
      "Discipline is the secret to success—it builds habits, focus, and patience. Students who revise daily, instead of waiting for exams, score 40% better on average. Discipline matters not only in studies but also in sports & work life. A wise person once said, 'Discipline is choosing what you want most over what you want now.' Though it feels difficult at first, discipline becomes a lifelong strength.",

      "Traveling teaches lessons that no classroom can offer. We meet new people, explore different cultures, and taste unique food & music. Each journey changes the way we see the world—it broadens our mind and refreshes our soul. Even a short trip of 100 km can give more knowledge than hours of lectures. Truly, travel = education + adventure.",

      "Honesty is one of the most powerful virtues. An honest person earns trust, love, and long-lasting respect. On the other hand, dishonesty may give quick success, but it always ends in failure. Someone once said, 'Honesty is the first chapter in the book of wisdom.' In personal life, studies, and business, honesty works better than tricks & lies.",

      "Technology has changed how we live—phones, laptops, and the internet connect people instantly. Work is faster, communication is easier, and information spreads widely. But with comfort also come risks: privacy, addiction, and misuse. We must use technology wisely, balancing online & offline life.",

      "Health is wealth! Eating fresh fruits, vegetables, and protein gives us strength. Regular exercise keeps the body fit and the mind active. Doctors say 30 minutes of daily walking reduces health risks by nearly 20%. Without health, money & success mean nothing—so we must take care of it every day.",
    ],
    hard: [
      "Education is not only about facts (2+2=4) but about critical thinking > memorization. A truly educated person adapts to change, solves problems, and inspires others. In today’s world, subjects like AI, robotics, and data-science are rising in demand; yet values such as kindness, honesty, and empathy remain essential. Knowledge without values < wisdom. True learning is a balance {skills + values}, and only then can progress be meaningful.",

      "Technology is advancing fast: AI, IoT, 5G, robotics, and quantum computing—all shaping modern life @ home, work, and school. While innovation = growth, it raises new questions: privacy? security? employment? For example, self-driving cars may reduce accidents by 40%, but they could also remove jobs for drivers. The equation is clear: innovation + ethics > blind progress.",

      "The universe is full of mysteries! Stars, planets, galaxies—even black holes [darker than imagination]—continue to surprise scientists. Space research gives us practical benefits like GPS navigation, satellite TV, and weather forecasting. But exploration is costly ($$$) and risky (0.001% margin of error can cause disaster). Still, curiosity keeps humans exploring further—Mars, Jupiter, and maybe beyond!",

      "Modern life = balance {work + play}. Without it, stress > happiness, and peace < success. Many people chase money @ all costs, but they forget health, relationships, and mental peace. A better formula: success = health + happiness + purpose. Missing any one element leads to imbalance in life.",

      "Cybersecurity has become a major challenge in the 21st century. Hackers use tricks like phishing, DDoS attacks, and malware to steal data. Strong passwords [Aa-Zz-0-9-@-#] and 2FA (two-factor authentication) reduce risks by 70%. Still, cybercrime costs the world more than $1 trillion yearly! The solution = awareness + technology + discipline.",
    ],
  }

  selectParagraph(mode: "easy" | "moderate" | "hard" = "easy") {
    return this.paragraphs[mode][
      Math.floor(Math.random() * this.paragraphs[mode].length)
    ]
  }
}

export default Paragraphs
