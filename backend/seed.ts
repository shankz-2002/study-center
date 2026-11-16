import "dotenv/config";
import { AppDataSource } from "./src/database/config.js";
import { xssData } from "./src/seed/cybersecurity.js";
import { sqlInjectionData } from "./src/seed/sql-injection.js";
import { csrfData } from "./src/seed/csrf.js";
import { networkFundamentalsData } from "./src/seed/network-fundamentals.js";
import { portScanningData } from "./src/seed/port-scanning.js";
import { networkProtocolVulnerabilitiesData } from "./src/seed/network-protocol-vulnerabilities.js";
import { introductionToAgricultureData } from "./src/seed/introduction-to-agriculture.js";
import { typesOfFarmingData } from "./src/seed/types-of-farming.js";

const topics = [
  xssData,
  sqlInjectionData,
  csrfData,
  networkFundamentalsData,
  portScanningData,
  networkProtocolVulnerabilitiesData,
  introductionToAgricultureData,
  typesOfFarmingData
];

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    const fieldRepo = AppDataSource.getRepository("Fields");
    const categoryRepo = AppDataSource.getRepository("Category");
    const topicRepo = AppDataSource.getRepository("Topic");
    const levelRepo = AppDataSource.getRepository("Level");
    const learningRepo = AppDataSource.getRepository("Learning");
    const questionRepo = AppDataSource.getRepository("Question");

    for (const data of topics) {
      console.log(`\nSeeding: ${data.topicName}`);

      // 1. Find or create Field
      let field = await fieldRepo.findOne({
        where: { fieldName: data.fieldName },
      });

      if (!field) {
        field = await fieldRepo.save({
          fieldName: data.fieldName,
          description: data.fieldDescription,
        });
      }

      // 2. Find or create Category
      let category = await categoryRepo.findOne({
        where: {
          categoryName: data.categoryName,
          field: { id: (field as any).id },
        },
      });

      if (!category) {
        category = await categoryRepo.save({
          categoryName: data.categoryName,
          description: data.categoryDescription,
          field: { id: (field as any).id },
        });
      }

      // 3. Check for existing Topic
      const existingTopic = await topicRepo.findOne({
        where: {
          topicName: data.topicName,
          category: { id: (category as any).id },
        },
      });

      if (existingTopic) {
        console.log(`${data.topicName} already exists. Skipping.`);
        continue;
      }

      // 4. Create Topic
      const topic = await topicRepo.save({
        topicName: data.topicName,
        description: data.topicDescription,
        category: { id: (category as any).id },
      });

      // 5. Create Levels
      for (const levelData of data.levels) {
        const level = await levelRepo.save({
          levelName: levelData.levelName,
          description: levelData.description,
          order: levelData.order,
          topic: { id: (topic as any).id },
        });

        // 6. Insert Learning content
        for (const learning of levelData.learning) {
          await learningRepo.save({
            title: learning.title,
            content: learning.content,
            order: learning.order,
            level: { id: (level as any).id },
          });
        }

        // 7. Insert Questions
        for (const question of levelData.questions) {
          await questionRepo.save({
            question: question.question,
            questionType: question.questionType,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            order: question.order,
            level: { id: (level as any).id },
          });
        }

        console.log(`Created level: ${levelData.levelName}`);
      }

      console.log(`${data.topicName} seeded successfully!`);
    }

    console.log("\nAll seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

seed();
