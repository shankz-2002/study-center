
import { QuestionType } from "../types/question.js";

export const typesOfFarmingData = {
  fieldName: "Agriculture and Farming",
  fieldDescription:
    "Learn agricultural science, crop production, soil management, irrigation, plant protection, sustainable farming, and modern agricultural technologies.",
  categoryName: "Agricultural Fundamentals",
  categoryDescription:
    "Understand the foundations of agriculture, farming systems, agricultural seasons, and the tools used in farming.",
  topicName: "Types of Farming",
  topicDescription:
    "Understand different farming systems, their characteristics, objectives, advantages, limitations, and suitability under different agricultural conditions.",
  levels: [
    {
      levelName: "Fundamentals of Farming Systems",
      description:
        "Learn the meaning of farming systems and understand subsistence, commercial, intensive, and extensive farming.",
      order: 1,
      learning: [
        {
          title: "Introduction to Farming Systems",
          order: 1,
          content: `# Introduction to Farming Systems

## What is a farming system?

A farming system is the combination of agricultural activities, resources, technologies, and management practices used by a farmer to produce crops and livestock.

A farming system depends on several factors:

- Climate and rainfall.
- Soil type and fertility.
- Availability of water.
- Land size.
- Labour and capital.
- Market demand.
- Farmer knowledge and experience.

## Why are there different farming systems?

Different regions have different agricultural conditions. A farming method suitable for a region with abundant rainfall may not be suitable for an area with limited water.

Farmers select their farming systems according to local conditions and production objectives.

## Major classifications

Farming systems can be classified based on:

1. **Purpose:** Subsistence or commercial farming.
2. **Input intensity:** Intensive or extensive farming.
3. **Agricultural activities:** Crop farming, livestock farming, or mixed farming.
4. **Water availability:** Rainfed or irrigated farming.
5. **Production methods:** Organic, conventional, or integrated farming.

## Example

A farmer cultivating rice mainly for family consumption follows a subsistence-oriented system.

A farmer producing vegetables specifically for sale in a nearby market follows a commercial-oriented system.

## Key takeaway

A farming system describes how agricultural resources and activities are organized to achieve production goals.`,
        },
        {
          title: "Subsistence Farming",
          order: 2,
          content: `# Subsistence Farming

## Definition

Subsistence farming is a farming system in which agricultural products are primarily produced to meet the food and other basic needs of the farmer's household.

Only surplus production, if available, may be sold in the market.

## Characteristics

- Production mainly for household consumption.
- Often involves small operational holdings.
- Family labour is commonly used.
- Traditional knowledge may play an important role.
- Limited mechanization may be present.
- Production is often influenced by local conditions.

## Types of subsistence farming

### Primitive subsistence farming

This is generally associated with simple tools and low-input production methods.

Examples include shifting cultivation and some forms of traditional gathering-based cultivation.

### Intensive subsistence farming

Farmers cultivate relatively small areas using substantial labour and careful management to obtain high production per unit of land.

Rice-based farming is an example in many densely populated regions.

## Advantages

- Supports household food requirements.
- Can preserve traditional agricultural knowledge.
- May require limited purchased inputs.
- Can support local crop diversity.

## Limitations

- Limited surplus for sale.
- Exposure to weather-related risks.
- Lower access to modern machinery in some regions.
- Limited financial resources for investment.

## Example in India

Smallholder farmers may cultivate rice, vegetables, pulses, or other crops primarily for household consumption.

## Key takeaway

Subsistence farming focuses on meeting household needs rather than maximizing commercial sales.`,
        },
        {
          title: "Commercial Farming",
          order: 3,
          content: `# Commercial Farming

## Definition

Commercial farming is a farming system in which agricultural products are primarily produced for sale in markets to generate income.

Farmers make production decisions based on factors such as market demand, production costs, climate, and expected returns.

## Characteristics

- Market-oriented production.
- Income generation is a major objective.
- Greater use of purchased agricultural inputs may occur.
- Mechanization may be used where economically suitable.
- Specialized crop or livestock production is common.
- Financial and market planning are important.

## Examples

- Commercial dairy farms.
- Poultry farms supplying eggs and meat.
- Tea and coffee plantations.
- Large-scale vegetable production.
- Commercial sugarcane cultivation.

## Advantages

- Creates employment opportunities.
- Supports agricultural industries.
- Generates income for farmers.
- Can encourage investment in machinery and technology.
- Supplies products to local and international markets.

## Limitations

- Production costs may be high.
- Farmers may face changing market prices.
- Dependence on purchased inputs can increase financial risk.
- Specialized production may increase exposure to crop-specific risks.

## Commercial farming and markets

Farmers need to consider:

- Consumer demand.
- Quality standards.
- Transportation.
- Storage.
- Market prices.
- Seasonal availability.

## Key takeaway

Commercial farming focuses on producing agricultural products for the market while managing costs, quality, and profitability.`,
        },
        {
          title: "Intensive and Extensive Farming",
          order: 4,
          content: `# Intensive and Extensive Farming

Farming systems can also be classified according to the amount of inputs used relative to the land area.

## Intensive farming

Intensive farming uses relatively high levels of labour, capital, technology, or other inputs per unit of land.

### Characteristics

- Higher input use per unit area.
- Detailed crop management.
- Greater attention to productivity.
- May involve irrigation and fertilizers.
- Often practiced where land is limited or valuable.

### Examples

- Intensive vegetable cultivation.
- High-input rice production.
- Intensive poultry production.

## Extensive farming

Extensive farming generally uses larger land areas with comparatively lower input intensity per unit of land.

### Characteristics

- Large land areas.
- Lower input use per unit area.
- Production may depend heavily on natural conditions.
- Mechanization may be used to manage large areas.

### Examples

- Large-scale grazing systems.
- Extensive livestock ranching.
- Large-area grain production with relatively low input intensity.

## Comparison

| Feature | Intensive | Extensive |
|---|---|---|
| Input per unit area | Relatively high | Relatively low |
| Land use | Often smaller area | Often larger area |
| Management | More intensive | Less intensive per unit area |
| Production goal | Higher output per unit area | Production over larger areas |

## Important distinction

Intensive farming does not always mean sustainable or unsustainable farming. Its environmental impact depends on how inputs, soil, and water are managed.

Similarly, extensive farming is not automatically environmentally friendly.

## Key takeaway

Intensive and extensive farming are distinguished mainly by the level of inputs and management used relative to the area of land.`,
        },
      ],
      questions: [
        {
          question: "What does a farming system describe?",
          questionType: QuestionType.MCQ,
          options: [
            "Only the type of seeds used",
            "The organization of agricultural activities and resources",
            "Only the market price of crops",
            "Only the size of a tractor",
          ],
          correctAnswer:
            "The organization of agricultural activities and resources",
          explanation:
            "A farming system describes how resources, agricultural activities, and management practices are organized for production.",
          order: 1,
        },
        {
          question: "What is the main objective of subsistence farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Producing mainly for household needs",
            "Producing only for international export",
            "Manufacturing agricultural machinery",
            "Operating a food-processing factory",
          ],
          correctAnswer: "Producing mainly for household needs",
          explanation:
            "Subsistence farming primarily meets the food and other basic needs of the farmer's household.",
          order: 2,
        },
        {
          question: "Which farming system primarily produces goods for sale?",
          questionType: QuestionType.MCQ,
          options: [
            "Subsistence farming",
            "Commercial farming",
            "Shifting cultivation",
            "Home gardening",
          ],
          correctAnswer: "Commercial farming",
          explanation:
            "Commercial farming focuses on producing agricultural goods for sale and generating income.",
          order: 3,
        },
        {
          question: "Which farming system generally uses higher inputs per unit of land?",
          questionType: QuestionType.MCQ,
          options: [
            "Extensive farming",
            "Intensive farming",
            "Unmanaged grazing",
            "Wild harvesting",
          ],
          correctAnswer: "Intensive farming",
          explanation:
            "Intensive farming uses relatively high levels of labour, capital, technology, or other inputs per unit of land.",
          order: 4,
        },
        {
          question: "Which is an example of commercial farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Growing vegetables primarily for household consumption",
            "Operating a dairy farm supplying milk to markets",
            "Collecting wild fruits for personal use",
            "Growing a few plants in a home garden",
          ],
          correctAnswer: "Operating a dairy farm supplying milk to markets",
          explanation:
            "A dairy farm that produces milk for sale is an example of commercial livestock farming.",
          order: 5,
        },
        {
          question: "Which factor influences the selection of a farming system?",
          questionType: QuestionType.MCQ,
          options: [
            "Climate and rainfall",
            "Soil conditions",
            "Water availability",
            "All of the above",
          ],
          correctAnswer: "All of the above",
          explanation:
            "Climate, soil, water, resources, and market conditions all influence farming-system selection.",
          order: 6,
        },
        {
          question: "Which are characteristics commonly associated with subsistence farming?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Production mainly for household consumption",
            "Use of family labour",
            "Limited surplus for sale",
            "Production always focused on export markets",
          ],
          correctAnswer: [
            "Production mainly for household consumption",
            "Use of family labour",
            "Limited surplus for sale",
          ],
          explanation:
            "Subsistence farming generally focuses on household needs and often uses family labour, with limited surplus available for sale.",
          order: 7,
        },
        {
          question: "Extensive farming generally uses lower input intensity per unit of land than intensive farming.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Extensive farming generally uses lower levels of inputs per unit of land, often across larger areas.",
          order: 8,
        },
        {
          question: "Which farming system is commonly associated with large tea and coffee estates?",
          questionType: QuestionType.MCQ,
          options: [
            "Plantation agriculture",
            "Subsistence gardening",
            "Shifting cultivation",
            "Unmanaged forestry",
          ],
          correctAnswer: "Plantation agriculture",
          explanation:
            "Plantation agriculture involves large-scale commercial cultivation of selected crops such as tea, coffee, and rubber.",
          order: 9,
        },
        {
          question: "Which of these can influence the profitability of commercial farming?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Production costs",
            "Market prices",
            "Transportation expenses",
            "Consumer demand",
          ],
          correctAnswer: [
            "Production costs",
            "Market prices",
            "Transportation expenses",
            "Consumer demand",
          ],
          explanation:
            "Commercial farm profitability depends on costs, selling prices, logistics, and market demand.",
          order: 10,
        },
      ],
    },
    {
      levelName: "Specialized and Integrated Farming",
      description:
        "Explore specialized farming systems, mixed farming, plantation agriculture, and integrated agricultural enterprises.",
      order: 2,
      learning: [
        {
          title: "Mixed Farming",
          order: 1,
          content: `# Mixed Farming

## Definition

Mixed farming is a system in which crop production and livestock rearing are practiced together on the same farm or within the same farming operation.

The two activities can support one another through resource sharing.

## How mixed farming works

Consider a farm producing rice and maintaining dairy cattle.

1. The farm produces rice and other crops.
2. Suitable crop residues may be used as animal feed.
3. Cattle produce milk for household use or sale.
4. Livestock manure can be composted.
5. Properly treated manure can be used to improve soil organic matter.

## Advantages

- Multiple sources of farm income.
- Better use of crop residues.
- Recycling of organic nutrients.
- Reduced dependence on a single enterprise.
- Potential improvement in farm resilience.

## Challenges

- Requires knowledge of crop and livestock management.
- Needs labour and planning.
- Animal diseases must be managed.
- Feed and waste management require attention.
- Initial investment may be necessary.

## Example

A farmer in Kerala may combine coconut cultivation, vegetable farming, and dairy production.

The combination depends on land availability, labour, market demand, and local conditions.

## Key takeaway

Mixed farming combines crops and livestock to improve resource utilization and diversify farm production.`,
        },
        {
          title: "Plantation and Specialized Farming",
          order: 2,
          content: `# Plantation and Specialized Farming

## Plantation agriculture

Plantation agriculture is a commercial farming system involving large-scale cultivation of selected crops, often for processing or sale.

Common plantation crops include:

- Tea.
- Coffee.
- Rubber.
- Oil palm.
- Cocoa.

## Characteristics

- Focus on selected commercial crops.
- Large or consolidated cultivated areas are common.
- Specialized farm management.
- May require processing and transportation infrastructure.
- Often connected to domestic or international markets.

## Specialized farming

Specialized farming concentrates on one main agricultural enterprise or a limited number of products.

Examples include:

- Dairy farming.
- Poultry farming.
- Floriculture.
- Commercial fish farming.
- Commercial vegetable production.

## Advantages

- Development of specialized skills.
- More focused management.
- Potential economies of scale.
- Easier coordination of certain production processes.

## Limitations

- Greater dependence on specific markets.
- Risk from crop-specific pests and diseases.
- Exposure to price fluctuations.
- Reduced diversification.

## Diversification

A specialized farm may reduce risk by introducing additional crops, products, or activities when resources and market conditions allow.

## Key takeaway

Plantation and specialized farming focus on particular commercial products and require careful management of production and market risks.`,
        },
        {
          title: "Integrated Farming Systems",
          order: 3,
          content: `# Integrated Farming Systems

## Definition

An integrated farming system combines multiple agricultural enterprises in a coordinated manner.

The aim is to use resources more efficiently and create useful connections between activities.

## Common components

- Crop cultivation.
- Dairy production.
- Poultry farming.
- Fish production.
- Goat or sheep rearing.
- Composting.
- Agroforestry.

## Example of integration

A farm may combine vegetable production, poultry, and composting.

- Vegetables provide products for sale.
- Suitable plant residues may be used in composting.
- Poultry produce eggs and meat.
- Properly managed poultry manure can be composted.
- Mature compost can be used to improve soil organic matter.

Waste should never be applied without appropriate treatment and safe handling.

## Benefits

- Diversified farm income.
- Better resource utilization.
- Recycling of organic materials.
- Potential reduction in waste.
- Improved resilience to individual enterprise failures.

## Challenges

- More complicated management.
- Need for different technical skills.
- Investment in facilities.
- Disease control across enterprises.
- Need for careful scheduling.

## Planning an integrated farm

Farmers should evaluate:

1. Available land.
2. Water resources.
3. Labour availability.
4. Local market demand.
5. Enterprise costs.
6. Environmental requirements.

## Key takeaway

Integrated farming connects multiple agricultural enterprises to improve resource use and diversify production.`,
        },
        {
          title: "Rainfed and Irrigated Farming",
          order: 4,
          content: `# Rainfed and Irrigated Farming

## Rainfed farming

Rainfed farming depends mainly on rainfall to provide water for crop production.

It is common in areas where irrigation infrastructure is limited or unavailable.

### Characteristics

- Depends on rainfall patterns.
- Crop selection must consider local rainfall.
- Drought risk can affect production.
- Soil moisture conservation is important.

### Management practices

- Selecting suitable crop varieties.
- Adjusting sowing time.
- Mulching.
- Rainwater harvesting.
- Maintaining soil organic matter.

## Irrigated farming

Irrigated farming uses additional water supplied through managed systems.

Water sources may include:

- Rivers.
- Reservoirs.
- Canals.
- Wells.
- Groundwater.
- Harvested rainwater.

### Common irrigation methods

- Surface irrigation.
- Drip irrigation.
- Sprinkler irrigation.

## Comparison

| Feature | Rainfed | Irrigated |
|---|---|---|
| Main water source | Rainfall | Rainfall and supplied water |
| Water control | Limited | Greater control |
| Drought exposure | Often higher | Can be reduced |
| Infrastructure | May be limited | Irrigation infrastructure needed |

## Responsible water management

Irrigation should be planned according to crop water requirements, soil conditions, and water availability.

Excessive groundwater extraction can cause long-term environmental problems.

## Key takeaway

Rainfed and irrigated farming differ mainly in how water is supplied to crops. Both require appropriate water management.`,
        },
      ],
      questions: [
        {
          question: "What is mixed farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Combining crop production and livestock rearing",
            "Growing only one crop",
            "Only cultivating forest trees",
            "Only processing agricultural products",
          ],
          correctAnswer:
            "Combining crop production and livestock rearing",
          explanation:
            "Mixed farming combines crop production and livestock activities within the same farming operation.",
          order: 1,
        },
        {
          question: "Which of the following is a plantation crop?",
          questionType: QuestionType.MCQ,
          options: ["Tea", "Wheat", "Lentil", "Mustard"],
          correctAnswer: "Tea",
          explanation:
            "Tea is commonly grown as a commercial plantation crop.",
          order: 2,
        },
        {
          question: "What is the main purpose of an integrated farming system?",
          questionType: QuestionType.MCQ,
          options: [
            "Connecting enterprises to improve resource utilization",
            "Separating all farm activities",
            "Avoiding crop production",
            "Using only chemical fertilizers",
          ],
          correctAnswer:
            "Connecting enterprises to improve resource utilization",
          explanation:
            "Integrated farming coordinates multiple enterprises so that resources and outputs can support other farm activities.",
          order: 3,
        },
        {
          question: "Which farming system depends mainly on rainfall?",
          questionType: QuestionType.MCQ,
          options: [
            "Rainfed farming",
            "Irrigated farming",
            "Hydroponics",
            "Controlled-environment farming",
          ],
          correctAnswer: "Rainfed farming",
          explanation:
            "Rainfed farming depends mainly on natural rainfall for crop water requirements.",
          order: 4,
        },
        {
          question: "Which of the following is an example of specialized farming?",
          questionType: QuestionType.MCQ,
          options: [
            "A farm mainly focused on dairy production",
            "A farm combining crops, fish, and livestock",
            "A farm producing many unrelated products without a main enterprise",
            "A forest without agricultural management",
          ],
          correctAnswer: "A farm mainly focused on dairy production",
          explanation:
            "Specialized farming focuses on one major agricultural enterprise, such as dairy production.",
          order: 5,
        },
        {
          question: "Which resource can be recycled in a properly managed mixed farming system?",
          questionType: QuestionType.MCQ,
          options: [
            "Composted livestock manure",
            "Plastic pesticide containers",
            "Untreated hazardous waste",
            "Contaminated industrial chemicals",
          ],
          correctAnswer: "Composted livestock manure",
          explanation:
            "Properly composted livestock manure can be used as an organic soil amendment.",
          order: 6,
        },
        {
          question: "Which are possible components of an integrated farming system?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Crop production",
            "Dairy farming",
            "Fish farming",
            "Poultry farming",
          ],
          correctAnswer: [
            "Crop production",
            "Dairy farming",
            "Fish farming",
            "Poultry farming",
          ],
          explanation:
            "An integrated farming system may combine crops, livestock, fish production, and other suitable enterprises.",
          order: 7,
        },
        {
          question: "Irrigated farming uses supplied water in addition to natural rainfall when required.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "Irrigated farming supplies water through managed systems when natural rainfall is insufficient or additional water is needed.",
          order: 8,
        },
        {
          question: "Which is a potential disadvantage of specialized farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Dependence on a limited number of products",
            "Always having multiple income sources",
            "No exposure to market changes",
            "No possibility of crop-specific diseases",
          ],
          correctAnswer: "Dependence on a limited number of products",
          explanation:
            "Specialized farming may be more exposed to price changes and production risks affecting its main enterprise.",
          order: 9,
        },
        {
          question: "What should farmers consider before selecting an integrated farming system?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Available land",
            "Water resources",
            "Labour availability",
            "Local market demand",
          ],
          correctAnswer: [
            "Available land",
            "Water resources",
            "Labour availability",
            "Local market demand",
          ],
          explanation:
            "An integrated farm should be designed around available resources, management capacity, and market opportunities.",
          order: 10,
        },
      ],
    },
    {
      levelName: "Modern Farming Systems and Selection",
      description:
        "Understand organic, conventional, sustainable, and precision farming, and learn how to select suitable farming systems.",
      order: 3,
      learning: [
        {
          title: "Organic and Conventional Farming",
          order: 1,
          content: `# Organic and Conventional Farming

## Organic farming

Organic farming is a production approach that follows defined organic standards and emphasizes ecological processes, biodiversity, and responsible resource management.

Depending on applicable standards, organic systems may use:

- Compost.
- Green manure.
- Crop rotation.
- Biological pest management.
- Approved organic inputs.

Organic certification requirements vary by country and certification scheme.

## Conventional farming

Conventional farming refers to production systems using commonly established agricultural practices and inputs.

These may include:

- Improved crop varieties.
- Synthetic fertilizers.
- Approved pesticides.
- Mechanization.
- Irrigation.
- Soil management practices.

Conventional farming practices vary widely and may include sustainable techniques.

## Comparison

| Feature | Organic | Conventional |
|---|---|---|
| Input standards | Organic standards apply | Broader range of permitted inputs |
| Soil management | Often emphasizes organic matter and ecological processes | Can use organic and mineral inputs |
| Pest management | Preventive and permitted biological or other approved methods | May use integrated and chemical controls |
| Certification | May require certification | Depends on product and market |

## Important considerations

Organic farming does not automatically guarantee higher yields or lower environmental impact in every situation.

Conventional farming is not automatically unsustainable.

Actual outcomes depend on management, location, crop, soil, and production methods.

## Key takeaway

Organic and conventional farming differ in production standards and permitted practices. Both require careful management of soil, water, pests, and productivity.`,
        },
        {
          title: "Precision Agriculture",
          order: 2,
          content: `# Precision Agriculture

## What is precision agriculture?

Precision agriculture uses information, technology, and data to manage agricultural activities according to variations within a field.

Its goal is to apply inputs more accurately and improve farm decision-making.

## Technologies used

### GPS and GNSS

Satellite positioning systems help identify field locations and guide agricultural machinery.

### Remote sensing

Satellites and aerial sensors collect information about crop conditions and land characteristics.

### Soil sensors

Sensors can measure properties such as soil moisture, temperature, and electrical conductivity.

### Geographic Information Systems

GIS helps collect, store, analyze, and display geographically referenced agricultural data.

### Variable-rate technology

Variable-rate systems adjust the application of inputs, such as fertilizers or seeds, according to field conditions.

## Practical example

A farmer observes that different parts of a field have different soil nutrient levels.

After collecting and analyzing soil information, the farmer can develop a nutrient-management plan that considers these differences.

## Benefits

- More targeted input application.
- Improved monitoring.
- Potential reduction in unnecessary input use.
- Better field management.
- More informed decisions.

## Limitations

- Initial technology costs.
- Need for technical knowledge.
- Connectivity and infrastructure limitations.
- Sensor calibration and data-quality requirements.

## Key takeaway

Precision agriculture uses field data and technology to make agricultural decisions more accurate and location-specific.`,
        },
        {
          title: "Protected Cultivation and Greenhouse Farming",
          order: 3,
          content: `# Protected Cultivation and Greenhouse Farming

## What is protected cultivation?

Protected cultivation involves growing crops in structures or environments designed to modify growing conditions and protect plants from some external stresses.

Examples include:

- Greenhouses.
- Polyhouses.
- Shade-net houses.
- Low tunnels.
- Insect-proof structures.

## Greenhouse farming

A greenhouse is a structure that allows controlled or partially controlled growing conditions.

Depending on its design, a greenhouse may regulate:

- Temperature.
- Humidity.
- Ventilation.
- Light.
- Irrigation.

## Advantages

- Protection from certain weather conditions.
- Potential extension of growing seasons.
- Improved crop quality under suitable management.
- More controlled growing conditions.
- Potential reduction in certain pest exposures.

## Suitable crops

Common greenhouse crops include:

- Tomato.
- Capsicum.
- Cucumber.
- Leafy vegetables.
- Selected flowers.

## Challenges

- Construction and operating costs.
- Temperature and humidity management.
- Need for skilled labour.
- Disease risks in poorly ventilated structures.
- Market-price fluctuations.

## Important management practices

- Proper ventilation.
- Regular monitoring.
- Efficient irrigation.
- Sanitation.
- Appropriate crop selection.
- Pest and disease monitoring.

## Key takeaway

Protected cultivation modifies growing conditions to improve crop management, but it requires suitable infrastructure and technical knowledge.`,
        },
        {
          title: "Selecting a Suitable Farming System",
          order: 4,
          content: `# Selecting a Suitable Farming System

Selecting a farming system requires evaluating the conditions and objectives of a farm.

## 1. Climate

Farmers should consider rainfall, temperature, humidity, and seasonal variation.

A crop or livestock system must be suitable for local climatic conditions.

## 2. Soil characteristics

Important soil properties include:

- Texture.
- Structure.
- Drainage.
- Soil pH.
- Nutrient availability.
- Organic matter.

Soil testing can help determine suitable management practices.

## 3. Water availability

Farmers should assess rainfall, irrigation access, groundwater availability, and water quality.

Water-intensive systems may not be appropriate where water resources are limited.

## 4. Land size and topography

The available land area and slope influence crop selection, machinery use, irrigation, and soil conservation.

## 5. Labour and capital

Some farming systems require substantial labour, equipment, infrastructure, or investment.

Farmers should select a system that matches their resources and management capacity.

## 6. Market access

Market demand, transportation, storage, and selling prices influence commercial decisions.

## 7. Environmental sustainability

A suitable system should protect soil, conserve water, and manage waste responsibly.

## Practical example

A farmer with limited land and reliable access to local markets may consider intensive vegetable cultivation.

A farmer with larger grazing areas may consider livestock-based farming.

Both decisions must account for local conditions and economic feasibility.

## Key takeaway

The best farming system is not the same for every farmer. It depends on resources, environment, production goals, and market opportunities.`,
        },
      ],
      questions: [
        {
          question: "What is a major focus of organic farming?",
          questionType: QuestionType.MCQ,
          options: [
            "Ecological processes and defined organic production standards",
            "Uncontrolled use of all chemicals",
            "Avoiding all soil management",
            "Growing crops without any planning",
          ],
          correctAnswer:
            "Ecological processes and defined organic production standards",
          explanation:
            "Organic farming follows defined standards and emphasizes ecological processes, biodiversity, and responsible resource management.",
          order: 1,
        },
        {
          question: "What is the primary goal of precision agriculture?",
          questionType: QuestionType.MCQ,
          options: [
            "Managing fields using location-specific information and technology",
            "Applying identical inputs everywhere regardless of conditions",
            "Eliminating agricultural data",
            "Replacing all farmers with machinery",
          ],
          correctAnswer:
            "Managing fields using location-specific information and technology",
          explanation:
            "Precision agriculture uses field data and technology to make more accurate and location-specific farming decisions.",
          order: 2,
        },
        {
          question: "Which technology helps identify geographic field locations?",
          questionType: QuestionType.MCQ,
          options: ["GPS/GNSS", "Word processor", "Audio recorder", "Printer"],
          correctAnswer: "GPS/GNSS",
          explanation:
            "GPS and other GNSS systems provide satellite-based positioning information that can support agricultural operations.",
          order: 3,
        },
        {
          question: "What is protected cultivation?",
          questionType: QuestionType.MCQ,
          options: [
            "Growing crops in structures that modify or protect the growing environment",
            "Growing crops only in open deserts",
            "Growing crops without water",
            "Storing harvested crops in warehouses",
          ],
          correctAnswer:
            "Growing crops in structures that modify or protect the growing environment",
          explanation:
            "Protected cultivation uses structures such as greenhouses, polyhouses, and shade-net houses to modify growing conditions.",
          order: 4,
        },
        {
          question: "Which of these is a common greenhouse crop?",
          questionType: QuestionType.MCQ,
          options: ["Tomato", "Wild forest timber", "Coal", "Iron ore"],
          correctAnswer: "Tomato",
          explanation:
            "Tomatoes are commonly cultivated in greenhouses and other protected structures.",
          order: 5,
        },
        {
          question: "Which technology can help monitor crop conditions over large areas?",
          questionType: QuestionType.MCQ,
          options: [
            "Remote sensing",
            "Mechanical typewriter",
            "Audio speakers",
            "Desktop calculator only",
          ],
          correctAnswer: "Remote sensing",
          explanation:
            "Remote sensing uses satellite or aerial observations to gather information about vegetation and field conditions.",
          order: 6,
        },
        {
          question: "Which factors should be considered when selecting a farming system?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Climate",
            "Soil characteristics",
            "Water availability",
            "Market access",
          ],
          correctAnswer: [
            "Climate",
            "Soil characteristics",
            "Water availability",
            "Market access",
          ],
          explanation:
            "Climate, soil, water, and market access are important factors in selecting an appropriate farming system.",
          order: 7,
        },
        {
          question: "Organic farming always guarantees higher crop yields than conventional farming.",
          questionType: QuestionType.TRUE_FALSE,
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "Yields depend on crop, location, soil, climate, inputs, and management. Organic farming does not guarantee higher yields in every situation.",
          order: 8,
        },
        {
          question: "What does variable-rate technology do?",
          questionType: QuestionType.MCQ,
          options: [
            "Adjusts input application according to field conditions",
            "Applies the same input rate everywhere in every situation",
            "Measures only market prices",
            "Controls the weather",
          ],
          correctAnswer:
            "Adjusts input application according to field conditions",
          explanation:
            "Variable-rate technology can adjust the application of inputs such as fertilizers or seeds according to variations within a field.",
          order: 9,
        },
        {
          question: "Which are possible limitations of precision agriculture?",
          questionType: QuestionType.MULTIPLE_SELECT,
          options: [
            "Initial technology costs",
            "Need for technical knowledge",
            "Data-quality requirements",
            "Need for sensor calibration",
          ],
          correctAnswer: [
            "Initial technology costs",
            "Need for technical knowledge",
            "Data-quality requirements",
            "Need for sensor calibration",
          ],
          explanation:
            "Precision agriculture requires suitable investment, reliable data, technical knowledge, and properly calibrated equipment.",
          order: 10,
        },
      ],
    },
  ],
};
