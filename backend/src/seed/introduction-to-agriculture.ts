
import { QuestionType } from "../types/question.js";

export const introductionToAgricultureData = {
  fieldName: "Agriculture and Farming",
  fieldDescription:
    "Learn agricultural science, crop production, soil management, irrigation, plant protection, sustainable farming, and modern agricultural technologies.",
  categoryName: "Agricultural Fundamentals",
  categoryDescription:
    "Understand the foundations of agriculture, farming systems, agricultural seasons, and the tools used in farming.",
  topicName: "Introduction to Agriculture",
  topicDescription:
    "Learn the meaning, importance, history, branches, and role of agriculture in food production and economic development.",
  levels: [
    {
      levelName: "Agriculture Fundamentals",
      description:
        "Understand agriculture, its importance, major activities, and contribution to society.",
      order: 1,
      learning: [
        {
          title: "What is Agriculture?",
          order: 1,
          content: `# What is Agriculture?

## Definition

Agriculture is the science, art, and practice of cultivating plants and raising animals for food, raw materials, and other useful products.

It includes activities such as crop cultivation, livestock management, horticulture, fisheries, and forestry.

Agriculture is one of the oldest human activities and remains essential to human survival.

## Major agricultural activities

1. **Crop production:** Growing crops such as rice, wheat, maize, vegetables, and fruits.
2. **Animal husbandry:** Raising livestock such as cattle, goats, sheep, and poultry.
3. **Horticulture:** Cultivating fruits, vegetables, flowers, and ornamental plants.
4. **Fisheries:** Breeding, raising, and harvesting aquatic organisms.
5. **Forestry:** Managing forests and producing forest resources.

## Importance of agriculture

Agriculture provides:

- Food for human consumption.
- Fodder for livestock.
- Raw materials for industries.
- Employment and income.
- Export products and economic opportunities.

## Agriculture in India

India has diverse agricultural conditions because of variations in climate, soil, rainfall, and geography.

Major crops include rice, wheat, maize, pulses, cotton, sugarcane, tea, and spices.

Agriculture also supports many industries, including food processing, textiles, sugar, and dairy.

## Key takeaway

Agriculture is much broader than crop cultivation. It includes several interconnected activities that support food security, employment, and economic development.`,
        },
        {
          title: "History and Development of Agriculture",
          order: 2,
          content: `# History and Development of Agriculture

## Early agriculture

Early humans depended mainly on hunting and gathering.

Over time, people began cultivating plants and domesticating animals. This transition allowed communities to settle in permanent locations.

The development of agriculture supported population growth and the formation of villages and civilizations.

## Traditional agriculture

Traditional farming generally relied on:

- Human and animal labour.
- Locally available seeds.
- Organic manure.
- Traditional irrigation methods.
- Knowledge passed between generations.

These practices varied according to local soil, climate, and culture.

## Agricultural development in India

Indian agriculture has evolved through several stages.

### Traditional farming

Farmers used local crop varieties, animal power, seasonal rainfall, and traditional knowledge.

### Green Revolution

The Green Revolution introduced improved crop varieties, irrigation, fertilizers, and modern agricultural practices.

In India, it significantly increased wheat and rice production, particularly in regions with suitable infrastructure.

### Modern agriculture

Modern farming increasingly uses:

- Improved seeds.
- Mechanization.
- Scientific soil testing.
- Precision irrigation.
- Digital agricultural information.
- Improved crop protection methods.

## Challenges of agricultural development

Agricultural development must address:

- Soil degradation.
- Water scarcity.
- Climate variability.
- Pest and disease outbreaks.
- Rising input costs.
- Market uncertainty.

## Key takeaway

Agriculture has changed from largely traditional practices to increasingly scientific and technology-supported systems. Sustainable development remains essential.`,
        },
        {
          title: "Branches of Agriculture",
          order: 3,
          content: `# Branches of Agriculture

Agriculture contains several specialized branches.

## 1. Agronomy

Agronomy focuses on field crop production and soil management.

It includes crop rotation, nutrient management, sowing practices, and field management.

## 2. Horticulture

Horticulture deals with the cultivation of fruits, vegetables, flowers, and ornamental plants.

Examples include mango cultivation, tomato farming, and floriculture.

## 3. Soil Science

Soil science studies soil formation, physical properties, chemical composition, biological activity, and fertility.

It helps farmers understand soil suitability and nutrient requirements.

## 4. Agricultural Engineering

Agricultural engineering applies engineering principles to farming.

Examples include:

- Tractors and farm machinery.
- Irrigation systems.
- Agricultural processing equipment.
- Farm structures.

## 5. Plant Pathology

Plant pathology studies plant diseases and their causes.

It helps identify, prevent, and manage diseases caused by fungi, bacteria, viruses, and other organisms.

## 6. Entomology

Agricultural entomology studies insects associated with agriculture, including crop pests and beneficial insects.

## 7. Animal Husbandry

Animal husbandry focuses on the breeding, feeding, health, and management of livestock.

## 8. Agricultural Economics

Agricultural economics studies farm production costs, agricultural markets, pricing, trade, and farm income.

## Key takeaway

Each branch contributes specialized knowledge that helps improve agricultural productivity and sustainability.`,
        },
        {
          title: "Role of Agriculture in Society and the Economy",
          order: 4,
          content: `# Role of Agriculture in Society and the Economy

## 1. Food security

Agriculture produces essential food products such as grains, pulses, fruits, vegetables, milk, meat, and eggs.

Reliable agricultural production is important for food availability and nutrition.

## 2. Employment

Agriculture provides employment in:

- Crop cultivation.
- Livestock management.
- Fisheries.
- Food processing.
- Transportation.
- Agricultural marketing.

It also creates opportunities for agricultural entrepreneurs.

## 3. Industrial development

Many industries depend on agricultural raw materials.

Examples:

- Cotton supports the textile industry.
- Sugarcane supports sugar production.
- Rubber supports rubber manufacturing.
- Oilseeds support edible oil production.

## 4. Rural development

Agriculture supports rural livelihoods and contributes to the development of roads, markets, storage facilities, irrigation systems, and other infrastructure.

## 5. International trade

Agricultural commodities such as rice, tea, spices, coffee, and cotton contribute to international trade.

## 6. Environmental importance

Well-managed agricultural systems can support:

- Soil conservation.
- Biodiversity.
- Water management.
- Carbon storage.
- Landscape maintenance.

However, poorly managed agriculture can also cause soil erosion, water pollution, habitat loss, and excessive resource consumption.

## Key takeaway

Agriculture is essential to food security, employment, industry, and rural development. Responsible management is necessary to balance productivity with environmental protection.`,
        },
      ],
      questions: [
        {
          question: "What is the primary purpose of agriculture?",
          questionType: QuestionType.MCQ,
          options: [
            "Only manufacturing machinery",
            "Cultivating plants and raising animals for useful products",
            "Only constructing buildings",
            "Only transporting goods",
          ],
          correctAnswer:
            "Cultivating plants and raising animals for useful products",
          explanation:
            "Agriculture includes crop cultivation and animal production, along with related activities that provide food and other useful products.",
          order: 1,
        },
        {
          question: "Which branch focuses on field crop production?",
          questionType: QuestionType.MCQ,
          options: [
            "Agronomy",
            "Entomology",
            "Forestry",
            "Veterinary science",
          ],
          correctAnswer: "Agronomy",
          explanation:
            "Agronomy focuses on field crop production, soil management, and practices that improve crop productivity.",
          order: 2,
        },
        {
          question: "Which agricultural branch studies plant diseases?",
          questionType: QuestionType.MCQ,
          options: [
            "Agricultural economics",
            "Plant pathology",
            "Agricultural engineering",
            "Horticulture",
          ],
          correctAnswer: "Plant pathology",
          explanation:
            "Plant pathology studies plant diseases, their causes, symptoms, and management.",
          order: 3,
        },
        {
          question: "Which of the following is an example of horticulture?",
          questionType: QuestionType.MCQ,
          options: [
            "Mining coal",
            "Cultivating mangoes",
            "Manufacturing cement",
            "Producing steel",
          ],
          correctAnswer: "Cultivating mangoes",
          explanation:
            "Horticulture includes the cultivation of fruits, vegetables, flowers, and ornamental plants.",
          order: 4,
        },
        {
          question: "What was a major feature of the Green Revolution in India?",
          questionType: QuestionType.MCQ,
          options: [
            "Elimination of irrigation",
            "Introduction of improved crop varieties and modern farming inputs",
            "Stopping all fertilizer use",
            "Replacing all crops with forests",
          ],
          correctAnswer:
            "Introduction of improved crop varieties and modern farming inputs",
          explanation:
            "The Green Revolution involved improved crop varieties, irrigation, fertilizers, and modern farming practices that increased food-grain production.",
          order: 5,
        },
        {
          question: "Which branch studies insects related to agriculture?",
          questionType: QuestionType.MCQ,
          options: [
            "Agricultural entomology",
            "Soil science",
            "Agronomy",
            "Agricultural economics",
          ],
          correctAnswer: "Agricultural entomology",
          explanation:
            "Agricultural entomology studies crop pests and beneficial insects associated with agricultural systems.",
          order: 6,
        },
        {
          question: "Which of these is an agricultural raw material used by the textile industry?",
          questionType: QuestionType.MCQ,
          options: ["Cotton", "Granite", "Iron ore", "Petroleum"],
          correctAnswer: "Cotton",
          explanation:
            "Cotton is an agricultural product used as a major raw material in textile manufacturing.",
          order: 7,
        },
        {
          question: "Which of the following are important contributions of agriculture?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Food production",
            "Employment generation",
            "Industrial raw materials",
            "Rural development",
          ],
          correctAnswer: [
            "Food production",
            "Employment generation",
            "Industrial raw materials",
            "Rural development",
          ],
          explanation:
            "Agriculture supports food supplies, employment, industrial production, and rural economic development.",
          order: 8,
        },
        {
          question: "Agriculture includes activities beyond crop cultivation.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Agriculture also includes livestock, horticulture, fisheries, forestry, and other related activities.",
          order: 9,
        },
        {
          question: "Which branch studies the economics of agricultural production and markets?",
          questionType: QuestionType.MCQ,
          options: [
            "Plant pathology",
            "Agricultural economics",
            "Entomology",
            "Agricultural engineering",
          ],
          correctAnswer: "Agricultural economics",
          explanation:
            "Agricultural economics examines farm costs, production decisions, prices, markets, and agricultural trade.",
          order: 10,
        },
      ],
    },
    {
      levelName: "Agricultural Systems and Practices",
      description:
        "Understand farming systems, crop and livestock activities, and the factors that influence agricultural production.",
      order: 2,
      learning: [
        {
          title: "Types of Agricultural Activities",
          order: 1,
          content: `# Types of Agricultural Activities

Agricultural activities can be classified according to the products produced and the methods used.

## Crop farming

Crop farming involves cultivating plants for food, fibre, oil, fodder, and industrial uses.

Examples include rice, wheat, maize, cotton, and groundnut.

## Livestock farming

Livestock farming involves raising animals for milk, meat, eggs, wool, and other products.

Examples include dairy farming, poultry farming, sheep rearing, and goat farming.

## Horticulture

Horticulture focuses on fruits, vegetables, flowers, and ornamental plants.

## Fisheries and aquaculture

Fisheries involve harvesting aquatic organisms, while aquaculture involves cultivating aquatic organisms under managed conditions.

## Agroforestry

Agroforestry combines trees with crops and/or livestock on the same land management unit.

It can provide additional income, improve biodiversity, and support soil conservation.

## Mixed farming

Mixed farming combines crop production with livestock activities.

Crop residues may be used as animal feed, while animal manure can be used to improve soil fertility.

## Key takeaway

Agricultural activities can be combined to improve resource use, diversify income, and reduce dependence on a single source of production.`,
        },
        {
          title: "Factors Affecting Agricultural Production",
          order: 2,
          content: `# Factors Affecting Agricultural Production

Agricultural production depends on environmental, biological, economic, and management factors.

## 1. Climate

Important climatic factors include:

- Rainfall.
- Temperature.
- Humidity.
- Sunlight.
- Wind.

Different crops require different climatic conditions.

## 2. Soil

Soil affects plant growth through:

- Nutrient availability.
- Soil texture.
- Soil structure.
- Drainage.
- Water-holding capacity.
- Soil pH.

## 3. Water availability

Plants require water for nutrient transport, photosynthesis, and growth.

Insufficient water can reduce crop productivity, while excessive water can damage roots and reduce soil aeration.

## 4. Seeds and crop varieties

Seed quality and crop variety influence:

- Germination.
- Growth duration.
- Yield potential.
- Resistance to pests and diseases.
- Suitability to local conditions.

## 5. Farming practices

Production is affected by land preparation, planting time, spacing, irrigation, fertilization, and pest management.

## 6. Economic factors

Farmers also depend on input prices, labour availability, credit, transportation, market access, and commodity prices.

## Key takeaway

Successful agriculture requires suitable environmental conditions, good-quality inputs, and appropriate farm management.`,
        },
        {
          title: "Subsistence and Commercial Farming",
          order: 3,
          content: `# Subsistence and Commercial Farming

Farming systems can be classified according to their main production objectives.

## Subsistence farming

Subsistence farming primarily produces food for the farmer's household.

Characteristics may include:

- Small operational holdings.
- Family labour.
- Limited mechanization.
- Production focused on household needs.
- Sale of surplus produce when available.

Subsistence farming practices vary significantly across regions.

## Commercial farming

Commercial farming primarily produces agricultural products for sale.

Characteristics may include:

- Market-oriented production.
- Greater use of purchased inputs.
- Mechanization where economically suitable.
- Specialized crop or livestock production.
- Business and financial planning.

Examples include commercial tea plantations, poultry farms, and large-scale vegetable production.

## Intensive farming

Intensive farming uses relatively high levels of inputs and management per unit of land.

Its objective is to obtain higher production from a limited area.

## Extensive farming

Extensive farming generally uses larger land areas with comparatively lower input intensity per unit of land.

## Plantation agriculture

Plantation agriculture involves large-scale cultivation of selected commercial crops.

Examples include tea, coffee, rubber, and oil palm plantations.

## Key takeaway

Different farming systems serve different objectives. Their suitability depends on land, labour, capital, climate, and market conditions.`,
        },
        {
          title: "Integrated Farming Systems",
          order: 4,
          content: `# Integrated Farming Systems

## What is an integrated farming system?

An integrated farming system combines two or more agricultural enterprises so that resources and outputs from one activity can support another.

For example, a farm may combine crop cultivation, dairy farming, poultry, and fish production.

## Common components

- Crop production.
- Dairy farming.
- Poultry.
- Goat or sheep rearing.
- Fish farming.
- Composting.
- Agroforestry.

## How integration works

Consider a farm with crop production and dairy farming.

1. Crops produce food and agricultural residues.
2. Suitable crop residues may be used as animal feed.
3. Livestock produce manure.
4. Manure can be composted and applied to fields.
5. Farm activities generate multiple sources of income.

The system should be designed according to local resources and animal-health requirements.

## Benefits

- Diversified income.
- Better resource utilization.
- Recycling of organic materials.
- Reduced dependence on a single enterprise.
- Potential improvement in farm resilience.

## Challenges

- More complex management.
- Need for multiple skills.
- Initial investment.
- Disease and waste management.
- Market coordination.

## Key takeaway

Integrated farming connects agricultural enterprises to improve resource efficiency and diversify farm income. Proper planning is essential for success.`,
        },
      ],
      questions: [
        {
          question: "What is mixed farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Only growing one crop",
            "Combining crop production with livestock activities",
            "Only growing forest trees",
            "Only catching wild fish",
          ],
          correctAnswer:
            "Combining crop production with livestock activities",
          explanation:
            "Mixed farming combines crop cultivation and livestock production, allowing some resources and outputs to be shared.",
          order: 1,
        },
        {
          question: "Which factor directly influences soil water-holding capacity?",
          questionType: QuestionType.MCQ,
          options: [
            "Soil texture",
            "Market price",
            "Farm ownership",
            "Crop selling method",
          ],
          correctAnswer: "Soil texture",
          explanation:
            "Soil texture, which refers to the proportions of sand, silt, and clay, influences how much water soil can retain.",
          order: 2,
        },
        {
          question: "What is the primary objective of subsistence farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Producing mainly for household needs",
            "Producing only for export",
            "Manufacturing farm machinery",
            "Producing industrial chemicals",
          ],
          correctAnswer: "Producing mainly for household needs",
          explanation:
            "Subsistence farming primarily produces food and other products for the farmer's household.",
          order: 3,
        },
        {
          question: "Which of the following is an example of plantation agriculture?",
          questionType: QuestionType.MCQ,
          options: [
            "Tea cultivation",
            "Small home gardening",
            "Wildlife hunting",
            "Urban construction",
          ],
          correctAnswer: "Tea cultivation",
          explanation:
            "Tea is a commercial plantation crop commonly cultivated on managed estates.",
          order: 4,
        },
        {
          question: "What does aquaculture involve?",
          questionType: QuestionType.MCQ,
          options: [
            "Cultivating aquatic organisms",
            "Growing only wheat",
            "Manufacturing fertilizers",
            "Raising forest trees",
          ],
          correctAnswer: "Cultivating aquatic organisms",
          explanation:
            "Aquaculture is the managed cultivation of aquatic organisms such as fish, shellfish, and aquatic plants.",
          order: 5,
        },
        {
          question: "Which is a potential benefit of agroforestry?",
          questionType: QuestionType.MCQ,
          options: [
            "Combining trees with agricultural activities",
            "Removing all vegetation",
            "Preventing all rainfall",
            "Eliminating soil organisms",
          ],
          correctAnswer: "Combining trees with agricultural activities",
          explanation:
            "Agroforestry integrates trees with crops or livestock and can support biodiversity, soil protection, and farm income.",
          order: 6,
        },
        {
          question: "Which of these are factors affecting agricultural production?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Climate",
            "Soil conditions",
            "Water availability",
            "Seed quality",
          ],
          correctAnswer: [
            "Climate",
            "Soil conditions",
            "Water availability",
            "Seed quality",
          ],
          explanation:
            "Climate, soil, water, and seeds all influence crop establishment, growth, and final yield.",
          order: 7,
        },
        {
          question: "Integrated farming can recycle resources between different farm enterprises.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Integrated farming can reuse suitable outputs, such as crop residues for feed and composted manure for soil improvement.",
          order: 8,
        },
        {
          question: "What is the main focus of commercial farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Producing mainly for sale",
            "Producing only for household consumption",
            "Avoiding all market activities",
            "Growing crops without planning",
          ],
          correctAnswer: "Producing mainly for sale",
          explanation:
            "Commercial farming is primarily market-oriented and aims to generate income through the sale of agricultural products.",
          order: 9,
        },
        {
          question: "Which is a possible challenge of integrated farming?",
          questionType: QuestionType.MCQ,
          options: [
            "More complex management",
            "No need for planning",
            "Guaranteed profit",
            "No requirement for skills",
          ],
          correctAnswer: "More complex management",
          explanation:
            "Managing multiple farm enterprises requires coordination, knowledge, labour, and careful planning.",
          order: 10,
        },
      ],
    },
    {
      levelName: "Agricultural Science and Sustainability",
      description:
        "Explore agricultural research, productivity, sustainability, and the relationship between farming and the environment.",
      order: 3,
      learning: [
        {
          title: "Agricultural Research and Extension",
          order: 1,
          content: `# Agricultural Research and Extension

## Agricultural research

Agricultural research uses scientific methods to improve farming practices, crop varieties, livestock production, and resource management.

Research areas include:

- Crop breeding.
- Soil fertility.
- Pest and disease management.
- Irrigation efficiency.
- Agricultural machinery.
- Climate adaptation.

## Agricultural extension

Agricultural extension helps transfer useful agricultural knowledge and technologies to farmers.

Extension services may provide:

- Farmer training.
- Demonstration plots.
- Soil and crop management guidance.
- Information about government programmes.
- Pest and disease awareness.
- Market information.

## Role of agricultural institutions in India

Several institutions support agricultural research and education.

### ICAR

The Indian Council of Agricultural Research coordinates and supports agricultural research and education in India.

### State Agricultural Universities

These universities conduct regional research, provide agricultural education, and support extension activities.

### Krishi Vigyan Kendras

Krishi Vigyan Kendras (KVKs) provide practical training, demonstrations, and agricultural advisory support to farmers.

## Importance of research and extension

Research develops improved practices, while extension helps farmers understand and apply relevant knowledge.

## Key takeaway

Agricultural research and extension connect scientific discoveries with practical farming needs.`,
        },
        {
          title: "Agricultural Productivity and Efficiency",
          order: 2,
          content: `# Agricultural Productivity and Efficiency

## What is agricultural productivity?

Agricultural productivity measures the output produced relative to the inputs used.

For example, crop yield is commonly measured as the quantity of harvested crop per unit area.

## Crop yield

A farmer harvests 4,000 kg of rice from one hectare.

The yield is:

4,000 kg per hectare.

Yield is an important measure, but it does not describe every aspect of farm performance.

## Factors influencing productivity

- Seed quality.
- Soil fertility.
- Water management.
- Weather conditions.
- Pest and disease pressure.
- Farm machinery.
- Labour and management.
- Availability of agricultural knowledge.

## Resource-use efficiency

Efficiency means obtaining useful production while managing resources responsibly.

Examples include:

- Using irrigation water efficiently.
- Applying fertilizers according to soil tests.
- Reducing unnecessary pesticide use.
- Maintaining farm machinery.
- Minimizing post-harvest losses.

## Productivity versus profitability

High crop yield does not automatically mean high profit.

A farmer must also consider production costs, labour, transport, storage, and selling prices.

## Key takeaway

Good agricultural management aims to improve productivity and profitability without wasting natural and economic resources.`,
        },
        {
          title: "Sustainable Agriculture",
          order: 3,
          content: `# Sustainable Agriculture

## Definition

Sustainable agriculture aims to produce food and other agricultural products while protecting natural resources and supporting long-term economic and social well-being.

## Three important dimensions

### Environmental sustainability

Protecting soil, water, biodiversity, and ecosystems.

Examples:

- Preventing soil erosion.
- Conserving water.
- Maintaining soil organic matter.
- Protecting beneficial organisms.

### Economic sustainability

Ensuring that farming remains financially viable.

Examples:

- Managing production costs.
- Diversifying income.
- Reducing post-harvest losses.
- Improving market access.

### Social sustainability

Supporting the well-being of farming communities and agricultural workers.

Examples:

- Safe working conditions.
- Access to agricultural education.
- Fair opportunities.
- Strong rural communities.

## Sustainable farming practices

- Crop rotation.
- Cover cropping.
- Integrated pest management.
- Efficient irrigation.
- Conservation tillage where suitable.
- Composting and organic matter management.
- Agroforestry.

## Challenges

Sustainable practices may require investment, training, suitable equipment, and changes to established farming methods.

Their effectiveness also depends on local soil, climate, crops, and economic conditions.

## Key takeaway

Sustainable agriculture balances production with environmental protection, economic viability, and social well-being.`,
        },
        {
          title: "Agriculture and Climate Change",
          order: 4,
          content: `# Agriculture and Climate Change

## How climate affects agriculture

Agricultural production depends strongly on temperature, rainfall, and seasonal patterns.

Climate change can affect agriculture through:

- Higher average temperatures.
- Changes in rainfall distribution.
- More frequent or severe heatwaves.
- Droughts and floods.
- Changes in pest and disease patterns.
- Increased pressure on water resources.

## Impact on crops

High temperatures during sensitive growth stages can reduce crop development and yield.

Irregular rainfall can delay sowing, damage crops, and affect harvesting.

## Adaptation strategies

Adaptation means adjusting farming systems to reduce climate-related risks.

Examples include:

- Selecting locally suitable crop varieties.
- Adjusting planting dates.
- Improving water storage.
- Using efficient irrigation.
- Diversifying crops.
- Improving soil organic matter.
- Using weather information for farm decisions.

## Climate mitigation

Mitigation aims to reduce greenhouse gas emissions or increase carbon storage.

Agricultural approaches may include:

- Improving fertilizer efficiency.
- Managing livestock manure.
- Reducing avoidable energy use.
- Maintaining trees and vegetation.
- Improving soil carbon management.

## Role of technology

Weather forecasting, remote sensing, agricultural advisory services, and soil monitoring can support climate-informed decisions.

## Key takeaway

Climate-resilient agriculture combines adaptation, responsible resource management, and appropriate technologies to reduce risks to farmers and food systems.`,
        },
      ],
      questions: [
        {
          question: "What is the main purpose of agricultural extension?",
          questionType: QuestionType.MCQ,
          options: [
            "To transfer useful agricultural knowledge to farmers",
            "To stop agricultural research",
            "To replace all farming activities",
            "To manufacture consumer electronics",
          ],
          correctAnswer:
            "To transfer useful agricultural knowledge to farmers",
          explanation:
            "Agricultural extension connects research and practical knowledge with farmers through training, demonstrations, and advisory services.",
          order: 1,
        },
        {
          question: "What does ICAR stand for?",
          questionType: QuestionType.MCQ,
          options: [
            "Indian Council of Agricultural Research",
            "International Crop Administration Registry",
            "Indian Centre for Animal Roads",
            "Institute of Climate and River Research",
          ],
          correctAnswer: "Indian Council of Agricultural Research",
          explanation:
            "ICAR stands for the Indian Council of Agricultural Research, which supports agricultural research and education in India.",
          order: 2,
        },
        {
          question: "A farmer harvests 5,000 kg of a crop from one hectare. What is the yield?",
          questionType: QuestionType.MCQ,
          options: [
            "500 kg per hectare",
            "5,000 kg per hectare",
            "50,000 kg per hectare",
            "5 kg per hectare",
          ],
          correctAnswer: "5,000 kg per hectare",
          explanation:
            "Yield per hectare is calculated by dividing harvested quantity by cultivated area. Here, 5,000 kg divided by 1 hectare equals 5,000 kg per hectare.",
          order: 3,
        },
        {
          question: "Which practice helps reduce soil erosion?",
          questionType: QuestionType.MCQ,
          options: [
            "Maintaining suitable vegetation cover",
            "Removing all vegetation",
            "Leaving sloping land permanently bare",
            "Increasing uncontrolled runoff",
          ],
          correctAnswer: "Maintaining suitable vegetation cover",
          explanation:
            "Vegetation cover protects the soil surface and helps reduce the impact of rainfall and runoff.",
          order: 4,
        },
        {
          question: "Which of the following is a climate adaptation strategy?",
          questionType: QuestionType.MCQ,
          options: [
            "Adjusting planting dates according to changing conditions",
            "Ignoring weather information",
            "Increasing soil erosion",
            "Wasting irrigation water",
          ],
          correctAnswer:
            "Adjusting planting dates according to changing conditions",
          explanation:
            "Adjusting planting dates can help crops avoid unfavourable weather conditions and reduce climate-related production risks.",
          order: 5,
        },
        {
          question: "Which organization provides practical agricultural training through Krishi Vigyan Kendras?",
          questionType: QuestionType.MCQ,
          options: [
            "Agricultural extension system",
            "Stock exchange",
            "Mining department",
            "Railway administration",
          ],
          correctAnswer: "Agricultural extension system",
          explanation:
            "KVKs function as agricultural knowledge and extension centres that provide demonstrations, training, and advisory support.",
          order: 6,
        },
        {
          question: "Which are dimensions of sustainable agriculture?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Environmental sustainability",
            "Economic sustainability",
            "Social sustainability",
            "Uncontrolled resource exploitation",
          ],
          correctAnswer: [
            "Environmental sustainability",
            "Economic sustainability",
            "Social sustainability",
          ],
          explanation:
            "Sustainable agriculture balances environmental protection, economic viability, and social well-being.",
          order: 7,
        },
        {
          question: "High crop yield always guarantees high farm profit.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Profit also depends on production costs, labour, transport, storage, and market prices.",
          order: 8,
        },
        {
          question: "Which technology can help farmers monitor crop and field conditions?",
          questionType: QuestionType.MCQ,
          options: [
            "Remote sensing",
            "Audio playback",
            "Word processing",
            "Desktop publishing",
          ],
          correctAnswer: "Remote sensing",
          explanation:
            "Remote sensing can provide information about vegetation, land conditions, and crop health using satellite or aerial observations.",
          order: 9,
        },
        {
          question: "Which of these practices can support sustainable agriculture?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Crop rotation",
            "Efficient irrigation",
            "Integrated pest management",
            "Unnecessary pesticide application",
          ],
          correctAnswer: [
            "Crop rotation",
            "Efficient irrigation",
            "Integrated pest management",
          ],
          explanation:
            "Crop rotation, efficient irrigation, and IPM can support soil health, resource conservation, and responsible pest management.",
          order: 10,
        },
      ],
    },
  ],
};
