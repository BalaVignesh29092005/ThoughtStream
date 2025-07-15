import express from "express";
import bodyParser from "body-parser";
import path from "path";
import he from "he";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
var blogsPreview = [];
var myblogs = [];
var allblogs = [];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const today = new Date();

const options = { year: "numeric", month: "long", day: "numeric" };
const formattedDate = today.toLocaleDateString("en-US", options);
var ranBlogs = [];

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getRandomElements(parentArray, numberOfElements) {
  const result = [];
  const takenIndices = new Set();
  const max = parentArray.length;
  const count = Math.min(numberOfElements, max);
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!takenIndices.has(randomIndex)) {
      takenIndices.add(randomIndex);
      result.push(parentArray[randomIndex]);
    }
  }
  return result;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { blogpreviews: blogsPreview });
});

app.get("/view", (req, res) => {
  const blogIndex = parseInt(req.query.blogIndex);
  const sourcetype = req.query.sourceType;
  if (sourcetype == "home") {
    res.render("view.ejs", { blog: blogsPreview[blogIndex], sourcetype: "/" });
  } else if (sourcetype == "explore") {
    res.render("view.ejs", { blog: ranBlogs[blogIndex], sourcetype: "/" });
  }
});

app.get("/myblog", (req, res) => {
  res.render("myblog", { blogs: myblogs });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/explore", (req, res) => {
  const filter = req.query.filter || "all";
  let filteredBlogs;
  if (filter !== "all") {
    filteredBlogs = allblogs.filter(
      (blog) => blog.topic.toLowerCase() === filter.toLowerCase()
    );
  } else {
    filteredBlogs = getRandomElements(allblogs, 8);
  }
  ranBlogs = [...filteredBlogs];
  res.render("explore.ejs", {
    blogpreviews: ranBlogs,
    selected: filter,
  });
});

app.post("/explore", (req, res) => {
  const filter = req.body.filter || "all";
  res.redirect(`/explore?filter=${filter}`);
});

app.post("/myblog", (req, res) => {
  const newBlog = {
    title: req.body.title,
    author: req.body.author,
    topic: req.body.topic,
    content: req.body.content,
    publishDate: formattedDate,
  };
  myblogs.push(newBlog);
  allblogs.push({...newBlog});
  res.render("myblog.ejs", { blogs: myblogs });
});

app.get("/edit", (req, res) => {
  const blogIndex = parseInt(req.query.blogIndex);
  res.render("create.ejs", { blog: myblogs[blogIndex] });
  if (blogIndex >= 0 && blogIndex < myblogs.length) {
    myblogs.splice(blogIndex, 1);
  }
});

app.get("/delete", (req, res) => {
  const blogIndex = parseInt(req.query.blogIndex);
  const index = allblogs.indexOf(myblogs[blogIndex]);
  if (index > -1) {
    allblogs.splice(index, 1);
  }
  if (blogIndex >= 0 && blogIndex < myblogs.length) {
    myblogs.splice(blogIndex, 1);
  }
  res.render("myblog.ejs", { blogs: myblogs });
});

blogsPreview.push({
  title: "The Rise of Women's Football: Breaking Barriers and Records",
  author: "Rachel Torres",
  topic: "Sports",
  publishDate: "June 10, 2025",
  content:
    "Women's football has been experiencing an extraordinary surge in popularity over the past decade.\nFrom record-breaking World Cup viewerships to the establishment of professional leagues across Europe and North America, the game is no longer in the shadows.\n\nOne key factor is increased media coverage, which has helped inspire a new generation of girls to lace up their boots.\nOrganizations like FIFA and UEFA are also investing more in grassroots development programs aimed at young female athletes.\n\nWith stars like Alexia Putellas, Sam Kerr, and Trinity Rodman leading the way, the women's game is poised to reach even greater heights in the coming years.\nAnd with growing calls for equal pay and resources, the future looks bright—and much more equal—for women's football.",
});

blogsPreview.push({
  title: "Title: Microplastics: The Invisible Threat in Our Oceans",
  author: "Dr. Lena Morales",
  topic: "Environment",
  publishDate: "June 5, 2025",
  content:
    "Microplastics, tiny fragments of plastic less than 5mm in size, have become one of the most pervasive forms of pollution in our oceans.\nThey originate from larger plastic debris breaking down, as well as from synthetic clothing and personal care products.\n\nStudies have shown microplastics in everything from fish to sea salt, raising concerns about long-term health effects on marine life and humans.\nMarine organisms often ingest these particles, mistaking them for food, which can lead to starvation and toxic buildup.\n\nSolutions lie in reducing single-use plastics, improving waste management, and investing in biodegradable alternatives.\nBut most importantly, global awareness and policy change are needed to stem the tide of plastic pollution before it's too late.",
});

blogsPreview.push({
  title: "The Gig Economy: Freedom or Financial Trap?",
  author: "Samantha Blake",
  topic: "Business",
  publishDate: "June 12, 2025",
  content:
    "The gig economy has opened doors for millions to earn money through flexible, short-term jobs—think Uber drivers, freelance designers, or food delivery workers.\nFor many, this means control over their schedules and the ability to pursue passion projects on the side.\n\nBut there’s a darker side.\nLack of job security, benefits, and predictable income can leave workers vulnerable.\nIn fact, studies show that gig workers are often underpaid and overworked compared to their traditionally employed counterparts.\n\nAs this labor model grows, so do calls for reform.\nLegislation like California’s AB5 and ongoing debates about the classification of gig workers are shaping the future of work.\nFor the gig economy to be truly sustainable, it must balance flexibility with fair labor protections.",
});

blogsPreview.push({
  title: "How AI is Transforming Everyday Life",
  author: "Kevin Liu",
  topic: "Technology",
  publishDate: "June 15, 2025",
  content:
    "Artificial Intelligence (AI) is no longer the stuff of science fiction—it’s reshaping the way we live, work, and interact.\nFrom voice assistants like Siri and Alexa to personalized Netflix recommendations, AI is integrated into daily tasks more than we often realize.\n\nOne of the most promising areas is healthcare, where AI algorithms assist in diagnosing diseases, analyzing medical images, and even predicting outbreaks.\nIn transportation, autonomous vehicles are inching closer to mainstream adoption, promising safer and more efficient roads.\n\nHowever, with innovation comes responsibility.\nEthical concerns about data privacy, algorithmic bias, and employment displacement are critical topics that need addressing as the technology continues to evolve.\nResponsible AI development, guided by transparency and fairness, is the way forward.",
});

allblogs.push(...blogsPreview);
allblogs.push(...myblogs);

allblogs.push({
  title: "Sustainability in Corporate Strategy: A New Imperative",
  author: "Olivia Green",
  topic: "Business",
  publishDate: "June 21, 2025",
  content:
    "In recent years, sustainability has transitioned from a peripheral concern to a fundamental component of corporate strategy. Companies worldwide are recognizing that long-term success requires more than just financial performance—it demands responsible environmental stewardship and social accountability. Integrating sustainability into business operations involves adopting practices that reduce environmental impact, such as cutting greenhouse gas emissions, minimizing waste, and conserving natural resources. Beyond environmental benefits, sustainable strategies drive innovation, opening new markets through eco-friendly products and services that resonate with increasingly conscientious consumers. Investors now prioritize Environmental, Social, and Governance (ESG) criteria, influencing capital flows toward responsible companies. Organizations that embed sustainability into their culture and operations also enjoy enhanced brand loyalty and employee engagement. However, achieving these goals requires transparent reporting, clear metrics, and collaboration across supply chains. Sustainable corporate strategies are reshaping industries by balancing profit with planet and people, ultimately leading to resilient business models equipped to thrive in a rapidly changing world.",
});

allblogs.push({
  title: "Navigating Digital Transformation in Small Businesses",
  author: "David Kim",
  topic: "Business",
  publishDate: "June 22, 2025",
  content:
    "Digital transformation has become essential for small businesses aiming to stay competitive in an increasingly technology-driven economy. However, unlike larger corporations with extensive IT resources, small businesses often face significant hurdles such as limited budgets, lack of technical expertise, and resistance to change. To successfully navigate this transformation, small businesses must develop a clear, phased approach tailored to their unique needs. This begins with identifying key pain points and prioritizing digital tools that directly impact customer experience, operational efficiency, and sales growth. Cloud computing platforms offer scalable solutions for data storage and collaboration, while customer relationship management (CRM) systems provide insights to better understand client behavior and improve service. Training staff and fostering a culture that embraces innovation are crucial to overcoming adoption challenges. Moreover, integrating e-commerce capabilities and leveraging social media marketing expand market reach beyond local geographies. When effectively implemented, digital transformation not only enhances productivity but also enables small businesses to adapt quickly to changing market conditions, future-proofing their operations and accelerating growth.",
});

allblogs.push({
  title: "The Growing Popularity of Mixed Martial Arts",
  author: "Sofia Ramirez",
  topic: "Sports",
  publishDate: "June 23, 2025",
  content:
    "Mixed Martial Arts (MMA) has surged in popularity over the past decade, evolving from a niche combat sport to a global phenomenon that attracts millions of fans and practitioners worldwide. MMA’s appeal lies in its dynamic combination of various fighting disciplines including Brazilian jiu-jitsu, wrestling, boxing, Muay Thai, and judo, which together create a versatile and exciting combat style. This diverse approach requires athletes to develop strength, agility, endurance, and mental toughness, making MMA training appealing not just for competition but also for fitness and self-defense. The growth of high-profile organizations like the UFC has propelled MMA into mainstream sports culture, with major events broadcast globally and drawing significant sponsorship and advertising revenue. The rise of amateur leagues and youth programs has expanded access to the sport, promoting discipline, respect, and community among participants. MMA gyms have also become social hubs where people from diverse backgrounds come together to train and share their passion. As MMA continues to evolve, its influence extends beyond the ring, shaping fitness trends, popular culture, and even media representations of combat sports.",
});

allblogs.push({
  title: "Youth Sports and the Importance of Mental Health",
  author: "Jason Lee",
  topic: "Sports",
  publishDate: "June 24, 2025",
  content:
    "As the pressures of competition and performance increase in youth sports, the importance of mental health has become an urgent focus for coaches, parents, and organizations dedicated to nurturing young athletes. Mental health challenges such as anxiety, stress, and burnout are common, yet often overlooked, in the high-stakes environment of youth sports where children juggle school, training, and social lives. To foster healthy development, it is crucial to create supportive environments that emphasize enjoyment, personal growth, and emotional resilience alongside athletic achievement. Programs that integrate mindfulness, stress management techniques, and open communication channels help young athletes recognize and cope with their feelings, reducing stigma and encouraging early intervention. Training coaches to identify signs of mental distress and promoting balanced schedules that allow adequate rest and recovery are equally important. When mental health is prioritized, young athletes not only perform better but also develop lifelong skills for wellbeing. Ultimately, a holistic approach to youth sports cultivates not just champions on the field but mentally healthy individuals prepared for life's challenges.",
});

allblogs.push(
  {
    title: "Innovative Teaching Methods Transforming Education",
    author: "Emily Carter",
    topic: "Education",
    publishDate: "June 15, 2025",
    content:
      "Education is evolving rapidly with the integration of technology and student-centered learning approaches. Innovative teaching methods like flipped classrooms, project-based learning, and personalized education plans are empowering students to take control of their learning. These approaches foster critical thinking, creativity, and collaboration, preparing students for the demands of the 21st century workforce. Educators are also leveraging digital tools to make learning more accessible and engaging, while addressing diverse learning styles and needs. This shift not only improves academic outcomes but also nurtures lifelong learners equipped to navigate a complex world.",
  },
  {
    title: "The Future of Artificial Intelligence in Daily Life",
    author: "Sophia Nguyen",
    topic: "Technology",
    publishDate: "June 18, 2025",
    content:
      "Artificial Intelligence (AI) continues to transform various aspects of daily life, from smart home devices to healthcare and transportation. As AI systems become more advanced, they are capable of performing complex tasks such as language translation, personalized recommendations, and autonomous driving. This technological revolution offers great potential for efficiency and convenience, but also raises important ethical questions around privacy, job displacement, and decision-making transparency. Understanding AI’s capabilities and challenges is essential for embracing its benefits responsibly while mitigating risks.",
  },
  {
    title: "Protecting Our Planet: Practical Steps for Environmental Sustainability",
    author: "Liam Martinez",
    topic: "Environment",
    publishDate: "June 20, 2025",
    content:
      "With climate change and environmental degradation posing serious threats globally, sustainable living has become more critical than ever. Individuals and communities can contribute by adopting simple yet impactful habits such as reducing waste, conserving water, using renewable energy, and supporting eco-friendly products. Governments and organizations are also implementing policies aimed at reducing carbon footprints and protecting biodiversity. Collective action and education are vital to ensuring a healthy planet for future generations, making environmental responsibility a shared priority.",
  }
);
allblogs.push(
  {
    title: "The Art of Minimalist Living: Finding Joy in Simplicity",
    author: "Nina Walker",
    topic: "Others",
    publishDate: "June 25, 2025",
    content:
      "Minimalism is more than just a trend—it's a lifestyle focused on intentional living and eliminating excess. As people become increasingly overwhelmed by consumerism and clutter, many are turning to minimalist living to regain clarity and control. This philosophy encourages prioritizing meaningful experiences over material possessions, leading to reduced stress, improved focus, and greater financial freedom. From decluttering homes to simplifying schedules, minimalist habits foster a sense of peace and purpose. Ultimately, the minimalist lifestyle is about making room for what truly matters—relationships, personal growth, and well-being.",
  },
  {
    title: "The Psychology of Procrastination: Why We Delay and How to Stop",
    author: "Dr. Marcus Reed",
    topic: "Others",
    publishDate: "June 26, 2025",
    content:
      "Procrastination affects everyone at some point, often leading to stress, missed deadlines, and reduced productivity. Psychologists link it to emotional regulation, perfectionism, fear of failure, and even low self-esteem. Rather than being lazy, procrastinators often feel overwhelmed by tasks they perceive as unpleasant or high-pressure. Overcoming procrastination involves breaking tasks into smaller steps, setting clear goals, and using strategies like time-blocking and accountability. Mindfulness and cognitive behavioral techniques can also help reframe negative thoughts that trigger avoidance. Understanding the root causes empowers individuals to replace delay with action and build healthier, more productive habits.",
  }
);
app.get("/about",(req,res)=>{
  res.render("about.ejs");
})
blogsPreview = blogsPreview.map((blog) => ({
  ...blog,
  content: he.decode(blog.content),
}));

allblogs = allblogs.map((blog) => ({
  ...blog,
  content: he.decode(blog.content),
}));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
